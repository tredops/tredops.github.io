---
title: Signal Pool
description: The shared place where the signals produced by production bots land, and how agents turn them into opportunities for your portfolio.
---

The **Signal Pool** is the shared place where every signal produced by a bot in
production lands.

![Signal Pool](/signal-pool/TredOpsSingalPool.jpg)

It sits between "the bot saw something" and "an agent decides
to act", and it is what keeps those two worlds separate: a bot proposes, it does
not execute. A signal by itself never opens orders in your account.

## How a signal gets to the pool

Six steps take a strategy from your asset selection to a signal an agent can act
on:

1. **You choose the assets.** Every strategy starts with the assets you decide to
   trade.
2. **The platform searches for what works.** Automation runs the experimentation
   and looks for the optimal parameters and strategies, instead of leaving that
   to guesswork.
3. **Performance testing.** Every candidate is evaluated **candle by candle**
   against real market data, and calendars keep it honest by re-calibrating the
   strategy every N days so it keeps up with recent conditions.
4. **Bots are classified.** The result is a bot in **staging** or in
   **production**. Only bots that clear the quality bar reach production; the
   rest keep accumulating results where they cannot touch money.
5. **Production signals reach the pool.** The signals of bots in production are
   the ones that show up in the Signal Pool.
6. **Agents pick opportunities.** Agents read the pool, filter it with your
   portfolio's preferences and decide which ones are worth executing.

## What you see in the pool

Each signal is presented as a **card** with:

- A candlestick chart of the asset.
- The **Stop Loss** and **Take Profit** levels for the trade.
- The bot's **win rate** and its profit in real time.

From a card you can **mark** the signal (skip it or follow it) or **open an
order** in one of your portfolios directly from it, keeping the risk rules of
that portfolio applies.

## The same pool, for your agents

The agents consume the **same pool**, but they never see it whole: what an agent
can act on is the pool **filtered by your portfolio's preferences**. If your
portfolio only allows ETFs and no crypto, or it caps the risk level per trade,
the agent sees only the signals that respect those rules.

So if your portfolio is set to **ETF and no crypto**, the agent never proposes a
crypto trade — not because it did not consider it, but because that signal was
not shown to it in the first place.

When an agent proposes a trade, it has picked it from the same signal board you
see, filtered by your rules — not from a different source.

## Access and limits

Any plan can view the pool. Opening an order from a signal goes through the same
guards as any other trade in the platform (position sizing, cooldown, liquidity),
and if the agent is the one opening it, it also goes through your portfolio's
risk rules and the agent's credits.

## Read next

- [The TredOps loop](../lifecycle/) — where the Signal Pool sits in the pipeline.
- [Your first agent](../guides/first-agent/) — how an agent reads and decides on
  the pool.
- [Managing risk](../guides/risk/) — the limits that still apply when a signal
  becomes an order.