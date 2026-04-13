import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://duckgineer.vercel.app',
  output: 'static',
  adapter: vercel(),
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
      wrap: false,
    },
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  image: {
    domains: ['fastly.picsum.photos', 'picsum.photos', 'images.unsplash.com'],
  },
});
