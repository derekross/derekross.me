/**
 * Vite plugin that emits SEO artefacts into dist/:
 *   - sitemap.xml              (static pages + guides + articles)
 *   - data/articles.json       (lightweight article index used by list views)
 *   - data/articles/<naddr>.json (full article snapshots used by article pages)
 *
 * The static JSON lets article pages render instantly (and prerender with real
 * content) without waiting on relay round-trips; the app still refreshes from
 * relays in the background.
 */
import type { Plugin } from 'vite';
import type { NostrEvent } from '@nostrify/nostrify';
import { guides } from '../../src/data/guides';
import { articleNaddr, articlePath, articlePublishedAt } from '../../src/lib/articles';
import { SITE_URL } from '../../src/lib/seo';

export const STATIC_ROUTES = [
  '/',
  '/about',
  '/whynostr',
  '/guides',
  '/services',
  '/events',
  '/media',
  '/contact',
  '/background',
  '/blog',
  '/privacy',
  '/terms',
];

export const guideRoutes = () => guides.map((g) => `/guides/${g.id}`);
export const articleRoutes = (articles: NostrEvent[]) => articles.map(articlePath);

/** "January 2026" -> "2026-01-01"; returns undefined when unparseable. */
function guideLastmod(lastUpdated?: string): string | undefined {
  if (!lastUpdated) return undefined;
  const d = new Date(`1 ${lastUpdated}`);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

function isoDate(seconds: number): string {
  return new Date(seconds * 1000).toISOString().slice(0, 10);
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function buildSitemap(articles: NostrEvent[]): string {
  const entries: { loc: string; lastmod?: string }[] = [
    ...STATIC_ROUTES.map((path) => ({ loc: `${SITE_URL}${path === '/' ? '/' : path}` })),
    ...guides.map((g) => ({ loc: `${SITE_URL}/guides/${g.id}`, lastmod: guideLastmod(g.lastUpdated) })),
    ...articles.map((e) => ({
      loc: `${SITE_URL}${articlePath(e)}`,
      // created_at is bumped on every edit of an addressable event, so it doubles as "last modified".
      lastmod: isoDate(Math.max(e.created_at, articlePublishedAt(e))),
    })),
  ];

  const body = entries
    .map(({ loc, lastmod }) =>
      `  <url>\n    <loc>${xmlEscape(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

const INDEX_CONTENT_CHARS = 600;

export function seoPlugin(articles: NostrEvent[]): Plugin {
  return {
    name: 'derekross-seo',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(articles) });

      if (articles.length === 0) return;

      const index = articles.map((e) => ({ ...e, content: e.content.slice(0, INDEX_CONTENT_CHARS) }));
      this.emitFile({ type: 'asset', fileName: 'data/articles.json', source: JSON.stringify(index) });

      for (const e of articles) {
        this.emitFile({
          type: 'asset',
          fileName: `data/articles/${articleNaddr(e)}.json`,
          source: JSON.stringify(e),
        });
      }
    },
  };
}
