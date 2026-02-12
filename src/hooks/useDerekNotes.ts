import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';
import { useDerekDeletions } from './useDerekDeletions';
import { filterDeletedEvents } from '@/lib/dedup';

export function useDerekNotes() {
  const { nostr } = useNostr();
  const { data: deletions } = useDerekDeletions();

  const deletionCount = deletions?.length ?? 0;

  return useQuery({
    queryKey: ['derek-notes', DEREK_PUBKEY_HEX, deletionCount],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      const events = await nostr.query([
        {
          kinds: [1],
          authors: [DEREK_PUBKEY_HEX],
          limit: 50,
        },
      ], { signal });

      // Filter out deleted events (NIP-09)
      const live = filterDeletedEvents(events, deletions ?? []);

      // Filter out replies (events with 'e' tags that reference other events)
      const nonReplyEvents = live.filter((event) => {
        const hasEventReference = event.tags.some(([tagName]) => tagName === 'e');
        return !hasEventReference;
      });

      // Sort by created_at (newest first)
      return nonReplyEvents.sort((a, b) => b.created_at - a.created_at);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
