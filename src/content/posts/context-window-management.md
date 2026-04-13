---
title: "Context Window Management: The Hidden Skill in Claude Workflows"
date: 2026-03-05
description: "Most engineers think about what to put in the context. Few think about what to leave out — and that's where quality and cost are actually won or lost."
tags: ["claude", "prompt-engineering", "token-optimization", "workflow"]
cover: "https://picsum.photos/seed/memory/800/450"
draft: false
series: "Cost Optimization"
seriesOrder: 1
---

Every prompt you send to Claude has a context window. How you fill it determines the quality of the response, the cost of the call, and how reliably Claude follows your instructions.

Most engineers treat context as "more is better." That's wrong.

## Context Has Weight

Think of Claude's attention as a finite resource distributed across everything in the context. A 2,000-token context gives every piece of information meaningful weight. A 20,000-token context distributes that same attention across 10x more material — important things get less focus.

This is why sending an entire codebase "for reference" often produces worse results than sending one well-chosen file. More context is only better if every token in that context is relevant to the task.

## The Three Context Failure Modes

### 1. Irrelevant Context (Distraction)

```
Here is our entire test automation framework [8,000 tokens]
Now fix this 10-line validation function.
```

Claude sees 8,000 tokens of framework code and 10 lines of validation code. The fix might be technically correct but use patterns from the framework code that don't apply, reference methods that exist in the framework but not in the validation module, or simply be worse because Claude's attention was scattered.

**Fix:** Send only what's needed. For a function fix, send the function, the interface it implements, and one or two related examples.

### 2. Contradictory Context (Confusion)

```
[System prompt]: Always use explicit types, never use var
[User message]: Here is an existing file that uses var extensively
[Task]: Add a new method following the existing style
```

Claude has to choose between your system rule and your style reference. It will often hedge — using `var` sometimes and explicit types sometimes — producing inconsistent output.

**Fix:** Keep system prompt rules and code examples consistent. If you're providing a style reference, make sure it matches your rules. If it doesn't, acknowledge the exception explicitly.

### 3. Stale Context (Drift)

In a long conversation:

```
Turn 1: Establish that we're building a validator
Turn 5: Establish that the validator uses async/await
Turn 12: Ask Claude to write a test for the validator
```

By Turn 12, Claude may have lost the async context from Turn 5. The generated test might be synchronous when it shouldn't be.

**Fix:** Restate critical constraints at each major context switch. "We're writing a test for the async validator established earlier — all test methods should be `async Task`."

## Practical Context Sizing

| Task Type | What to Include |
|---|---|
| Fix a function | The function + its interface + 1 example of a similar fixed function |
| Write a test | The class under test + test base class + 1 existing test file |
| Explain code | Just the code. No extra context — Claude doesn't need it to explain. |
| Add a feature | The integration point + the interface to implement + your coding conventions |
| Debug an issue | Error output + the code path that caused it (not the whole file) |

## The "Would a New Engineer Need This?" Test

Before adding a piece of context, ask: would a new engineer who knows the language need this specific information to do this specific task?

If yes — include it.
If no — leave it out.

This framing prevents the instinct to "give Claude everything just in case." A new engineer doesn't need the entire codebase to fix a validation function. Neither does Claude.

## Context as a Quality Lever

The engineers getting the best results from Claude aren't sending more context — they're sending *better* context. Smaller, more relevant, more consistent context windows produce more reliable, higher-quality output than large, kitchen-sink contexts.

Treat context construction as part of the engineering work, not an afterthought.
