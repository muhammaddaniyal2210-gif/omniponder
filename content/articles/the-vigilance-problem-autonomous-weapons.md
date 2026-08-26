---
title: "The Vigilance Problem: An AI Flew a Real Fighter Jet, and the Safeguard We Trust Was Questioned in 1983"
excerpt: "Autonomy has become a retrofit kit. As the UN reconvenes on lethal autonomous weapons, the reassurance everyone reaches for — a human in the cockpit, ready to take over — rests on an assumption cognitive science abandoned four decades ago."
date: "2026-08-27"
tags: ["Global Systems", "Artificial Intelligence", "Autonomous Weapons", "Human Nature", "Psychology", "Technology Ethics", "Defense Policy", "Automation", "Human Oversight", "Future of War"]
faq:
  - question: "Did an AI really fly a fighter jet for the first time?"
    answer: "No. AI agents flew autonomous dogfights aboard DARPA's X-62A VISTA in 2023. What was new in July 2026 is that VENOM used an ordinary operational F-16 fitted with an autonomy kit, rather than a purpose-built experimental aircraft."
  - question: "Is a human required to approve autonomous weapon strikes?"
    answer: "Not in the way commonly assumed. The phrase human in the loop does not appear in US Department of Defense policy. Directive 3000.09 requires that systems allow appropriate levels of human judgment over the use of force, which is a context-dependent standard rather than per-engagement approval."
  - question: "What are the ironies of automation?"
    answer: "Lisanne Bainbridge's 1983 finding that automation assigns humans a monitoring task they cannot perform well, while simultaneously eroding the manual skills they need at the moment the automation hands control back."
  - question: "Why can people not monitor automated systems effectively?"
    answer: "Attention cannot be sustained on a low-event information source much beyond about half an hour. It is a property of human attention rather than a matter of motivation or training, which is why the problem resists being solved by discipline."
  - question: "Will autonomous weapons be banned?"
    answer: "Unclear. Roughly 127 states support a binding prohibition, while the United States, United Kingdom, Russia and Israel favour non-binding frameworks. The UN group of governmental experts met from 31 August to 4 September 2026."
---

At Eglin Air Force Base in Florida, a pilot sits in the cockpit of an F-16 he is not flying. The aircraft is being flown by software. In front of him is a switch that returns control to human hands, and the existence of that switch is doing an enormous amount of work — technical, legal, political, and moral.

Almost every reassurance offered about military artificial intelligence rests on it. There is always a person. They can always intervene. The machine proposes; the human disposes.

The trouble is that we have known since 1983 that this is not how human attention behaves.

![Diagram showing the spectrum of human authority over weapon systems, with the VENOM F-16 marked in the human-supervised band, above a curve showing effective monitoring attention declining sharply after roughly thirty minutes](/images/autonomous-weapons-vigilance.svg) *Caption: Where supervised autonomy sits on the spectrum of human authority — and the attention limit that supervision depends on.*

## What Actually Happened, and Why the Obvious Reading Is Wrong

On 16 July 2026, DARPA and the US Air Force disclosed that an AI agent had flown an F-16 at Eglin under the VENOM programme — Viper Experimentation and Next-generation Operations Model. Coverage tended to frame it as the moment AI first flew a fighter.

That framing is wrong, and the mistake obscures why the test matters.

AI agents have been flying fighters for years. In 2023, DARPA's Air Combat Evolution programme had autonomous software dogfighting against a human pilot aboard the X-62A VISTA — but VISTA is a one-of-a-kind experimental aircraft, purpose-built and heavily instrumented for exactly this work. A flying laboratory.

VENOM is different in a way that sounds technical and is actually structural. The aircraft is an ordinary F-16 drawn from the operational fleet, modified with what DARPA calls an autonomy kit: hardware, software, and instrumentation that let an AI agent fly the jet while a human pilot remains aboard to supervise, able to toggle between machine and human control.

The milestone is not that software can fly a fighter. It is that **autonomy has become something you install** — a kit fitted to aircraft that already exist, in the numbers they already exist.

> The question stops being how quickly a nation can build autonomous aircraft. It becomes how quickly it can convert the ones parked on its ramps.

Those are different questions with different timelines and radically different costs. Building a new autonomous fleet is a decade-long industrial programme. Retrofitting one is a procurement decision.

## Why Retrofit Changes the Arithmetic

Debates about autonomous weapons have generally assumed a slow curve. New platforms take ten to fifteen years from concept to squadron. That lag has functioned as accidental governance: a window in which law and norms might catch up with capability.

A kit compresses the window.

- The airframes exist. Thousands of fourth-generation fighters are in service worldwide.
- The training pipelines, maintenance depots, and basing already exist.
- The upgrade is largely software and avionics, which iterate on months, not decades.
- The next phase of the work, DARPA's Artificial Intelligence Reinforcements effort, is explicitly aimed at one human supervising *teams* of uncrewed aircraft.

That last point is where the safeguard starts to strain. A single human overseeing one autonomous aircraft is a demanding job. A single human overseeing several, each generating its own stream of decisions requiring assessment, is a different kind of job — and it is precisely the kind that a cognitive psychologist warned about forty-three years ago.

## The 1983 Paper That Keeps Coming True

In 1983, Lisanne Bainbridge published a short paper in the journal *Automatica* titled "Ironies of Automation." She was writing about industrial process control — chemical plants, power stations — long before anything resembling a modern AI agent existed. It has since accumulated well over a thousand citations, and the rate is still climbing, largely because every new wave of automation rediscovers it.

Her argument has two parts, and both land directly on that cockpit switch.

### The first irony: monitoring is a task humans cannot do

Bainbridge observed that a person cannot maintain effective attention on a source of information where almost nothing happens for much more than about half an hour. This is not a motivation problem, and it is not solved by discipline or selection. It is a property of attention itself.

The consequence is uncomfortable. When we automate a system and assign the human the job of watching for rare failures, we have given them a task that human beings are constitutionally unable to perform well. The better the automation gets — the rarer the failures become — the worse the monitoring gets.

### The second irony: the skills decay precisely where they are needed

The operator of a highly automated system stops practising the manual skill. They are no longer flying; they are watching something fly. When the automation reaches a situation it cannot handle and hands control back, it hands it to someone whose skills have quietly eroded, and does so at the hardest possible moment, usually with very little time.

Automation, Bainbridge noted, tends to take the easy parts of a task and leave the human the hard parts — while removing the routine practice that kept them sharp for exactly those parts.

> The more reliable the system becomes, the less prepared its supervisor is for the moment it fails.

Aviation has spent decades absorbing this lesson expensively. It is the shape behind a long line of accident reports in which crews were handed a degraded aircraft in an unfamiliar state and had seconds to build a mental model the automation had been maintaining for them.

![An F-16 cockpit interior showing flight controls and instrumentation](/images/autonomous-weapons-cockpit.jpg) *Caption: The cockpit remains occupied. What is contested is what occupying it now means.*

## The Phrase That Is Not in the Policy

Here is where public understanding and actual policy diverge sharply.

The phrase "human in the loop" is the centre of gravity of the entire public debate. It appears in advocacy, in journalism, in ministerial statements. It functions as the reassurance that closes the argument.

It does not appear in US Department of Defense policy.

DoD Directive 3000.09, the governing document on autonomy in weapon systems, contains no such requirement. What it does is define categories of autonomous and semi-autonomous systems, require that systems be designed to let commanders and operators "exercise appropriate levels of human judgment over the use of force," and route proposals for certain autonomous weapons through a senior review process or a qualifying exemption.

Read that requirement closely. *Appropriate levels of human judgment* is a standard that adapts to circumstance. It is not a promise that a person approves each engagement. Analysts at CSIS have noted that the directive is widely misunderstood — including inside the US military itself.

This matters for a specific reason. If the public believes the safeguard is a person pressing a button, and the policy actually requires appropriate judgment exercised at some level of the system, then the debate is being conducted about a guarantee that was never made.

## What Is Being Decided Right Now

The timing is not incidental. On 31 August, four days from this writing, the UN Group of Governmental Experts on lethal autonomous weapons systems reconvenes in Geneva, running through 4 September. It is the second of two sessions scheduled for 2026, and it sits against Secretary-General António Guterres's call for states to conclude a legally binding instrument on autonomous weapons by the end of this year.

The positions are well established and far apart. Roughly 127 states support a binding prohibition. A smaller group with disproportionate capability — including the United States, United Kingdom, Russia, and Israel — favours non-binding frameworks and national policy over treaty law.

The gap between those camps is usually described as a disagreement about ethics. It is at least as much a disagreement about verification. A binding ban requires a way to tell, from outside, whether a system crossed a line. When autonomy is a retrofit kit rather than a distinct airframe, external verification becomes considerably harder. Two identical F-16s on the same ramp may differ only in what is loaded into them.

## The Honest Case on the Other Side

There is a serious argument for this work, and it deserves to be stated properly rather than waved at.

Machine reaction time in air combat exceeds human reaction time by margins that matter. Human-machine teams have repeatedly outperformed either component alone across many domains. VENOM is a test programme with a safety pilot aboard, not a deployment. Building the capability domestically while shaping norms is, its proponents argue, more responsible than ceding the technology to states with fewer scruples about how it is used.

And there is a genuine humanitarian case: a system that identifies targets more accurately than a frightened, exhausted human under fire could reduce civilian casualties rather than increase them. That claim is contested and unproven, but it is not made in bad faith.

None of that resolves the vigilance problem. It simply establishes that the problem sits inside a technology that is coming regardless.

## What Follows

Three conclusions seem reasonably firm.

**The safeguard needs to be specified, not invoked.** "A human is in control" is not a design. What decision, at what point, with what information, in what time window, under what workload? A supervisor with three seconds and four aircraft is exercising a different kind of authority than one with three minutes and one.

**Retrofit is the development that changes timelines.** Governance built around the assumption of long platform cycles is calibrated to a world that no longer exists. The relevant question is no longer how many autonomous aircraft a state has built, but how many of its existing aircraft could be converted, and how fast.

**Verification is the hard problem, not intent.** The same difficulty appears wherever a headline metric stands in for a system nobody can fully observe — including, in a very different domain, [how we measure the health of a rainforest](/article/what-the-amazon-number-measures). Most states will agree that meaningful human control matters. Almost none will agree on how to prove it from the outside — and when the difference between a supervised and an unsupervised system is a software load, proof becomes very difficult indeed.

The switch in that cockpit at Eglin is real. A pilot can flip it, and control returns. What the switch cannot do is manufacture the attention required to know when to flip it — which was the point Bainbridge made in 1983, about chemical plants, in a paper that keeps being right about technologies she never imagined.

We are not, in the main, deciding whether to build these systems. We are deciding what we will accept as an answer to the question of who is responsible when one of them is wrong. That question is being negotiated in Geneva this week, and the honest starting point is that our most common answer to it — *there's a human in the loop* — is not in the policy, and was never quite true about human beings.
