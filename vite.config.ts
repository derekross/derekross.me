import path from "node:path";
import process from "node:process";

import prerender from "@prerenderer/rollup-plugin";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

import { fetchDerekArticles } from "./tools/seo/articles";
import { STATIC_ROUTES, articleRoutes, guideRoutes, seoPlugin } from "./tools/seo/plugin";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  // Only reach out to relays for the prerendered production build. Dev, test and
  // plain builds get an empty article set (pages fall back to live relay data).
  let articles: Awaited<ReturnType<typeof fetchDerekArticles>> = [];
  if (process.env.PRERENDER) {
    try {
      articles = await fetchDerekArticles();
      console.log(`[seo] fetched ${articles.length} articles for prerender + sitemap`);
    } catch (err) {
      console.warn('[seo] failed to fetch articles; article pages will not be prerendered', err);
    }
    if (articles.length === 0 && process.env.SEO_STRICT) {
      throw new Error('[seo] no articles fetched and SEO_STRICT is set');
    }
  }

  return {
    base: '/',
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      tailwindcss(),
      process.env.PRERENDER ? prerender({
        // Every static page, every guide/deck (derived from src/data/guides.ts so new
        // entries are picked up automatically) and every long-form article.
        routes: [...STATIC_ROUTES, ...guideRoutes(), ...articleRoutes(articles)],
        // Sub-pages are lazy-loaded, so wait until the page has actually rendered
        // (every page renders a <footer>) before snapshotting the HTML.
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          // Wait for the lazy-loaded route chunk to mount + render before snapshot.
          renderAfterTime: 2000,
          maxConcurrentRoutes: 4,
          launchOptions: { args: ["--no-sandbox", "--disable-setuid-sandbox"] },
        },
      }) : null,
      seoPlugin(articles),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      onConsoleLog(log) {
        return !log.includes("React Router Future Flag Warning");
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
