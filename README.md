# Duckgineer

Where Engineers Talk, AI Thinks.

A real engineer's public lab showing how AI is used in software engineering workflows.

Built with [Astro](https://astro.build) and deployed on [Vercel](https://vercel.com).

## Development

```bash
npm install
npm run dev
```

## Writing Posts

Create a new `.md` file in `src/content/posts/`. See `docs/post-template.md` for the full style guide.

```markdown
---
title: "Your Post Title"
date: 2026-04-13
description: "One punchy sentence — honest, maybe a little funny."
tags: ["claude", "opentap"]
cover: "/images/your-cover.png"
draft: false
---

Post content here...
```

Set `draft: true` to hide a post in production (still visible in dev).

## Build & Deploy

```bash
npm run build     # Build + generate Pagefind search index
npm run preview   # Preview production build locally
```

Deploys automatically to Vercel on push to `main`.
