---
title: Working with agents
description: Talk to your agent, understand its operating modes, and build your own sub-agents in the Playground.
---

Bots propose; **agents** decide. An agent is a language model with access to your
portfolio context, market data and a set of tools to act with. This guide shows
you how to use one.

## 1. Start by asking

Open the dashboard **chat** and ask freely. The agent has real context on your
portfolios — it is not answering from memory:

- *"How is my portfolio doing today?"*
- *"What positions are open and where is each one?"*
- *"Why was yesterday's position closed?"*
- *"What is in the signal pool for defensive ETFs?"*

These questions are **read-only**: the agent looks and answers, it touches
nothing.

## 2. Understand the operating modes

Every conversation and every task runs in a mode, and the mode decides what the
agent may do:

| Mode | What it can do | When to use it |
|------|----------------|----------------|
| **Plan** | Read and propose only. Opens and closes nothing. | Whenever you are exploring or learning |
| **Trading** | Execute, but with you watching | When you want it to act and be able to stop it |
| **Autonomous** | Execute unsupervised, within your rules | Scheduled tasks you have already proven |

:::caution
Always start in **Plan**. Move to **Trading** once you recognise the kind of
decisions your agent makes, and to **Autonomous** only with risk rules you have
actually tested.
:::

## 3. Ask it to act

In Trading mode the agent executes what you ask, within the portfolio's limits:

- *"Review the signal pool and open the two best opportunities this week."*
- *"Close the TEST position if it drops 3%."*
- *"Halve my technology exposure."*
- *"Rebalance the book towards defensive sectors."*

The agent tells you **what it is about to do and why** before doing it. If the
instruction conflicts with the portfolio's risk rules, it says so instead of
working around them.

## 4. Build your own agents in the Playground

In the **Playground** (Premium) you define agents to taste:

- **System prompt** — How it thinks, what it prioritises, what it avoids. This is
  where a conservative agent and an aggressive one part ways.
- **Model** — Which LLM drives it. Use the included credits or connect your own
  [OpenRouter or DeepSeek](../../pillars/integrations/) account.
- **Tools** — What it may call: read the book, read signals, open or close
  orders, request market data.
- **Assigned portfolio** — Which book it works on.

A good system prompt is specific. Compare:

> ❌ "You are a trading agent. Make money."

> ✅ "You manage a book of sector ETFs with a 2–6 week horizon. You prioritise
> capital preservation: never more than three simultaneous positions and never
> more than 20% of capital in one. You discard signals with less than 48 hours of
> history. You always explain the reason for every close."

## 5. Delegate to sub-agents

A main agent can lean on specialised **sub-agents**: one analysing the technology
sector, one reviewing portfolio risk, one preparing a rebalance.

The main agent splits the work and consolidates the answers. It is how you keep
different criteria coexisting without cramming them all into one unmaintainable
prompt.

[Benchmark](../../benchmark/) editions pit exactly these against each other: same
capital, same window, different model and different prompt.

## 6. Automate

Once a routine works in chat, turn it into a scheduled task:
[Scheduling tasks (AgentTask)](../agent-tasks/).

## What an agent will not do

- **Trade outside the portfolio's rules.** Per-position capital limits and cash
  reserves override any instruction.
- **Open an order without Take Profit and Stop Loss.** There is no way to turn
  that off.
- **See your credentials.** It uses scoped tokens, never your broker keys.

## Next

- [Scheduling tasks (AgentTask)](../agent-tasks/)
- [Managing risk](../risk/)
