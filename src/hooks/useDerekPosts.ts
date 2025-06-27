import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
// import type { NostrEvent } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';

export function useDerekPosts() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['derek-posts', DEREK_PUBKEY_HEX],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);
      
      try {
        // Query for Derek's text notes and long-form content
        const events = await nostr.query([
          {
            kinds: [1, 30023], // Text notes and long-form content
            authors: [DEREK_PUBKEY_HEX],
            limit: 50 // Increased from 20 to ensure we have enough after filtering
          }
        ], { signal });

        // Filter out replies from kind 1 notes (events with 'e' tags that reference other events)
        const nonReplyEvents = events.filter(event => {
          // For kind 1 notes, check if this is a reply by looking for 'e' tags
          if (event.kind === 1) {
            const hasEventReference = event.tags.some(([tagName]) => tagName === 'e');
            return !hasEventReference;
          }
          // For other kinds (like articles), don't filter
          return true;
        });

        // Sort by created_at (newest first) and return all non-reply posts
        return nonReplyEvents.sort((a, b) => b.created_at - a.created_at);
      } catch (error) {
        console.warn('Failed to fetch Derek posts:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}