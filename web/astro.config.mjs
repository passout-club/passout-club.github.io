// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

// The editable content lives at the repo root in ../content, outside this
// Astro project (web/). Allow Vite's dev server to read those files.
const repoRoot = fileURLToPath(new URL('..', import.meta.url));

// https://astro.build/config
export default defineConfig({
  // Used for absolute URLs (sitemap, canonical, social). With a custom apex
  // domain there is no base path, so `base` is left at its default '/'.
  site: 'https://passout.club',
  vite: {
    server: {
      fs: {
        allow: [repoRoot],
      },
    },
  },
});
