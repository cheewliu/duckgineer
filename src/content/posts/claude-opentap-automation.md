---
title: "Claude + OpenTAP: Automating Test Step Generation"
date: 2026-04-01
description: "A walkthrough of how I use Claude to generate OpenTAP test steps from plain-English specifications — including a live demo of the workflow."
tags: ["opentap", "claude", "test-automation"]
cover: "https://picsum.photos/seed/automate/800/450"
draft: false
---

OpenTAP test plans are written in C#. They're structured, typed, and follow predictable patterns. That makes them an excellent target for AI code generation.

This post walks through my current workflow for generating OpenTAP test steps from a plain-English spec. I'll also share a video walkthrough of the full process end-to-end.

## The Workflow

1. Write a plain-English test specification
2. Send it to Claude with a base test step template
3. Review the generated C# in VS Code
4. Run the step in OpenTAP's GUI and verify behavior
5. Iterate if needed (usually one round)

## Watch: End-to-End Demo

<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    title="Claude + OpenTAP Test Step Generation Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

*(Note: placeholder video — actual demo forthcoming)*

## The Prompt Template

```
You are generating an OpenTAP test step in C# (.NET 8).

Base template to follow:
[DisplayName("Measure Voltage")]
[Description("Measures DC voltage on a specified channel")]
public class MeasureVoltageStep : TestStep
{
    [Display("Channel", Order: 1)]
    public int Channel { get; set; } = 1;

    [Display("Expected Voltage (V)", Order: 2)]
    public double ExpectedVoltage { get; set; }

    [Display("Tolerance (%)", Order: 3)]
    public double TolerancePercent { get; set; } = 5.0;

    public override void Run()
    {
        // measurement logic here
        UpgradeVerdict(Verdict.Pass);
    }
}

Task: Generate a test step with the following specification:
[USER SPEC HERE]

Rules:
- Follow the template structure exactly
- Use [Display] attribute for all public properties
- Call UpgradeVerdict at the end of Run()
- Do not add logging
- Properties should have sensible defaults
```

## Real Example: RF Power Check Step

**Input spec:**
```
A test step that verifies the output power of an RF amplifier is within spec.
The user sets the expected output power in dBm and a tolerance in dB.
The step should fail if the measured power is outside the tolerance band.
```

**Claude output (trimmed):**

```csharp
[DisplayName("Verify RF Output Power")]
[Description("Verifies that RF amplifier output power is within specification")]
public class VerifyRfOutputPowerStep : TestStep
{
    [Display("Expected Power (dBm)", Order: 1)]
    public double ExpectedPowerdBm { get; set; } = 0.0;

    [Display("Tolerance (dB)", Order: 2)]
    public double ToleranceDb { get; set; } = 1.0;

    [Display("Instrument", Order: 0)]
    public IInstrument PowerMeter { get; set; }

    public override void Run()
    {
        var measured = PowerMeter.MeasurePower();
        var delta = Math.Abs(measured - ExpectedPowerdBm);

        Log.Info($"Measured: {measured:F2} dBm, Expected: {ExpectedPowerdBm:F2} dBm, Delta: {delta:F2} dB");

        UpgradeVerdict(delta <= ToleranceDb ? Verdict.Pass : Verdict.Fail);
    }
}
```

First-pass compilable. One issue: `PowerMeter.MeasurePower()` doesn't exist in my instrument interface — Claude invented it. One correction prompt fixed it. Total time from spec to working step: about 4 minutes.

## When It Fails

Claude struggles when:
- The step requires knowledge of a custom internal API it hasn't seen
- The logic is stateful across multiple steps
- The spec is ambiguous about units or edge cases

Solution for all three: provide more context in the prompt. The model isn't broken, it's under-informed.

## Verdict

For well-defined, single-responsibility test steps, Claude generates working OpenTAP code about 85% of the time on the first pass. The remaining 15% needs one correction. Compared to writing steps from scratch, it's a 5-10x speed improvement on routine work.
