import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';

interface NostrRepository {
  id: string;
  name: string;
  description?: string;
  webUrls: string[];
  cloneUrls: string[];
  relays: string[];
  maintainers: string[];
  tags: string[];
  earliestCommit?: string;
}

function parseRepositoryEvent(event: NostrEvent): NostrRepository {
  const dTag = event.tags.find(([name]) => name === 'd')?.[1] || event.id;
  const name = event.tags.find(([name]) => name === 'name')?.[1] || dTag;
  const description = event.tags.find(([name]) => name === 'description')?.[1];
  
  const webUrls = event.tags
    .filter(([name]) => name === 'web')
    .map(([, url]) => url)
    .filter(Boolean);
    
  const cloneUrls = event.tags
    .filter(([name]) => name === 'clone')
    .map(([, url]) => url)
    .filter(Boolean);
    
  const relays = event.tags
    .filter(([name]) => name === 'relays')
    .map(([, relay]) => relay)
    .filter(Boolean);
    
  const maintainers = event.tags
    .filter(([name]) => name === 'maintainers')
    .map(([, maintainer]) => maintainer)
    .filter(Boolean);
    
  const tags = event.tags
    .filter(([name]) => name === 't')
    .map(([, tag]) => tag)
    .filter(Boolean);
    
  const earliestCommit = event.tags
    .find(([name, , marker]) => name === 'r' && marker === 'euc')?.[1];

  return {
    id: dTag,
    name,
    description,
    webUrls,
    cloneUrls,
    relays,
    maintainers,
    tags,
    earliestCommit
  };
}

export function useDerekRepositories() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['derek-repositories', DEREK_PUBKEY_HEX],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);
      
      try {
        // Query for Derek's Git repositories (kind 30617)
        const events = await nostr.query([
          {
            kinds: [30617], // Git Repository Announcement
            authors: [DEREK_PUBKEY_HEX],
            limit: 20
          }
        ], { signal });

        // Parse and return repositories
        return events.map(parseRepositoryEvent);
      } catch (error) {
        console.warn('Failed to fetch Derek repositories:', error);
        return [];
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}