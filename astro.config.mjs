import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://engineerforge-ai.vercel.app',
  output: 'static',
  adapter: vercel(),
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
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
