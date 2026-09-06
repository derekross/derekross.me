import { nip19 } from 'nostr-tools';
import type { NostrEvent } from '@nostrify/nostrify';

/** Stable NIP-19 identifier for a long-form article (no relay hints, so the URL never changes). */
export function articleNaddr(event: NostrEvent): string {
  const identifier = event.tags.find(([name]) => name === 'd')?.[1] ?? '';
  return nip19.naddrEncode({ identifier, pubkey: event.pubkey, kind: event.kind });
}

/** Site path for an article or note event. */
export function articlePath(event: NostrEvent): string {
  if (event.kind === 30023) return `/article/${articleNaddr(event)}`;
  return `/article/${nip19.neventEncode({ id: event.id, author: event.pubkey })}`;
}

/** Published timestamp (seconds) — the `published_at` tag when present, else created_at. */
export function articlePublishedAt(event: NostrEvent): number {
  const published = event.tags.find(([name]) => name === 'published_at')?.[1];
  const parsed = published ? parseInt(published, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : event.created_at;
}

export function articleTag(event: NostrEvent, name: string): string | undefined {
  return event.tags.find(([n]) => n === name)?.[1];
}

/** Sort newest-first by published date. */
export function sortArticles(events: NostrEvent[]): NostrEvent[] {
  return [...events].sort((a, b) => articlePublishedAt(b) - articlePublishedAt(a));
}
