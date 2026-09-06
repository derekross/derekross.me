/**
 * Shared SEO constants and helpers.
 */
export const SITE_URL = 'https://derekross.me';
export const SITE_NAME = 'Derek Ross';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.jpg`;

/** Turn a site-relative path (or an already absolute URL) into an absolute URL. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/** Normalise a pathname to its canonical form: no trailing slash (except root), no query/hash. */
export function canonicalPath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/** schema.org Person node for Derek, reused across JSON-LD blocks. */
export const DEREK_PERSON_LD = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Derek Ross',
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  jobTitle: 'Developer Relations Lead',
  worksFor: { '@type': 'Organization', name: 'Soapbox', url: 'https://soapbox.pub' },
  sameAs: [
    'https://x.com/derekmross',
    'https://linkedin.com/in/derekross',
    'https://github.com/derekross',
    'https://njump.me/derekross@grownostr.org',
  ],
} as const;
