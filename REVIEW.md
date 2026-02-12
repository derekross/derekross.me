# Code Review & Overhaul Plan

## Status: COMPLETED

43 issues identified across 8 categories. All fixed. 1 critical, 4 high, 13 medium, 25 low.

---

## Phase 1: Critical & High Priority

### 1.1 [CRITICAL] NIP-09 Delete Event Filtering
**All data-fetching hooks ignore kind 5 deletion events.**
- `useDerekArticles.ts` - articles
- `useDerekArticlesInfinite.ts` - blog page articles  
- `useDerekNotes.ts` - notes
- `useDerekPosts.ts` - mixed posts
- `useCalendarEvents.ts` - calendar events
- `useDerekApplications.ts` - applications
- `useDerekRepositories.ts` - repositories
- `useNostrPhotos.ts` - photo gallery
- `useAuthor.ts` - profile data
- `ArticlePage.tsx` - individual article view

**Fix:** Create shared utility to fetch kind 5 events and filter deleted content.

### 1.2 [HIGH] Code Splitting (924KB bundle)
**File:** `AppRouter.tsx`, `vite.config.ts`

No route-based code splitting. All pages/components bundled together.

**Fix:** Use `React.lazy()` + `Suspense` for route-level splitting. Split heavy pages: BlogPage, ArticlePage, GuidePage, BackgroundPage, MediaPage, EventsPage, ServicesPage.

### 1.3 [HIGH] `window.location.href` Causes Full Page Reloads
**18+ occurrences across:** Hero.tsx, About.tsx, WhyNostr.tsx, Services.tsx, Events.tsx, Media.tsx, Footer.tsx, BackgroundPage.tsx, GuidePage.tsx

**Fix:** Replace with `useNavigate()` or `<Link>` components.

### 1.4 [HIGH] Missing `og:image` for Social Sharing
**File:** `index.html`, all pages using `useSeoMeta`

No preview images when shared on social media.

**Fix:** Add og:image and twitter card meta tags globally and per-page.

### 1.5 [HIGH] Broken NIP-17 DM Implementation
**File:** `NostrDMDialog.tsx`

Publishes kind 14 directly without Seal/Gift Wrap. Messages won't work with any NIP-17 client and expose metadata in cleartext.

**Fix:** Remove the component (it's dead code anyway).

---

## Phase 2: Medium Priority

### 2.1 Dead Code Removal
- `LatestPosts.tsx` - 234 lines, unused
- `useDerekPosts.ts` - 48 lines, only used by LatestPosts
- `EditProfileForm.tsx` - 350 lines, unused
- `NostrDMDialog.tsx` - 169 lines, unused + broken
- `nostr-zap` script in `index.html` - unused external JS
- Commented-out imports in 3 files

### 2.2 Broken Internal Links
- Hashtag links go to `/t/:tag` - no route exists
- Mention links go to `/:npub` - no route exists
- `MarkdownContent.tsx` hashtag URLs include `#` in path

**Fix:** Link to njump.me for hashtags/mentions, or add routes.

### 2.3 Duplicate Components
- `ArticleCard` defined in both `BlogPage.tsx` and `LatestArticles.tsx`
- `ArticleSkeleton` defined in both files
- `NostrMention` defined in both `NoteContent.tsx` and `MarkdownContent.tsx`

**Fix:** Extract to shared components.

### 2.4 Bug Fixes
- `useToast.ts` line 173: `[state]` dependency should be `[]`
- `GuidePage.tsx` lines 50-58: carousel `on('select')` listener never cleaned up
- `BlogPage.tsx` line 63 / `LatestArticles.tsx` line 66: non-null assertion `parentElement!` should use optional chaining

### 2.5 Error Handling
All query hooks catch and swallow errors, returning empty arrays. TanStack Query's `error` state is unreachable. Error UI in components is dead code.

**Fix:** Let errors propagate so error states render properly.

### 2.6 CSP Too Broad
`script-src 'self' https://cdn.jsdelivr.net` allows all jsdelivr scripts. Only needed for unused `nostr-zap`.

**Fix:** Remove script, tighten to `script-src 'self'`.

### 2.7 Accessibility
- `<nav>` missing `aria-label`
- Mobile menu button missing `aria-label`
- Hero scroll button missing `aria-label`
- PhotoGallery dialog missing `DialogDescription`

---

## Phase 3: Low Priority

### 3.1 Image Optimization
- Hero background image not optimized (CSS background-image)
- Missing `loading="lazy"` on many below-fold images
- No responsive srcset/sizes

### 3.2 TypeScript Strictness
- `tsconfig.app.json`: `strict: false`, `noImplicitAny: false`
- Several `any` types could be stricter

### 3.3 SEO Improvements
- Missing canonical URL
- Missing JSON-LD structured data (Person, Article, Event)
- Per-page og:image not set

### 3.4 Minor Code Quality
- `useLocalStorage.ts` deserialize in dependency array
- `useNostrPublish.ts` incomplete generic parameters
- `dedup.ts` doesn't handle legacy replaceable kinds (0, 3)
- `polyfills.ts` AbortSignal.any polyfill may leak listeners
- `main.tsx` missing React.StrictMode
- `NotFound.tsx` uses hardcoded colors instead of theme tokens
- `NoteContent.tsx` uses hardcoded `text-blue-500` instead of theme
- `window.open()` calls lack `noopener,noreferrer`
- Events section has hardcoded dates requiring manual maintenance
- `ArticlePage.tsx` uses `window.history.back()` which may navigate away from site

---

## Execution Order

1. **Phase 1** - Critical/High: NIP-09 delete filtering, code splitting, navigation fixes, og:image, dead code removal
2. **Phase 2** - Medium: Broken links, duplicate components, bug fixes, error handling, accessibility, CSP
3. **Phase 3** - Low: Image optimization, TypeScript strictness, SEO, minor quality fixes
