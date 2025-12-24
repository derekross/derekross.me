import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
// import type { NostrEvent } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';

export function useDerekArticles() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['derek-articles', DEREK_PUBKEY_HEX],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);
      
      try {
        // Query for Derek's long-form articles only
        const events = await nostr.query([
          {
            kinds: [30023], // Long-form content only
            authors: [DEREK_PUBKEY_HEX],
            limit: 10
          }
        ], { signal });

        // Filter for articles with nostr-related content
        const nostrArticles = events.filter(event => {
          const content = event.content.toLowerCase();
          const tags = event.tags.map(tag => tag[1]?.toLowerCase() || '').join(' ');
          const searchText = `${content} ${tags}`;
          
          return searchText.includes('nostr') || 
                 searchText.includes('decentralized') || 
                 searchText.includes('censorship') ||
                 searchText.includes('relay') ||
                 searchText.includes('zap') ||
                 searchText.includes('bitcoin');
        });

        // Sort by published_at tag if available, otherwise created_at (newest first)
        return nostrArticles.sort((a, b) => {
          const aPublished = a.tags.find(([name]) => name === 'published_at')?.[1];
          const bPublished = b.tags.find(([name]) => name === 'published_at')?.[1];
          const aTime = aPublished ? parseInt(aPublished) : a.created_at;
          const bTime = bPublished ? parseInt(bPublished) : b.created_at;
          return bTime - aTime;
        });
      } catch (error) {
        console.warn('Failed to fetch Derek articles:', error);
        return [];
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}