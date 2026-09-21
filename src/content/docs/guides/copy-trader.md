---
title: Copy Trader Agent
description: Automatically mirror a public agent's trades with one of your portfolios, sized to your capital and without spending LLM credits.
---

**Copy Trader Agent** is copy trading applied to TredOps agents: you pick a
public agent, connect one of your portfolios as a follower, and from then on
every trade that agent opens or closes is mirrored in your book **in proportion
to your capital**.

You will find it under **Copy Trader Agents** in the dashboard.

## Why use it

Your own agent decides with an LLM, and that costs credits on every evaluation.
A follower portfolio **uses no LLM**: it only mirrors. It is the difference
between paying to think and paying to copy.

It makes sense if:

- You want results without writing a system prompt or tuning a bot.
- You want to keep one portfolio on a strategy that already works while you
  experiment in another.
- The credit spend of your own agent does not pay off for that book's size.

It does not make sense if you want fine control over each decision. That is what
the [Playground](../playground/) is for.

## Free and Pro agents

Every Copy Trader Agent carries one of two badges:

- **Free** — open to every plan, the Freemium one included. Copying it costs
  **no credits and no copy fee**. It is the way a free account keeps trading
  with an agent after the trial.
- **Pro** — for Premium accounts (and for the free trial). These are the ones
  that pay the copy fee described below.

How many of your portfolios can copy at the same time depends on your plan:
one on Freemium, unlimited on Premium. Where a Pro agent or an extra portfolio
is out of reach you will see the *Pro* badge and an upgrade button, never a
failed request. See [Plans & pricing](../../pricing/).

## Choosing an agent

Every published agent shows, publicly and unedited:

- **Its capital curve** since inception, with the current percentage.
- **The profit of its most recent closed trades**, bar by bar.
- **Win rate** and number of closed trades.
- **How many followers** it has.
- **Its full order history**: symbol, dates, prices, size, P&L and the reason
  for each close.

Open an agent's detail before copying it and look at three things the big
percentage does not tell you:

| What to check | Why |
|---------------|-----|
| **How many trades it has** | +30% over 4 trades says nothing |
| **Its worst stretch** | That is what you will have to sit through without panicking |
| **How concentrated it trades** | Three positions in one sector are one bet, not three |

:::note[What is not published]
You see **what** the agent did, not **how** it decides. Its tuned strategy
parameters and internal configuration are not public: the history is the track
record, not the recipe.
:::

## Start copying

1. Go to **Copy Trader Agents** and open the agent you want.
2. Hit **Copy** and choose **which of your portfolios** will follow it.
3. That is it. The follower portfolio gets a blue indicator in the sidebar.

A portfolio copies **one agent at a time**, but you can have several portfolios
copying different agents — or even the same one.

## How your position size is worked out

The replica is **proportional**, not a literal copy:

> If the agent puts 5% of its equity into a position, your portfolio puts 5% of
> yours.

So you do not need the same capital as the agent you copy. What does matter:
**if you do not have enough cash, that trade is skipped**. It is never opened
partially and your book is never leveraged. It is recorded as skipped, with the
reason, and you get a notification.

## What happens to your rules and your tasks

This is the part that surprises people, so it is worth knowing up front.

**Your risk rules still apply.** A replica goes through the same checks as any
order of your own: per-position capital limit, cash reserve, cooldown, signal
filters. If one of them blocks it, the trade is skipped with that reason.
**Copying is not handing over control.**

**Your AgentTasks on the follower portfolio are paused.** While that portfolio
is copying, its scheduled tasks are paused — it would make little sense for your
agent and the copied agent to fight over the same book. When you stop copying
they are restored exactly as they were. Tasks you had already disabled are left
alone.

**Every replica carries Take Profit and Stop Loss**, like any TredOps order.

## Stop copying

From the agent's card or from the portfolio settings, in one click.

:::caution[Open positions stay open]
Stopping does **not** close what is already open. Those positions are still
yours and Monitoring still manages them with their Take Profit and Stop Loss,
but the agent's closes will no longer reach them. If you want out entirely,
close them yourself afterwards.
:::

Stopping also reactivates the AgentTasks that were paused.

## What it costs

A follower portfolio consumes no credits for deciding, because it does not
decide. Copying an agent marked **Free** costs nothing at all — no credits, no
fee, whatever your plan.

Copying a **Pro** agent pays a **token fee**: a percentage of the source agent's
credit consumption, and only on the runs where that agent actually opened or
closed something. By default that is **10%** of what the agent spent on that
run, and it can be configured to zero. You see it itemised in your credit
usage.

It works out cheaper than running your own agent precisely because one agent
splits its cost across all of its followers.

## Following along

Your follower portfolio's settings have the replication table: what was copied,
when, at what size, and — when something was not copied — **why**. The common
reasons are business outcomes, not failures:

- **Not enough cash** — it did not fit in your book at that moment.
- **Size too small** — the proportion produced an unworkable position.
- **Blocked by one of your own checks** — one of your risk rules stopped it.

You get a notification whenever a copy does not go through for a reason you can
act on.

:::note[No backfill when you start]
When you start following, positions the agent already had open are **not**
copied. Replication starts with its new trades. So for the first few days you
will see less activity than its history suggests.
:::

## Next

- [Playground](../playground/) — writing your own agent instead of copying one.
- [Managing risk](../risk/) — the limits that still apply while you copy.
- [Plans & pricing](../../pricing/) — how credits work.
