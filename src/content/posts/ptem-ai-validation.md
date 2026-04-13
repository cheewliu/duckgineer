---
title: "PTEM + Claude: AI-Assisted Parameter Validation at Scale"
date: 2026-03-07
description: "How I integrated Claude into a PTEM-based test automation platform to validate test parameters before execution — and what I learned about LLM reliability at scale."
tags: ["ptem", "opentap", "test-automation", "claude", "csharp"]
cover: "https://picsum.photos/seed/validate/800/450"
draft: false
---

PTEM (Platform for Test and Measurement) manages test parameters across complex instrument configurations. Some of those parameters have constraints that are hard to express in simple type rules — they depend on instrument state, calibration data, or relationships between parameters.

This post covers how I added a Claude-powered validation layer that checks these "soft" constraints before a test run starts.

## The Problem

PTEM's built-in parameter validation handles type safety and range checks well:

```csharp
[Range(0.0, 30.0)]
public double PowerdBm { get; set; }
```

But it can't handle:

- "Power must not exceed the instrument's current calibration limit for this frequency"
- "If channel 1 and channel 2 are both active, their combined power must stay below 40W"
- "This sweep rate is valid for sine waves but not for arbitrary waveforms"

These constraints exist in documentation and tribal knowledge, not in code. Claude can reason about them.

## The Architecture

```
TestPlan.Run()
    ↓
ParameterValidationMiddleware
    ↓
[type/range validation] ──── fail fast
    ↓
[simple rule engine] ──── common constraint checks
    ↓
[Claude validation] ──── complex/contextual constraints
    ↓
[human review prompt] ──── warnings requiring engineer sign-off
    ↓
Execution
```

Claude sits at layer 3 — only reached if the simpler, faster checks pass. This keeps API costs low (Claude sees maybe 15% of test runs) and avoids adding latency to straightforward cases.

## The Validation Prompt

```
You are validating test parameters for a PTEM-based RF test system.

Instrument state:
{instrumentStateJson}

Test parameters being validated:
{parameterJson}

Known constraints (from calibration records):
{constraintJson}

Check for any violations or risks. For each issue found, return:
- severity: "error" | "warning"
- parameter: the parameter name
- reason: short explanation (max 80 chars)

If no issues found, return an empty array.
Respond with JSON only.
```

This prompt is lean: instrument state, parameters, known constraints, and a clear output schema. No prose.

## Reliability in Practice

After 3 months and ~4,000 validation calls:

- **True positive rate** (Claude correctly flagged a real issue): 94%
- **False positive rate** (Claude flagged something that wasn't a problem): 6%
- **False negative rate** (Claude missed a real issue): 3%

The 3% false negative rate is acceptable for our use case because PTEM still has the lower-level type/range checks as a safety net. Claude catches the *contextual* errors — the ones that would have caused a confusing mid-test failure.

## Cost Profile

At ~15% of test runs hitting the Claude validation layer, and averaging 1,200 input tokens + 80 output tokens per call, the monthly cost across our team is about $35. Compared to the cost of a test engineer debugging a mid-run failure — $35 is trivial.

## What Didn't Work

**First attempt: sending full parameter schema.** The full PTEM parameter schema for a complex test plan is 8,000+ tokens. Too expensive, and Claude's accuracy dropped with that much context. Solution: extract only the parameters involved in the current test step.

**Second attempt: using Claude for all validation.** Running Claude on every test run was slow (added 800ms per run) and expensive. Solution: layered validation — Claude only when simpler checks pass.

**Third attempt: free-form validation prompt.** Early prompts asked Claude to "check for any issues." Output was inconsistent — sometimes prose, sometimes JSON, sometimes a list. Solution: explicit JSON schema in the prompt + retry loop.

The layered approach that works now is the third or fourth iteration. Budget time for that iteration — the first prompt that "looks right" rarely holds up to production load.
