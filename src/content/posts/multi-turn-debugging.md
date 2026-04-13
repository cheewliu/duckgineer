---
title: "Multi-Turn Conversations for Complex Debugging Workflows"
date: 2026-03-15
description: "How to structure a multi-turn Claude conversation to debug non-obvious problems — and why the sequence of questions matters more than any single prompt."
tags: ["claude", "debugging", "workflow", "prompt-engineering"]
cover: "https://picsum.photos/seed/debug/800/450"
draft: false
---

Single-prompt debugging rarely works for complex problems. The real power of a language model in debugging is its ability to hold context across a conversation — and iteratively narrow down the problem space.

Here's the conversation structure I've settled on after a lot of trial and error.

## The Structure

### Turn 1: Orient Without Anchoring

Don't tell Claude what you *think* the problem is yet. If you anchor Claude to your hypothesis, it will search for evidence that confirms it.

```
I have an unexpected behavior in my OpenTAP test step. Here's what's happening:

Expected: [describe expected behavior]
Actual: [describe actual behavior]
Frequency: [always / intermittent / under specific conditions]

Here is the relevant code:
[paste code — just the code, no hypothesis]
```

Let Claude generate hypotheses cold. This is more valuable than asking it to evaluate yours.

### Turn 2: Narrow With Constraints

Take the best 2-3 hypotheses from Turn 1 and add the constraints Claude didn't have:

```
Hypothesis 2 (timing issue) is interesting. Some additional context that might be relevant:
- This only happens when two instruments are connected simultaneously
- The issue disappears if I add a 500ms Thread.Sleep before the measurement call
- We're using USB-GPIB, not Ethernet

Does this change your analysis?
```

### Turn 3: Request Diagnostic Code

Once you've narrowed to 1-2 hypotheses:

```
Based on the USB-GPIB timing theory, write me diagnostic logging I can add to
pinpoint where the delay is happening. I want to understand which specific call
is taking longer than expected.
```

Getting Claude to write your diagnostic code is often faster and better than writing it yourself. It knows what to instrument because it knows the hypothesis.

### Turn 4: Feed the Results Back

```
Here's the output from the diagnostic logging:

[paste actual log output]

What does this tell us?
```

This is the high-value turn. Claude now has your code, the hypothesis, and the actual runtime evidence. The analysis at this point is usually accurate and specific.

### Turn 5: Request the Fix

```
Based on this evidence, write the fix. Keep the change minimal — just address
the root cause without refactoring surrounding code.
```

"Keep the change minimal" is important. Without this constraint, Claude will often "clean up" nearby code, which introduces noise into your diff and makes review harder.

## Example: Real Debugging Session

Here's a compressed version of a real session that found a race condition in an instrument synchronization routine.

**Turn 1:** Claude generated 4 hypotheses: incorrect state machine, missing null check, threading issue, instrument timeout.

**Turn 2:** I ruled out null check (null guard already present) and state machine (single-threaded context). Claude doubled down on threading.

**Turn 3:** Claude wrote diagnostic code that logged timestamps before and after each instrument call.

**Turn 4:** The logs showed two calls completing 0ms apart — impossible for real hardware. Claude identified it immediately: the instrument mock was returning instantly, but the real instrument needed 120ms for settling time.

**Turn 5:** Fix was a `await Task.Delay(SettlingTimeMs)` before the read call, with `SettlingTimeMs` as a configurable property. Four lines.

Total conversation: 12 minutes. I had spent 90 minutes on this before starting the Claude session.

## The Anti-Pattern to Avoid

Don't do this:

```
Turn 1: Here's my code. It's broken. Fix it.
```

This collapses the debugging process into a single inference with no iteration. You'll get a guess, not a diagnosis. For anything non-trivial, the multi-turn approach consistently outperforms single-shot prompting.
