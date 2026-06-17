import path from "node:path";
import process from "node:process";

import prerender from "@prerenderer/rollup-plugin";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    tailwindcss(),
    process.env.PRERENDER ? prerender({
      routes: [
        // Main pages
        "/",
        "/about",
        "/whynostr",
        "/guides",
        "/services",
        "/events",
        "/media",
        "/contact",
        "/background",

        // Guide pages
        "/guides/ai-smb-shakespeare",
        "/guides/what-are-zaps",
        "/guides/how-do-i-use-nostr",
        "/guides/what-are-relays",
        "/guides/what-is-a-nostr-address",
        "/guides/what-is-zapvertising",
        "/guides/what-are-zapathons",
        "/guides/what-is-the-outbox-model",
        "/guides/nostr-101",
        "/guides/ditto-make-internet-weird-again",
        "/guides/bitchat-wlc-workshop",
      ],
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
}));