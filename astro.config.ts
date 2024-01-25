import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://1612492.github.io',
  server: {
    port: 3000,
  },
});
