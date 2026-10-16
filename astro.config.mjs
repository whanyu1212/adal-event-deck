import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// Static output: `npm run build` writes a self-contained site to dist/,
// which runs with no network (fonts are bundled, nothing loads from a CDN).
export default defineConfig({
  output: 'static',
  integrations: [react()],
});
