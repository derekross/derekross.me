/**
 * Build-time fetch of Derek's long-form articles (kind 30023) from Nostr relays.
 * Used to prerender article pages, emit static JSON snapshots, and build the sitemap.
 */
import { SimplePool } from 'nostr-tools/pool';
import type { NostrEvent } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '../../src/lib/derek';
import { deduplicateEvents, filterDeletedEvents } from '../../src/lib/dedup';
import { sortArticles } from '../../src/lib/articles';

const RELAYS = [
  'wss://nostr-relay.derekross.me',
  'wss://relay.primal.net',
  'wss://nos.lol',
  'wss://relay.ditto.pub',
];

export async function fetchDerekArticles(): Promise<NostrEvent[]> {
  const pool = new SimplePool();
  try {
    const [articles, deletions] = await Promise.all([
      pool.querySync(RELAYS, { kinds: [30023], authors: [DEREK_PUBKEY_HEX], limit: 500 }, { maxWait: 10_000 }),
      pool.querySync(RELAYS, { kinds: [5], authors: [DEREK_PUBKEY_HEX], limit: 1000 }, { maxWait: 10_000 }),
    ]);
    const live = filterDeletedEvents(deduplicateEvents(articles as NostrEvent[]), deletions as NostrEvent[])
      // Skip drafts / untitled events; they make poor search results.
      .filter((e) => e.tags.some(([n, v]) => n === 'title' && v) && e.content.trim().length > 0);
    return sortArticles(live);
  } finally {
    pool.close(RELAYS);
  }
}
