import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

/**
 * Static article snapshots emitted at build time by tools/seo/plugin.ts.
 * They exist only in prerendered production builds; in dev the fetch 404s and
 * these hooks resolve to `null`, so callers must treat them as an optional
 * fast-path in front of the live relay queries.
 */
async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T | null> {
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Index of all articles with truncated content (enough for cards/previews). */
export function usePrebuiltArticleIndex() {
  return useQuery({
    queryKey: ['prebuilt-articles'],
    queryFn: ({ signal }) => fetchJson<NostrEvent[]>('/data/articles.json', signal),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
}

/** Full snapshot of one article, keyed by its naddr. */
export function usePrebuiltArticle(naddr: string | undefined) {
  return useQuery({
    queryKey: ['prebuilt-article', naddr],
    queryFn: ({ signal }) => fetchJson<NostrEvent>(`/data/articles/${naddr}.json`, signal),
    enabled: !!naddr && naddr.startsWith('naddr1'),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
}
