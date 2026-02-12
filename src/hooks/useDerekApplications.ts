import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';
import { filterDeletedEvents } from '@/lib/dedup';
import { useDerekDeletions } from './useDerekDeletions';

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
  const { data: deletions } = useDerekDeletions();

  const deletionCount = deletions?.length ?? 0;

  return useQuery({
    queryKey: ['derek-applications', DEREK_PUBKEY_HEX, deletionCount],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      const events = await nostr.query([
        {
          kinds: [31990],
          authors: [DEREK_PUBKEY_HEX],
          limit: 20,
        },
      ], { signal });

      // Filter out deleted events (NIP-09)
      const live = filterDeletedEvents(events, deletions ?? []);

      return live.map(parseApplicationEvent);
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}