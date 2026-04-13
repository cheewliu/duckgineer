---
title: "Token Optimization: How I Cut API Costs by 60% in Production"
date: 2026-04-07
description: "A real breakdown of where tokens were being wasted in my Claude API usage, and the specific techniques that cut the bill without hurting output quality."
tags: ["token-optimization", "claude", "cost"]
cover: "https://picsum.photos/seed/optimize/800/450"
draft: false
series: "Cost Optimization"
seriesOrder: 2
---

In January I was spending roughly $380/month on Claude API calls for a test automation assistant. By March that number was $148. Same workload, same output quality. Here's exactly what changed.

## Baseline: Where the Tokens Were Going

I instrumented every API call and logged token counts per request type. After a week of data:

| Request Type | Avg Input Tokens | Avg Output Tokens | Monthly Cost |
|---|---|---|---|
| Code generation | 2,840 | 680 | $142 |
| Log analysis | 4,120 | 240 | $118 |
| Test step description | 890 | 310 | $67 |
| Validation checks | 1,640 | 90 | $53 |
| **Total** | | | **$380** |

The surprise: log analysis was the second biggest cost driver despite producing short outputs. The inputs were massive.

## Fix 1: Compress System Prompts (Saved ~$40/month)

My original system prompt was 840 tokens. It was written to be readable — full sentences, examples, context. I rewrote it as a compact instruction set:

**Before (840 tokens):**
```
You are an expert test automation assistant that helps engineers working with OpenTAP...
[8 paragraphs of context and examples]
```

**After (310 tokens):**
```
Role: Test automation assistant for OpenTAP/PTEM C# workflows.
Output: Code only unless asked for explanation.
Style: Match existing codebase. .NET 8. Nullable enabled.
Avoid: XML docs, try/catch without reason, LINQ over simple loops.
```

Same behavior. 63% fewer system prompt tokens on every single call.

## Fix 2: Pre-Filter Logs Before Sending (Saved ~$90/month)

My log analysis calls were sending entire log files — sometimes 4,000+ tokens — when Claude only needed the relevant sections. I added a pre-processing step:

```csharp
public string ExtractRelevantLogLines(string fullLog, int contextLines = 5)
{
    var lines = fullLog.Split('\n');
    var errorIndices = lines
        .Select((line, i) => new { line, i })
        .Where(x => x.line.Contains("ERROR") || x.line.Contains("FAIL"))
        .Select(x => x.i)
        .ToList();

    var relevantIndices = errorIndices
        .SelectMany(i => Enumerable.Range(
            Math.Max(0, i - contextLines),
            contextLines * 2 + 1))
        .Distinct()
        .OrderBy(i => i);

    return string.Join('\n', relevantIndices.Select(i => lines[i]));
}
```

Average log input dropped from 4,120 to 890 tokens. The quality of Claude's analysis actually *improved* because it wasn't distracted by irrelevant log sections.

## Fix 3: Cache Identical Requests (Saved ~$55/month)

Many validation check calls were identical — same code, same rules. I added a simple hash-based cache:

```csharp
private static readonly Dictionary<string, string> _cache = new();

public async Task<string> GetValidationAsync(string code, string rules)
{
    var key = Convert.ToBase64String(
        SHA256.HashData(Encoding.UTF8.GetBytes(code + rules)));

    if (_cache.TryGetValue(key, out var cached))
        return cached;

    var result = await _claudeClient.CompleteAsync(code, rules);
    _cache[key] = result;
    return result;
}
```

For a test suite that validates the same components repeatedly, cache hit rate was 38%. That's 38% of validation calls costing zero.

## Fix 4: Right-Size the Model

I was using Claude Sonnet for everything, including tasks that only needed pattern matching. I moved simple validation checks to Haiku:

- Code generation: Sonnet (quality matters)
- Log analysis: Sonnet (complex reasoning)
- Simple parameter validation: Haiku (pattern matching, ~10x cheaper)

## Summary

| Fix | Monthly Saving |
|---|---|
| Compress system prompts | $40 |
| Pre-filter log inputs | $90 |
| Cache identical requests | $55 |
| Right-size model | $47 |
| **Total** | **$232** |

The lesson: most token waste is on the *input* side, not the output. Instrument your calls, find the highest-volume request types, and attack those first.
