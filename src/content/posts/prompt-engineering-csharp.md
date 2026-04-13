---
title: "Prompt Engineering for Deterministic C# Code Generation"
date: 2026-04-09
description: "How I structure prompts to get Claude to produce reliable, compilable C# every time — including the exact templates I use."
tags: ["prompt-engineering", "csharp", "claude"]
cover: "https://picsum.photos/seed/csharp/800/450"
draft: false
---

Getting Claude to generate C# code is easy. Getting it to generate *correct*, *compilable*, *idiomatic* C# that fits into your existing codebase — that's the engineering challenge.

After six months of daily Claude API usage in a production C# + OpenTAP environment, I've developed a set of prompt patterns that produce deterministic, reliable output almost every time.

## The Core Problem

Claude is a probabilistic model. Without constraints, it will:
- Choose whichever C# pattern feels natural to it
- Mix coding styles from different .NET eras
- Invent method names that don't exist in your codebase
- Skip error handling when the problem looks simple

The goal of prompt engineering for code is to reduce that variance to near zero.

## Pattern 1: Provide a Code Skeleton

Never ask Claude to write a class from scratch. Give it the skeleton:

```csharp
// Existing class skeleton — fill in the implementation
public class VoltageValidator : IParameterValidator
{
    private readonly double _minVoltage;
    private readonly double _maxVoltage;

    public VoltageValidator(double min, double max)
    {
        // TODO: implement
    }

    public ValidationResult Validate(TestParameter param)
    {
        // TODO: implement
        // Rules:
        // 1. param.Value must be within [_minVoltage, _maxVoltage]
        // 2. Return ValidationResult.Pass() or ValidationResult.Fail(reason)
        // 3. Do not throw exceptions
    }
}
```

When you hand Claude a skeleton with `// TODO: implement` comments and inline rules, the output variance drops dramatically. Claude fills in the blanks rather than making architectural decisions.

## Pattern 2: Show One Example of Existing Code

```
Here is an existing validator in this codebase for reference:

[paste FrequencyValidator.cs here]

Now implement VoltageValidator following the exact same style.
```

This is **one-shot prompting** at the architecture level. Claude will match:
- Null-check patterns
- Exception handling style
- Logging calls
- Method ordering

## Pattern 3: State What NOT to Do

Negative constraints are underrated:

```
Requirements:
- Do NOT use LINQ where a simple loop is clearer
- Do NOT add XML doc comments
- Do NOT wrap in a try/catch unless explicitly asked
- Do NOT change the method signature
```

Explicit exclusions cut the most common Claude-isms: wrapping everything in try/catch, adding `/// <summary>` to every method, defaulting to LINQ even when it hurts readability.

## Pattern 4: Specify the .NET Target

```
Target: .NET 8, C# 12
Nullable reference types: enabled
```

Without this, Claude will sometimes generate .NET Framework-era patterns (pre-nullable, pre-records, pre-pattern-matching). One line of context prevents this.

## Real Results

Using these four patterns together, I went from about a 40% first-pass compilation rate (in a complex codebase) to over 90%. The remaining 10% usually comes from missing context about internal APIs — which a fifth pass of "here is the interface for X" resolves.

> The key insight: Claude doesn't need to be smarter, it needs more constraints. Every `// TODO` comment and every negative requirement is a degree of freedom removed from a probabilistic model.

## Template I Actually Use

```
Context: [2-3 sentence description of the codebase and what this code will do]
Target: .NET 8, C# 12, nullable enabled
Style reference: [paste one similar class]

Task: Implement [ClassName] following the skeleton below.

Constraints:
- Match the style of the reference exactly
- Do not add XML docs
- Do not add logging unless the reference class has it
- Do not change method signatures

[paste skeleton]
```

Copy it, fill it in. That's the whole system.
