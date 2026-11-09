import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  site: 'https://1612492.github.io',
  server: {
    port: 3000,
  },
});
