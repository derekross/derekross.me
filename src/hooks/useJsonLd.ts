import { useHead } from '@unhead/react';

/**
 * Inject a schema.org JSON-LD block into <head> for the current page.
 * Pass `null` to render nothing (e.g. while data is loading).
 */
export function useJsonLd(data: Record<string, unknown> | null) {
  useHead({
    script: data
      ? [
          {
            key: 'json-ld',
            type: 'application/ld+json',
            innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...data }),
          },
        ]
      : [],
  });
}
