import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';

/**
 * Fetches NIP-09 deletion events (kind 5) authored by Derek.
 * Used to filter out deleted content from all data-fetching hooks.
 */
export function useDerekDeletions() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['derek-deletions', DEREK_PUBKEY_HEX],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);
      const events = await nostr.query(
        [{ kinds: [5], authors: [DEREK_PUBKEY_HEX], limit: 100 }],
        { signal },
      );
      return events;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
