# Duckgineer — Claude Memory

This file is read by Claude at the start of every session.
Update it whenever preferences, conventions, or decisions change.

---

## Project

- **Name:** Duckgineer
- **Tagline:** Where Engineers Talk, AI Thinks.
- **Framework:** Astro 6, static output
- **Repo:** https://github.com/cheewliu/duckgineer
- **Live site:** https://duckgineer.vercel.app
- **Local dev:** http://localhost:4321

---

## Brand

- **Logo mark:** 🦆 duck emoji on yellow (`#F5C518`) rounded square
- **Wordmark:** `Duck` (light weight) + `gineer` (gradient bold)
- **Accent colour:** `#F5C518` duck yellow / `#F97316` orange
- **Mascot:** A rubber duck — used throughout (favicon, author avatar, about page jokes)
- **Tone:** Fun, honest, engineering-first. The duck is a recurring character.

### Old names — NEVER use these anywhere
- ❌ EngineerForge AI
- ❌ Applied Claude Lab
- ❌ Token Drift
- ❌ engineerforge-ai (any variation)

---

## Author

- SW and HW engineer
- Leads engineers (SW + HW) on adopting AI in real workflows
- Implements AI solutions for the team
- Primary tools: **Claude**, Codex, OpenTAP
- **Never mention PTEM** — OpenTAP only
- No specific language focus (not C#-only) — covers engineering broadly

---

## Posts

- All posts live in `src/content/posts/*.md`
- Cover images go in `public/images/` and are referenced as `/images/filename.png`
- Full style guide: `docs/post-template.md`
- **Always read `docs/post-template.md` before drafting or editing a post**
- Always show draft to user before implementing

### Existing posts (newest first)
| File | Title | Date |
|------|-------|------|
| `prompt-engineering-csharp.md` | Using .md Files to Standardise Your Team's AI Agent | 2026-04-13 |
| `why-i-am-building-duckgineer.md` | Why I Am Building Duckgineer | 2026-04-10 |

### Images used per post
| Post | Cover | Inline images |
|------|-------|---------------|
| `why-i-am-building-duckgineer.md` | `/images/hero-why-i-building.png` | `/images/grammar-cancer-meme.png` |
| `prompt-engineering-csharp.md` | `/images/hero-md-team-standard.png` | — |

---

## Writing style

- Fun, honest, first-person — not formal or corporate
- Short sentences, direct section titles
- One good joke > forced humour everywhere
- No "In this post I will..." openers
- No hype words: revolutionary, game-changing, unlock, leverage
- Code blocks must have real code + comments, no pseudocode dumps
- Memes and inline images are encouraged — keeps it human
- End posts with a real takeaway or open question, not "thanks for reading"
- Duck jokes and references are welcome — the duck is part of the brand

### The AI transparency rule
Ideas and experiences are 100% the author's. Claude may be used to clean grammar or structure — never to generate content from scratch.

---

## Site conventions

- **Syntax highlighting:** Shiki `dark-plus` theme (VS Code dark)
- **Code block background:** `#1e1e1e`, border `#3c3c3c`
- **Fonts:** Inter + JetBrains Mono, loaded async via Google Fonts
- **Theme:** dark/light toggle, localStorage key `duck-theme`, `data-theme` on `<html>`
- **Search:** Pagefind (runs post-build: `npx pagefind --site dist`)
- **Deployment:** Vercel, auto-deploys from `main` branch push
- **Favicon:** 🦆 duck SVG at `public/favicon.svg`

## Key files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config, Shiki theme, site URL (`duckgineer.vercel.app`), image domains |
| `src/styles/global.css` | All global styles, CSS variables, dark/light tokens |
| `src/layouts/BaseLayout.astro` | Head, fonts, FOUC prevention, theme toggle, scroll-reveal |
| `src/layouts/PostLayout.astro` | Post page layout — TOC, series banner, related posts, newsletter |
| `src/pages/[...page].astro` | Home + pagination |
| `src/pages/about.astro` | About page — duck avatar, duck disclaimer in author section |
| `src/components/Header.astro` | Nav — 🦆 logo, auto-generates categories from post tags |
| `src/components/Footer.astro` | Footer — 🦆 logo, tagline, copyright |
| `vercel.json` | CSP headers — must include fonts.googleapis.com + fonts.gstatic.com |
| `docs/post-template.md` | Post writing guide — read before drafting posts |
| `public/favicon.svg` | Duck emoji favicon on yellow background |
| `public/images/` | All post cover and inline images (local PNGs only) |

---

## Things to never do

- Never use old brand names: EngineerForge, Applied Claude Lab, Token Drift
- Never mention PTEM — OpenTAP only
- Never use `github-dark` or `dracula` Shiki theme — it's `dark-plus`
- Never use Picsum for cover images — all images are local PNGs in `public/images/`
- Never commit `.claude/` folder
- Never use `git add -A` blindly — stage specific files
- Don't add `--no-verify` to git commits
- Don't make posts sound like AI wrote them
- Always show a draft before implementing post changes

---

## Decisions log

| Date | Decision |
|------|----------|
| 2026-04-13 | Switched Shiki theme: github-dark → dracula → dark-plus (VS Code) |
| 2026-04-13 | Deleted 10 placeholder posts, keeping only 2 real ones |
| 2026-04-13 | All cover images: local PNGs in public/images/ (replaced Picsum) |
| 2026-04-13 | Home banner: hero-banner.png |
| 2026-04-13 | About page banner: about-banner.png |
| 2026-04-13 | est. 2024 → est. 2026 on about page |
| 2026-04-13 | Full rebrand: EngineerForge AI → Duckgineer |
| 2026-04-13 | Tagline: "Where Engineers Talk, AI Thinks." |
| 2026-04-13 | Color scheme: purple/blue → duck yellow (#F5C518) / orange (#F97316) |
| 2026-04-13 | Logo mark: EF text → 🦆 emoji, wordmark: Engineer+Forge → Duck+gineer |
| 2026-04-13 | Removed accent highlight from first manifesto card (all 3 now consistent) |
| 2026-04-13 | Post style guide created at docs/post-template.md |
| 2026-04-13 | Renamed post file: why-i-built-applied-claude-lab.md → why-i-am-building-duckgineer.md |
| 2026-04-13 | All site URLs updated to duckgineer.vercel.app |
| 2026-04-13 | GitHub repo renamed: EngineerForgeAI → duckgineer |
| 2026-04-13 | Favicon replaced: EF geometric SVG → 🦆 duck on yellow rounded square |
| 2026-04-13 | About author avatar: 🧑‍💻 → 🦆, added duck disclaimer joke |
