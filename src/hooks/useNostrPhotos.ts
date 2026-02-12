import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';
import { filterDeletedEvents } from '@/lib/dedup';
import { useDerekDeletions } from './useDerekDeletions';

interface NostrPhoto {
  id: string;
  url: string;
  caption?: string;
  alt?: string;
  created_at: number;
  event: NostrEvent;
}

function extractImageUrls(content: string): string[] {
  const imageRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp))/gi;
  return content.match(imageRegex) || [];
}

function parsePhotoEvent(event: NostrEvent): NostrPhoto[] {
  const photos: NostrPhoto[] = [];

  if (event.kind === 20) {
    // Picture event (NIP-68) - parse imeta tags
    const imetaTags = event.tags.filter(([name]) => name === 'imeta');

    imetaTags.forEach((imetaTag, index) => {
      const attributes = imetaTag.slice(1);
      let url = '';
      let alt = '';

      attributes.forEach((attr) => {
        if (attr.startsWith('url ')) {
          url = attr.substring(4);
        } else if (attr.startsWith('alt ')) {
          alt = attr.substring(4);
        }
      });

      if (url) {
        photos.push({
          id: `${event.id}-${index}`,
          url,
          caption: event.content,
          alt,
          created_at: event.created_at,
          event,
        });
      }
    });

    // Fallback: if no imeta tags, try to extract URLs from content
    if (photos.length === 0) {
      const imageUrls = extractImageUrls(event.content);
      imageUrls.forEach((url, index) => {
        photos.push({
          id: `${event.id}-content-${index}`,
          url,
          caption: event.content.replace(url, '').trim(),
          alt: undefined,
          created_at: event.created_at,
          event,
        });
      });
    }
  }

  return photos;
}

export function useNostrPhotos() {
  const { nostr } = useNostr();
  const { data: deletions } = useDerekDeletions();

  const deletionCount = deletions?.length ?? 0;

  return useQuery({
    queryKey: ['nostr-photos', DEREK_PUBKEY_HEX, deletionCount],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      const events = await nostr.query([
        {
          kinds: [20],
          authors: [DEREK_PUBKEY_HEX],
          limit: 50,
        },
      ], { signal });

      // Filter out deleted events (NIP-09)
      const live = filterDeletedEvents(events, deletions ?? []);

      // Parse events to extract photos
      const allPhotos: NostrPhoto[] = [];
      live.forEach((event) => {
        allPhotos.push(...parsePhotoEvent(event));
      });

      // Sort by created_at (newest first)
      return allPhotos.sort((a, b) => b.created_at - a.created_at);
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
