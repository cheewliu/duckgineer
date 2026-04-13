---
title: "Building a Claude-Powered Code Review Step in CI/CD"
date: 2026-03-03
description: "Adding an AI review gate to a GitHub Actions pipeline — what it checks, where it adds value, and the guardrails that prevent it from becoming noise."
tags: ["claude", "ci-cd", "devops", "csharp"]
cover: "https://picsum.photos/seed/pipeline/800/450"
draft: false
---

I added a Claude-powered review step to a GitHub Actions pipeline for a C# test automation platform. Here's what it actually does and whether it's worth it.

## The Scope

The AI review step is deliberately narrow. It does not:
- Replace human review
- Block merges on its own (output is advisory only)
- Review test output or runtime behavior

It does:
- Flag obvious mistakes Claude can catch statically
- Check for violations of project-specific conventions
- Summarize changes in plain English for reviewers

## The Workflow

```yaml
name: AI Code Review

on:
  pull_request:
    branches: [main]
    paths: ['src/**/*.cs', 'tests/**/*.cs']

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get changed files
        id: diff
        run: |
          git diff origin/main...HEAD --unified=5 \
            -- '*.cs' > diff.txt

      - name: Claude review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: python scripts/claude_review.py diff.txt

      - name: Post review comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: review
            });
```

## The Review Script

```python
import anthropic
import sys

SYSTEM_PROMPT = """You are a code reviewer for a C# test automation codebase.
Review the diff for:
1. Obvious bugs (null refs, off-by-one, missing awaits)
2. Convention violations (no XML docs, no catch-all try/catch)
3. OpenTAP-specific issues (missing UpgradeVerdict, wrong attribute usage)

Output format (markdown):
## Summary
[1-2 sentence description of what changed]

## Issues Found
[list, or "None found" if clean]

## Suggestions
[optional improvements, not blocking]

Be concise. Flag only real issues, not style preferences."""

def review_diff(diff_path: str) -> str:
    with open(diff_path) as f:
        diff = f.read()

    if len(diff) < 10:
        return "## Summary\nNo C# changes detected."

    client = anthropic.Anthropic()
    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=800,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": diff}]
    )
    return message.content[0].text

if __name__ == "__main__":
    review = review_diff(sys.argv[1])
    with open("review.md", "w") as f:
        f.write(review)
    print(review)
```

Note: using Haiku for this. The task is pattern matching against known rules — it doesn't need Sonnet-level reasoning. Cost per PR: fractions of a cent.

## Actual Results After 60 PRs

Claude flagged something real in 23 of 60 PRs (38%). Of those:
- 14 were things human reviewers also caught
- 6 were things human reviewers missed
- 3 were false positives

The 6 missed catches — all minor but real — are why I kept it. A missing `UpgradeVerdict` call that would have left a test step in an indeterminate state. A `Task` returned without `await` that would have silently swallowed exceptions. Small things that are easy to miss in review.

## The Guardrail That Matters

**Never let AI review block a merge.** The moment it's a hard gate, engineers start fighting it, gaming it, and resenting it. It's advisory. Human judgment closes the PR.

This framing also makes it easier to tune — if Claude is generating too much noise, you tighten the prompt. If it's missing things, you add examples. When it's not a gate, nobody panics when it's wrong.
