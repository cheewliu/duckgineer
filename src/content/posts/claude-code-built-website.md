---
title: "I Used Claude Code to Build This Entire Website. Here's the Honest Truth."
date: 2026-04-13
description: "100% Claude Code, zero CSS written by hand. Here's what actually happened, what prompts worked, and why the duck is still in charge."
tags: ["claude", "workflow", "engineering"]
cover: "/images/hero-claude-built-website.png"
draft: false
---

I didn't write a single line of CSS for this website.

I described what I wanted, and Claude Code built it. And no, it wasn't magic. It was prompting. Specific, deliberate, sometimes-corrected prompting.

Here's the honest breakdown.

## What "Building With Claude Code" Actually Means

It's not clicking a button and watching a site appear. It's a constant back-and-forth of decisions. Every instruction is a judgement call made by a human. Claude executes. You decide.

The difference between a good result and a wasted ten minutes usually comes down to how clearly you described the problem.

```
❌ "Make the website look better"

✅ "The letter g in the banner title is being cropped at the bottom.
   Increase line-height and add padding-bottom to fix the descender.
   The fix should apply to both the home banner and the about page."
```

```
❌ "Change the colors"

✅ "Change the entire color scheme from purple to duck yellow.
   Update all CSS variables, hardcoded color values, gradients,
   and the logo mark. Keep code blocks in VS dark-plus theme, don't touch those."
```

Vague in, vague out. The more context you give, the more it behaves like someone who actually understands your product.

## Claude Code Is the Senior Engineer

Not a junior. Not an autocomplete tool. A senior.

It holds full context across files, reasons about consequences you didn't think to ask about, and catches things you didn't explicitly ask it to catch. Give it a clear brief and it ships. Give it an audit task and it comes back with a full table of issues, prioritised, with file paths and line numbers.

At one point I asked it to check the whole codebase for old brand names lingering in the code. It found a localStorage key still using the old prefix, tag colours using old brand values, and a fallback URL in the RSS feed that nobody would have noticed for months.

I didn't ask for any of that specifically. It just... knew.

But here's the thing nobody wants to say out loud. Someone still has to give the instruction. Someone still has to look at the page and say *"that doesn't feel right"* or *"the duck needs to be more prominent"*. That's the application person. The one who sees the product, makes the call, owns the vision.

That role isn't going anywhere. And honestly? I don't think it should.

## The CLAUDE.md Trick

One markdown file changed the whole workflow.

Claude has a persistent memory system. Drop a `CLAUDE.md` at the root of your repo and it reads it at the start of every session. No more repeating context every time you open a new chat. It just knows.

It remembered the duck. It remembered the brand rules. It remembered which code theme we settled on after changing it three times. If you're building anything non-trivial with Claude Code, a `CLAUDE.md` is not optional.

I wrote a whole post on using `.md` files for team AI standardisation. [That's here](/posts/prompt-engineering-csharp) if you want the deeper dive.

## It Still Took More Than One AI

Claude Code handled all the code. But the images? That was [Nano Banana](https://nanobanana.ai).

Different tool. Different job. Getting an end-to-end product built still means knowing which AI to reach for at each layer, and assembling them yourself. Claude Code can describe what a good cover image should look like. It can write the prompt. But it can't generate the image.

Knowing that distinction, and switching tools when you hit it, is still a human call.

*(There's a whole post to be written about multi-AI workflows. I'll get to it. The duck has already added it to the backlog.)* 🦆

## The Prompts That Actually Worked

A few more real examples from this build, since that's what this post is actually about:

```
"The about page 'Who's driving' section needs more content.
 Author is a SW and HW engineer who leads the team on AI adoption.
 Keep it fun and honest. Change the icon to a duck and add
 a joke that the duck wrote this section."
```

```
"Do a full audit. Check for any remaining old brand names,
 broken internal links, outdated colors, and storage keys
 with old prefixes. Report everything by category with
 file paths and line numbers, then fix it all."
```

```
"The code block styling looks too dark and hard to read.
 Change it to look like VS Code, the dark-plus theme.
 Keep the copy button visible."
```

Every one of those is specific, has context, and tells Claude what *done* looks like. That last part matters more than people think.

## The Honest Take

Claude Code didn't build Duckgineer. I did, with Claude Code doing the heavy lifting on execution.

The ideas, the decisions, the "no that still doesn't look right" moments, the product vision, the duck. All human. Claude wrote the code that I would have written, faster and with fewer typos. That's the deal.

If you're an engineer who's been treating AI tools as autocomplete with extra steps, you're leaving a lot on the table. Give it real context. Give it a memory file. Give it a specific brief. Then get out of the way and let it ship.

The duck will supervise.
