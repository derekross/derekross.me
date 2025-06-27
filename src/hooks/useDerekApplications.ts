import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';

interface NostrApplication {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  picture?: string;
  banner?: string;
  web?: string;
  supportedKinds: number[];
  platforms: {
    web?: string;
    ios?: string;
    android?: string;
  };
}

interface ApplicationMetadata {
  name?: string;
  display_name?: string;
  about?: string;
  description?: string;
  picture?: string;
  banner?: string;
  web?: string;
  website?: string;
}

function parseApplicationEvent(event: NostrEvent): NostrApplication {
  let metadata: ApplicationMetadata = {};
  
  try {
    if (event.content) {
      metadata = JSON.parse(event.content) as ApplicationMetadata;
    }
  } catch (error) {
    console.warn('Failed to parse application metadata:', error);
  }

  const dTag = event.tags.find(([name]) => name === 'd')?.[1] || event.id;
  const supportedKinds = event.tags
    .filter(([name]) => name === 'k')
    .map(([, kind]) => parseInt(kind))
    .filter((kind: number) => !isNaN(kind));

  const platforms: { web?: string; ios?: string; android?: string } = {};
  
  event.tags.forEach(([name, url]) => {
    if (['web', 'ios', 'android'].includes(name) && url) {
      platforms[name as keyof typeof platforms] = url;
    }
  });

  return {
    id: dTag,
    name: metadata.name || dTag,
    displayName: metadata.display_name,
    description: metadata.about || metadata.description,
    picture: metadata.picture,
    banner: metadata.banner,
    web: metadata.website || metadata.web || platforms.web,
    supportedKinds,
    platforms
  };
}

export function useDerekApplications() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['derek-applications', DEREK_PUBKEY_HEX],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);
      
      try {
        // Query for Derek's Nostr applications (kind 31990)
        const events = await nostr.query([
          {
            kinds: [31990], // Nostr Software Application
            authors: [DEREK_PUBKEY_HEX],
            limit: 20
          }
        ], { signal });

        // Parse and return applications
        return events.map(parseApplicationEvent);
      } catch (error) {
        console.warn('Failed to fetch Derek applications:', error);
        return [];
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}