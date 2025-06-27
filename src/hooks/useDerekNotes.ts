import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
// import type { NostrEvent } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';

export function useDerekNotes() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['derek-notes', DEREK_PUBKEY_HEX],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);
      
      try {
        // Query for Derek's text notes only
        const events = await nostr.query([
          {
            kinds: [1], // Text notes only
            authors: [DEREK_PUBKEY_HEX],
            limit: 50 // Increased from 20 to ensure we have enough after filtering
          }
        ], { signal });

        // Filter out replies (events with 'e' or 'p' tags that reference other events/users)
        const nonReplyEvents = events.filter(event => {
          // Check if this is a reply by looking for 'e' tags (event references)
          const hasEventReference = event.tags.some(([tagName]) => tagName === 'e');
          return !hasEventReference;
        });

        // Sort by created_at (newest first) and return the latest 6 non-reply notes
        return nonReplyEvents.sort((a, b) => b.created_at - a.created_at);
      } catch (error) {
        console.warn('Failed to fetch Derek notes:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}