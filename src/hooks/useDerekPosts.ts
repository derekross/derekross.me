import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';
import { deduplicateEvents, filterDeletedEvents } from '@/lib/dedup';
import { useDerekDeletions } from './useDerekDeletions';

export function useDerekPosts() {
  const { nostr } = useNostr();
  const { data: deletions } = useDerekDeletions();

  const deletionCount = deletions?.length ?? 0;

  return useQuery({
    queryKey: ['derek-posts', DEREK_PUBKEY_HEX, deletionCount],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      const events = await nostr.query([
        {
          kinds: [1, 30023],
          authors: [DEREK_PUBKEY_HEX],
          limit: 50,
        },
      ], { signal });

      // Deduplicate addressable events and filter deletions
      const deduplicated = deduplicateEvents(events);
      const live = filterDeletedEvents(deduplicated, deletions ?? []);

      // Filter out replies from kind 1 notes
      const nonReplyEvents = live.filter((event) => {
        if (event.kind === 1) {
          return !event.tags.some(([tagName]) => tagName === 'e');
        }
        return true;
      });

      return nonReplyEvents.sort((a, b) => b.created_at - a.created_at);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
