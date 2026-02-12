import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';
import { deduplicateEvents, filterDeletedEvents } from '@/lib/dedup';
import { useDerekDeletions } from './useDerekDeletions';

export function useDerekArticles() {
  const { nostr } = useNostr();
  const { data: deletions } = useDerekDeletions();

  // Include deletion count in query key so articles re-filter when deletions load
  const deletionCount = deletions?.length ?? 0;

  return useQuery({
    queryKey: ['derek-articles', DEREK_PUBKEY_HEX, deletionCount],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      const events = await nostr.query([
        {
          kinds: [30023],
          authors: [DEREK_PUBKEY_HEX],
          limit: 10,
        },
      ], { signal });

      // Deduplicate by d-tag and filter deleted events
      const deduplicated = deduplicateEvents(events);
      const live = filterDeletedEvents(deduplicated, deletions ?? []);

      // Sort by published_at tag if available, otherwise created_at (newest first)
      return live.sort((a, b) => {
        const aPublished = a.tags.find(([name]) => name === 'published_at')?.[1];
        const bPublished = b.tags.find(([name]) => name === 'published_at')?.[1];
        const aTime = aPublished ? parseInt(aPublished) : a.created_at;
        const bTime = bPublished ? parseInt(bPublished) : b.created_at;
        return bTime - aTime;
      });
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
