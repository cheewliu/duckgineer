---
title: "Claude Code in a Real Codebase: 30 Days of Honest Notes"
date: 2026-03-27
description: "What Claude Code is actually good at, where it falls short, and the daily workflow I settled on after a month of real use."
tags: ["claude-code", "cli", "workflow"]
cover: "https://picsum.photos/seed/coding/800/450"
draft: false
series: "Claude in the Real World"
seriesOrder: 1
---

I've been using Claude Code as my primary coding assistant for 30 days. Not for demos, not for blog posts — for actual work on a C# test automation platform used in production.

Here's what I actually found.

## What It's Good At

**Navigating unfamiliar code fast.** The `/find` and natural language search is genuinely useful when you're dropped into a codebase you don't own. "Where does this project configure the instrument timeout?" gets you to the right file in seconds instead of minutes of grepping.

**Writing tests for existing code.** Give it a class, ask for xUnit tests. The output is good, covers happy path and common edge cases, and compiles 90%+ of the time on first pass.

**Refactoring with a safety net.** "Extract this logic into a private method" or "rename this parameter across the file" — these work reliably. The edits are surgical and don't break surrounding code.

**Explaining code you didn't write.** Better than reading it yourself, especially for terse LINQ chains or complex async/await patterns.

## What It Struggles With

**Long multi-file tasks.** If a feature touches 8 files, Claude Code starts losing coherence around file 5. It forgets what it changed earlier, re-introduces conflicts, or starts contradicting its own earlier decisions.

*My fix:* Break every multi-file task into single-file commits. Review after each one.

**Your internal APIs.** Claude doesn't know your custom framework. It will invent method names that look plausible but don't exist. This is not a bug — it's missing context.

*My fix:* Add a `CLAUDE.md` at the repo root with the 10-20 most important internal types and what they do.

**Making judgment calls.** "Should this use a factory or a builder?" — Claude will answer, but it's just averaging across its training data. For your specific codebase, your judgment is better.

## The Workflow I Settled On

```
1. Open Claude Code alongside my editor (not instead of it)
2. For new code: write a skeleton myself, ask Claude to fill it in
3. For existing code: ask Claude to explain before asking it to change
4. After any AI-generated edit: read every line before committing
5. For complex tasks: one file at a time, commit in between
```

Rule 4 is the most important. The moment you stop reading AI-generated code before committing it, you're accumulating technical debt you don't understand.

## The Honest Productivity Number

On tasks where Claude Code helps (targeted edits, test generation, refactoring), I'm about **2-3x faster**. On tasks where it doesn't (complex stateful logic, novel architectural decisions), it's a wash or slightly slower because of the back-and-forth.

Overall project velocity: up about 40%. That's a real number, not a vibe. I tracked it.

## Would I Recommend It?

Yes, with clear expectations. It's a force multiplier for a skilled engineer, not a replacement for skill. If you expect it to understand your codebase, design your architecture, and make decisions for you — you'll be disappointed. If you use it as a very fast typist that knows a lot of patterns — you'll find it genuinely useful.
