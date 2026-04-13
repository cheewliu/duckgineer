---
title: "Using .md Files to Standardise Your Team's AI Agent"
date: 2026-04-13
description: "Every engineer on the team has their own AI setup. Here's how one .md file gets them all behaving the same way — without cloning anyone's brain."
tags: ["prompt-engineering", "workflow", "claude"]
cover: "/images/hero-md-team-standard.png"
draft: false
---

Here's a problem nobody talks about: you've got a team of engineers, each running their own AI tool. Some use Claude. Some use GitHub Copilot. Some are on Cursor. And every single one of them has a slightly different setup, slightly different prompting habits, and slightly different results.

Same AI. Different brain. Different output.

Sound familiar?

## What's a .md Memory File?

Most AI tools today — Claude, Copilot, Cursor — support some form of persistent instruction file. A markdown file that the AI reads before doing anything. Think of it as a briefing document: "here's who we are, here's how we work, here's what we never do."

For Claude, it's `CLAUDE.md` — drop it at the root of your repo and Claude reads it automatically at the start of every session.

For GitHub Copilot, it's `.github/copilot-instructions.md` — [documented here](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions). Same idea. Load once, apply everywhere.

These files are just markdown. No plugins. No configuration panels. Just text. And that's exactly what makes them powerful — any engineer can read, edit, and version-control them.

## The Team Problem (and the Fix)

Here's what happens without a standard .md file:

- Engineer A asks Claude to write a test step. Gets clean, minimal code.
- Engineer B asks the same thing. Gets the same code wrapped in 3 layers of try/catch with XML doc comments on every method.
- Engineer C is using Copilot and gets something that looks like it was written in 2015.

Same tool. Wildly different output.

With a shared `.md` file committed to the repo, everyone loads the same instructions. The AI still belongs to each engineer — their account, their agent, their conversation — but it now follows the same rules.

> Same rules. Not the same person. (The AI is not HR. Probably.)

## What Goes in the File

Here's roughly what ours looks like for the engineering team:

```markdown
# Team AI Instructions

## Stack
- Language: C#, .NET 8
- Test framework: OpenTAP
- Style: match existing codebase patterns exactly

## Rules
- Never add XML doc comments unless asked
- Never wrap in try/catch unless the existing code does it
- Never use LINQ where a simple loop is clearer
- Always target .NET 8, nullable reference types enabled

## Context
- This is a test automation codebase
- Test steps inherit from OpenTAP's TestStep base class
- Keep output deterministic — no random IDs, no Guid.NewGuid() unless asked
```

Every engineer loads this. Claude reads it. Copilot reads it. Cursor reads it. Suddenly the whole team's AI is working from the same playbook.

## GitHub Copilot Specifically

Copilot has first-class support for this via `.github/copilot-instructions.md`. Drop the file in that path, commit it, and Copilot picks it up automatically for anyone working in that repo.

The format is the same — plain markdown. Rules, context, stack info, whatever you want the AI to know before it starts suggesting code.

```markdown
# Copilot Instructions

You are helping with a C# test automation codebase using OpenTAP.

- Match the coding style of existing files exactly
- Do not generate XML documentation comments
- Prefer explicit types over var unless the type is obvious
- All test steps must inherit from TestStep and override Execute()
```

One file. Every engineer's Copilot. Same behaviour.

## The Bigger Picture

This is really just version-controlling your team's AI behaviour. The `.md` file lives in git — it gets reviewed, it gets updated, it gets improved over time. When the team decides "we're moving to a new pattern", you update the file and everyone's AI follows.

It's not magic. It's just making the implicit explicit — the same way a coding standards doc works, except this one actually gets read. Because the AI reads it for you.
