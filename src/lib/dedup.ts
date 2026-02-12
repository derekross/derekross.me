import type { NostrEvent } from '@nostrify/nostrify';

/** Legacy replaceable kinds (NIP-01): only the latest per pubkey+kind is kept. */
const LEGACY_REPLACEABLE_KINDS = new Set([0, 3, 10002]);

/**
 * Deduplicate events by their storage characteristics:
 * - Addressable events (30000-39999): by pubkey+kind+d-tag
 * - Replaceable events (10000-19999): by pubkey+kind
 * - Legacy replaceable events (0, 3, 10002): by pubkey+kind
 * - Regular events: by event id
 *
 * Keeps only the latest version (highest created_at) for each key.
 */
export function deduplicateEvents(events: NostrEvent[]): NostrEvent[] {
  const seen = new Map<string, NostrEvent>();

  for (const event of events) {
    const key = getDeduplicationKey(event);
    const existing = seen.get(key);

    if (!existing || event.created_at > existing.created_at) {
      seen.set(key, event);
    }
  }

  return [...seen.values()];
}

/**
 * Filter out events that have been deleted via NIP-09 (kind 5) deletion events.
 *
 * A kind 5 event deletes events referenced in its `e` tags (by event id) and
 * addressable events referenced in its `a` tags (by kind:pubkey:d-tag coordinate).
 * Deletion is only valid if the kind 5 event was authored by the same pubkey.
 */
export function filterDeletedEvents(
  events: NostrEvent[],
  deletionEvents: NostrEvent[],
): NostrEvent[] {
  if (deletionEvents.length === 0) return events;

  // Collect deleted event IDs and addressable coordinates
  const deletedIds = new Set<string>();
  const deletedCoords = new Set<string>();

  for (const del of deletionEvents) {
    if (del.kind !== 5) continue;

    for (const tag of del.tags) {
      if (tag[0] === 'e' && tag[1]) {
        deletedIds.add(tag[1]);
      } else if (tag[0] === 'a' && tag[1]) {
        // a-tag format: kind:pubkey:d-tag
        // Only valid if the deletion author matches the event author
        deletedCoords.add(`${del.pubkey}:${tag[1]}`);
      }
    }
  }

  return events.filter((event) => {
    // Check if event ID was deleted
    if (deletedIds.has(event.id)) return false;

    // Check if addressable coordinate was deleted
    // a-tag format is "kind:pubkey:d-tag", prefixed with deleter pubkey for validation
    if (event.kind >= 30000 && event.kind < 40000) {
      const dTag = event.tags.find(([name]) => name === 'd')?.[1] ?? '';
      // The key in deletedCoords is "deleterPubkey:kind:pubkey:d-tag"
      const coord = `${event.pubkey}:${event.kind}:${event.pubkey}:${dTag}`;
      if (deletedCoords.has(coord)) return false;
    }

    return true;
  });
}

function getDeduplicationKey(event: NostrEvent): string {
  // Addressable events: deduplicate by pubkey + kind + d-tag
  if (event.kind >= 30000 && event.kind < 40000) {
    const dTag = event.tags.find(([name]) => name === 'd')?.[1] ?? '';
    return `${event.pubkey}:${event.kind}:${dTag}`;
  }

  // Replaceable events: deduplicate by pubkey + kind
  if (event.kind >= 10000 && event.kind < 20000) {
    return `${event.pubkey}:${event.kind}`;
  }

  // Legacy replaceable kinds
  if (LEGACY_REPLACEABLE_KINDS.has(event.kind)) {
    return `${event.pubkey}:${event.kind}`;
  }

  // Regular events: deduplicate by event id
  return event.id;
}
