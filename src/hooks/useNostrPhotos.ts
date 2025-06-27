import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';

interface NostrPhoto {
  id: string;
  url: string;
  caption?: string;
  alt?: string;
  created_at: number;
  event: NostrEvent;
}

function extractImageUrls(content: string): string[] {
  // Extract image URLs from content
  const imageRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp))/gi;
  return content.match(imageRegex) || [];
}

function parsePhotoEvent(event: NostrEvent): NostrPhoto[] {
  const photos: NostrPhoto[] = [];

  if (event.kind === 20) {
    // Picture event (NIP-68) - parse imeta tags
    const imetaTags = event.tags.filter(([name]) => name === 'imeta');
    
    imetaTags.forEach((imetaTag, index) => {
      // Parse imeta tag attributes
      const attributes = imetaTag.slice(1); // Remove 'imeta' from the beginning
      let url = '';
      let alt = '';
      
      // Extract URL and alt text from imeta attributes
      attributes.forEach(attr => {
        if (attr.startsWith('url ')) {
          url = attr.substring(4); // Remove 'url ' prefix
        } else if (attr.startsWith('alt ')) {
          alt = attr.substring(4); // Remove 'alt ' prefix
        }
      });
      
      if (url) {
        photos.push({
          id: `${event.id}-${index}`,
          url,
          caption: event.content,
          alt,
          created_at: event.created_at,
          event
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
          event
        });
      });
    }
  }

  return photos;
}

export function useNostrPhotos() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['nostr-photos', DEREK_PUBKEY_HEX],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);
      
      try {
        // Query for picture events only (NIP-68)
        const events = await nostr.query([
          {
            kinds: [20], // Picture events only
            authors: [DEREK_PUBKEY_HEX],
            limit: 50
          }
        ], { signal });

        // Parse events to extract photos
        const allPhotos: NostrPhoto[] = [];
        events.forEach(event => {
          const photos = parsePhotoEvent(event);
          allPhotos.push(...photos);
        });

        // Return all photos (less restrictive filtering)
        // If we want to filter later, we can add keywords, but for now show all Derek's photos
        const relevantPhotos = allPhotos;

        // Sort by created_at (newest first)
        return relevantPhotos.sort((a, b) => b.created_at - a.created_at);
      } catch (error) {
        console.warn('Failed to fetch Nostr photos:', error);
        return [];
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}