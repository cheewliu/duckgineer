# Duckgineer — Post Template & Style Guide

This file is the reference for how every post on Duckgineer should be written and structured.
Update this file whenever the style evolves.

---

## Frontmatter

```yaml
---
title: "Your Post Title Here"
date: YYYY-MM-DD
description: "One sentence — punchy, honest, maybe slightly funny. No buzzwords."
tags: ["tag-one", "tag-two"]   # lowercase, hyphenated
draft: false                    # set true while writing, false when ready to publish
cover: "/images/your-cover.png" # always a local image in public/images/
series: "Series Name"           # optional — only if part of a series
seriesOrder: 1                  # optional — order within the series
---
```

---

## Tone & Voice

- **Fun, not formal.** Write like you're explaining to a smart colleague over coffee — not presenting at a conference.
- **First person.** Say "I", not "we" (unless referring to the team).
- **Honest.** If something broke, say it broke. If you wasted time, say how much.
- **No hype.** Avoid "revolutionary", "game-changing", "unlock the power of". They mean nothing.
- **A little humour goes a long way.** One good joke per post is better than forced jokes everywhere.
- **Short sentences win.** If a sentence needs a comma and a semicolon, split it into two.

---

## Structure

### Opening — hook first, context second
Don't start with "In this post I will...". Start with the thing that made you write the post.

```
Bad:  "In this post, we will explore how AI can help with test automation."
Good: "I spent three days getting Claude to write OpenTAP test steps. Day one was a disaster."
```

### Sections (H2 headings)
- 3–5 sections per post
- Each section has a clear job — don't combine two ideas into one section
- Section titles should be direct, not vague ("What broke" > "Challenges encountered")

### Code blocks
- Always include real code — no pseudocode unless explaining a concept
- Add a comment at the top of each block saying what it does
- Keep blocks focused — don't dump 200 lines, extract the relevant part

### Memes / images
- Inline images are welcome — keeps it human
- Name images clearly: `grammar-cancer-meme.png`, `opentap-flow-diagram.png`
- All images go in `public/images/`, referenced as `/images/filename.png`

### Closing
- End with something real — a takeaway, an open question, or what you're trying next
- No "thanks for reading" or "hope this helps" — just end the thought

---

## Tags to use

| Tag | Use for |
|-----|---------|
| `meta` | Posts about the site itself |
| `introduction` | First post, site updates |
| `claude` | Claude-specific tips, prompts, experiments |
| `opentap` | OpenTAP automation content |
| `engineering` | General SW/HW engineering + AI |
| `prompt-engineering` | Prompts, techniques, deterministic output |
| `workflow` | Day-to-day habits, tools, shortcuts |
| `ci-cd` | Pipelines, automation, build systems |
| `token-optimization` | Cost, context, compression |

---

## The AI question

If asked: the **ideas and experiences are 100% the author's**. Claude or other tools may be used to clean grammar or structure a passage — that's it. Content is never generated from scratch by AI.

---

## Cover images

- Always a local PNG in `public/images/`
- Named descriptively: `hero-opentap-claude.png`, `hero-prompt-engineering.png`
- Wide landscape format (ideally 1600×600 or similar)
- Fun, real-photo style preferred — no obvious AI renders

---

## File naming

```
src/content/posts/your-post-slug.md
```

- All lowercase, hyphen-separated
- Matches the URL: `duckgineer.vercel.app/posts/your-post-slug`

---

## Checklist before publishing

- [ ] `draft: false` set
- [ ] Cover image uploaded to `public/images/`
- [ ] Description is one punchy sentence
- [ ] No PTEM mentions — OpenTAP only
- [ ] Code blocks have comments
- [ ] Read it out loud — does it sound like a human?
- [ ] No "In this post..." opener
