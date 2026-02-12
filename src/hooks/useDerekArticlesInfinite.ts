import { useNostr } from '@nostrify/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { NostrFilter } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';
import { deduplicateEvents, filterDeletedEvents } from '@/lib/dedup';
import { useDerekDeletions } from './useDerekDeletions';

const PAGE_SIZE = 20;

export function useDerekArticlesInfinite() {
  const { nostr } = useNostr();
  const { data: deletions } = useDerekDeletions();

  // Include deletion count in query key so articles re-filter when deletions load
  const deletionCount = deletions?.length ?? 0;

  return useInfiniteQuery({
    queryKey: ['derek-articles-infinite', DEREK_PUBKEY_HEX, deletionCount],
    queryFn: async ({ pageParam, signal: querySignal }) => {
      const signal = AbortSignal.any([querySignal, AbortSignal.timeout(8000)]);

      const filter: NostrFilter = {
        kinds: [30023],
        authors: [DEREK_PUBKEY_HEX],
        limit: PAGE_SIZE,
        ...(pageParam ? { until: pageParam } : {}),
      };

      const events = await nostr.query([filter], { signal });

      // Deduplicate within page and filter deleted events
      const deduplicated = deduplicateEvents(events);
      const live = filterDeletedEvents(deduplicated, deletions ?? []);

      // Sort by published_at tag if available, otherwise created_at (newest first)
      const sorted = live.sort((a, b) => {
        const aPublished = a.tags.find(([name]) => name === 'published_at')?.[1];
        const bPublished = b.tags.find(([name]) => name === 'published_at')?.[1];
        const aTime = aPublished ? parseInt(aPublished) : a.created_at;
        const bTime = bPublished ? parseInt(bPublished) : b.created_at;
        return bTime - aTime;
      });

      // Use the raw event count (before dedup) to determine if there are more pages
      const hasMore = events.length >= PAGE_SIZE;

      // Cursor based on created_at of the oldest raw event (relay's `until` operates on created_at)
      const oldestCreatedAt = events.length > 0
        ? Math.min(...events.map((e) => e.created_at))
        : undefined;
      const nextCursor = oldestCreatedAt !== undefined ? oldestCreatedAt - 1 : undefined;

      return {
        articles: sorted,
        nextCursor,
        hasMore,
      };
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore || lastPage.articles.length === 0) {
        return undefined;
      }
      return lastPage.nextCursor;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
