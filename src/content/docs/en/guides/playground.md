---
title: Playground
description: Build your own agents and sub-agents with your system prompt, your model and your tools, and put them to work on a portfolio.
---

The **Playground** (also called *ExpertMode*) is where you stop using the agents
TredOps maintains and build your own. An agent created here is not a demo: it is
assigned to a portfolio and manages real positions under the same risk rules as
any other.

It is available on **Premium** and, temporarily, on the
[Premium trial](../../pricing/).

## What you define in an agent

| Piece | What it decides |
|-------|-----------------|
| **System prompt** | How it thinks: what it prioritises, what it avoids, when it acts and when it sits still |
| **Model** | Which LLM drives it, from the available ones or from your connected provider |
| **Tools** | What it may call: read the book, read signals, request market data, open or close orders |
| **Portfolio** | Which book it works on |
| **Type** | Main agent, or a **sub-agent** another one delegates to |

## The system prompt is 80% of the result

Two agents with the same model and the same tools behave completely differently
depending on how they are written. A vague prompt produces an agent that goes in
circles, burns credits and decides nothing.

> ❌ "You are a trading agent. Find opportunities and make money."

> ✅ "You manage a book of sector ETFs with a 2–6 week horizon. You prioritise
> capital preservation over returns: never more than three simultaneous
> positions, never more than 20% of capital in one, and never two positions in
> the same sector. You discard signals with less than 48 hours of history.
> Before opening, you check available cash. You always explain the reason for
> every open and every close."

What separates them:

- **A time horizon.** Without one, the agent cannot tell whether a three-day-old
  position is doing well or badly.
- **Numeric limits.** "Prudent" means nothing; "at most 20% per position" does.
- **Exclusion criteria.** What it must **not** touch — the part most often
  forgotten.
- **An obligation to explain itself.** An agent that justifies its decisions is
  an agent you can audit and correct.

## Sub-agents: splitting the judgement

A main agent can lean on specialised **sub-agents** instead of cramming
everything into one giant prompt nobody can maintain:

- One that analyses a specific sector.
- One that reviews portfolio risk and proposes cuts.
- One that prepares a rebalance.
- One that filters the Signal Pool and returns only what fits.

The main one splits the work and consolidates the answers. It is how you keep
different criteria — deliberately contradictory ones, even, like an optimistic
agent and a sceptical one — coexisting without stepping on each other.

[Benchmark](../../benchmark/) editions pit exactly these sub-agents against each
other: same capital, same historical window, different model and different
prompt. It is the same mechanism you have in the Playground.

## Getting one into production without surprises

1. **Write the prompt** and assign the agent to a portfolio — preferably a new,
   small one.
2. **Test it in Plan mode.** It only reads and proposes. Ask it what it would do
   and why, over several days.
3. **Read its justifications.** This is where the prompt's holes show up: the
   agent does something reasonable for a reason you did not intend.
4. **Move it to Trading.** It executes, but with you watching.
5. **Turn it into an** [AgentTask](../agent-tasks/) once you recognise its
   judgement.

Do not skip step 3. It is the cheap one.

## The limits are still there

An agent you wrote yourself has **no more permissions** than a TredOps one:

- It does not trade outside the portfolio's risk rules. Per-position capital
  limits and the cash reserve override any instruction in the prompt.
- It does not open orders without Take Profit and Stop Loss.
- It never sees your broker credentials: it uses scoped tokens.
- It consumes credits. An agent that reasons a lot costs more than one that
  decides quickly — see [Plans & pricing](../../pricing/).

This is deliberate: the Playground lets you change **the judgement**, not the
protections.

## Next

- [Working with agents](../first-agent/) — the operating modes in detail.
- [Scheduling tasks (AgentTask)](../agent-tasks/) — automating what already works.
- [Copy Trader Agent](../copy-trader/) — using someone else's agent instead of
  writing your own.
