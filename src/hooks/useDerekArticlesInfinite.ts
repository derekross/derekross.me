import { useNostr } from '@nostrify/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { NostrFilter } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';

const PAGE_SIZE = 20;

export function useDerekArticlesInfinite() {
  const { nostr } = useNostr();

  return useInfiniteQuery({
    queryKey: ['derek-articles-infinite', DEREK_PUBKEY_HEX],
    queryFn: async ({ pageParam, signal: querySignal }) => {
      const signal = AbortSignal.any([querySignal, AbortSignal.timeout(8000)]);

      try {
        const filter: NostrFilter = {
          kinds: [30023],
          authors: [DEREK_PUBKEY_HEX],
          limit: PAGE_SIZE,
          ...(pageParam ? { until: pageParam } : {}),
        };

        const events = await nostr.query([filter], { signal });

        // Sort by published_at tag if available, otherwise created_at (newest first)
        const sorted = [...events].sort((a, b) => {
          const aPublished = a.tags.find(([name]) => name === 'published_at')?.[1];
          const bPublished = b.tags.find(([name]) => name === 'published_at')?.[1];
          const aTime = aPublished ? parseInt(aPublished) : a.created_at;
          const bTime = bPublished ? parseInt(bPublished) : b.created_at;
          return bTime - aTime;
        });

        // Determine next cursor (oldest timestamp in this batch minus 1)
        const oldestEvent = sorted[sorted.length - 1];
        const nextCursor = oldestEvent ? oldestEvent.created_at - 1 : undefined;

        // Has more if we got a full page
        const hasMore = events.length === PAGE_SIZE;

        return {
          articles: sorted,
          nextCursor,
          hasMore,
        };
      } catch (error) {
        console.warn('Failed to fetch Derek articles:', error);
        return {
          articles: [],
          nextCursor: undefined,
          hasMore: false,
        };
      }
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
