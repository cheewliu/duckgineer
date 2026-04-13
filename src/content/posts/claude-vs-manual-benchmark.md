---
title: "AI vs Manual: A 90-Day Benchmark on Real Engineering Tasks"
date: 2026-03-28
description: "I tracked time and quality on 200+ engineering tasks, split between Claude-assisted and manual. Here are the actual numbers."
tags: ["benchmark", "productivity", "claude", "workflow"]
cover: "https://picsum.photos/seed/chart/800/450"
draft: false
series: "Claude in the Real World"
seriesOrder: 3
---

I tracked every engineering task for 90 days. 200+ tasks, each tagged with whether it was done manually or with Claude assistance, and how long it took.

Here's what the data actually says.

## Methodology

Every task was logged in a simple spreadsheet:
- Task type (code generation, debugging, test writing, documentation, refactor)
- Time to complete
- Method (manual / Claude-assisted)
- Quality rating (1-5, self-assessed on review)
- Rework required? (yes/no)

Tasks under 5 minutes were excluded — too small to measure meaningfully.

## Watch: Data Walkthrough

<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    title="90-Day Benchmark Data Walkthrough"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

## Results by Task Type

| Task Type | Manual Avg (min) | AI-Assisted Avg (min) | Speedup |
|---|---|---|---|
| Unit test writing | 28 | 9 | **3.1x** |
| Boilerplate code | 22 | 6 | **3.7x** |
| Refactoring | 35 | 18 | 1.9x |
| Debugging | 41 | 29 | 1.4x |
| Architecture decisions | 48 | 52 | 0.9x |
| Documentation | 19 | 8 | **2.4x** |

## The Surprises

**Debugging is less improved than expected.** Claude is good at explaining what's wrong but often proposes fixes that don't account for the full context of the system. The real debugging work — understanding *why* the system ended up in a bad state — still requires human reasoning.

**Architecture decisions are slightly *worse* with AI.** The extra time comes from having to evaluate and push back on Claude's suggestions. When I just thought it through myself, I was faster. Claude's input isn't useless — but processing it costs time.

**Unit test writing is the biggest win.** This is where AI assistance is almost purely additive. The tests are correct, cover the right cases, and I can review them faster than I can write them.

## Quality Did Not Drop

Average quality rating, manual: 3.8/5
Average quality rating, AI-assisted: 3.7/5

Not statistically significant. Quality held flat while speed improved significantly for certain task types.

Rework rate was actually slightly *lower* for AI-assisted tasks (18% vs 23% for manual). I think this is because the AI output forced me to read and evaluate code more carefully before committing, which caught my own mistakes.

## What This Means

AI assistance is not uniformly valuable. It's **highly valuable** for mechanical tasks (test writing, boilerplate, documentation) and **marginally valuable or neutral** for tasks requiring system-level understanding.

The engineers who will benefit most from AI tools are those who already do a lot of the mechanical tasks well — because they know how to evaluate the output. Engineers who struggle with the mechanical tasks will struggle even more to validate AI output.

The skill is still in knowing what good looks like.
