---
title: "10 Claude CLI Tricks I Use Every Day"
date: 2026-03-20
description: "Short, practical Claude CLI tips from daily use — covering slash commands, CLAUDE.md, permission modes, and keyboard shortcuts that save real time."
tags: ["claude-code", "cli", "tips"]
cover: "https://picsum.photos/seed/terminal/800/450"
draft: false
series: "Claude in the Real World"
seriesOrder: 2
---

After months of daily Claude Code use, these are the habits and shortcuts that stuck. No fluff — just the ones I actually reach for.

## 1. `CLAUDE.md` is Your Most Valuable File

If you're not using a `CLAUDE.md` at the repo root, you're leaving capability on the table. This file is loaded into every Claude session automatically. Mine contains:

```markdown
# Repo Context

## Tech Stack
- .NET 8, C# 12, nullable enabled
- OpenTAP 9.x for test orchestration
- xUnit for unit tests
- PTEM for instrument abstraction

## Key Internal Types
- `ITestResource` — base interface for all instruments
- `TestParameter` — typed wrapper around instrument settings
- `ValidationResult` — return type for all validators (never throw)

## Coding Conventions
- No XML docs unless I ask for them
- No catch-all try/catch
- Match surrounding code style exactly
- Use `var` where type is obvious
```

This alone reduces correction loops by half.

## 2. `/clear` Between Context Switches

When switching from one task to a completely different one, always run `/clear`. Stale context from the previous task causes Claude to make incorrect assumptions about what you're working on. Takes one second, prevents confusing responses.

## 3. Paste Error Output Directly

Don't describe the error. Paste it. Full stack trace, full error message. Claude's analysis of a concrete error is significantly better than its reasoning about a described one.

## 4. Use `#` for Targeted File References

```
Look at #src/validators/VoltageValidator.cs and explain why the
tolerance calculation might give wrong results for negative voltages.
```

The `#` prefix tells Claude to read that specific file. More precise than "look at the voltage validator" which might match multiple files.

## 5. One Task Per Session for Complex Work

For anything that touches more than 2-3 files, start a fresh session per logical task. Multi-file context degrades over a long session. Fresh context = better coherence.

## 6. `/compact` When Context Gets Long

If you're in a long session and notice responses getting less precise, run `/compact`. Claude summarizes the conversation and continues with a compressed version. Keeps the working memory clean.

## 7. Ask for Alternatives Before Committing

```
Before we implement this — what are two other approaches? Give me
one sentence each with the main tradeoff.
```

Takes 10 seconds. Occasionally reveals an approach you hadn't considered. Claude is good at listing tradeoffs even when it's not good at choosing between them.

## 8. `/review` After Generating Code

After Claude writes anything non-trivial, ask it to review its own output:

```
Review the code you just wrote. What could go wrong? What edge cases
did you not handle?
```

Self-critique quality is surprisingly good. Claude will often identify its own omissions — missing null checks, unhandled error paths, incorrect edge case handling.

## 9. Be Explicit About File Scope

```
Only modify VoltageValidator.cs. Do not touch any other files.
```

Without explicit scope, Claude sometimes "helpfully" modifies related files. This is usually unwanted during a focused change.

## 10. End Sessions With a Handoff Note

If you're stopping work mid-task:

```
Summarize where we are: what's done, what's next, and any open
questions or risks. I'll paste this at the start of the next session.
```

Save that summary. Paste it at the top of your next session with "Continuing from: [summary]". Continuity across sessions with no context loss.

---

None of these are dramatic. They're the small habits that compound. The engineers getting the most out of Claude Code aren't using secret techniques — they're just being precise and deliberate with every interaction.
