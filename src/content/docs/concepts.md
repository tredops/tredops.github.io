---
title: Key concepts
description: Portfolio, bot, agent, signal, order and calibration explained on one page. The foundation for everything else in these docs.
---

Six concepts are worth getting straight before you touch anything in the
platform. With them, the rest follows.

## Portfolio

A **portfolio** is a book inside TredOps: it has assigned capital, available
cash, open positions and its own rules (which assets it may trade, how much it
may risk per trade, which signal filters it accepts).

You can run several portfolios at once and use them to separate strategies: a
conservative ETF book, an aggressive crypto one, another to try out a new agent.
Each keeps its own accounting.

:::note
The portfolio is an **accounting and rules** unit inside TredOps. The real money
stays in your broker account — TredOps never custodies it.
:::

## Bot

A **bot** is an algorithmic strategy applied to one or more assets. It does not
use an LLM: it uses rules and indicators whose parameters are optimised over
historical data.

A bot does not decide what enters your book on its own. What it does is **produce
signals**.

## Signal and Signal Pool

A **signal** is the trade a bot proposes: "go long on X at this price, with this
stop and this target."

Every signal lands in a shared **Signal Pool**. Agents read that pool, filter it
with your portfolio's criteria and decide which ones are worth executing. A
signal on its own never moves money.

## Agent and sub-agent

An **agent** is a language model with a system prompt, a set of tools and a set
of permissions. It is the one that **decides**: it reads your portfolio context,
queries the Signal Pool, analyses market data and opens or closes trades.

A **sub-agent** is a specialised agent the main one delegates part of the work to
(analysing a sector, reviewing risk, proposing a rebalance). You can build your
own in the Playground.

## Order and position

An **order** is the buy or sell instruction sent to the broker. A **position** is
the result: what you hold in the market.

In TredOps every order opens with a **Take Profit** and a **Stop Loss**. It is
not optional — it is the rule that stops a trade from sitting open indefinitely
by neglect.

## Calibration

**Calibration** is the process that finds the optimal parameters of a strategy
for a given asset, over historical data. It is the source of truth for judging
whether a signal is any good.

Every bot has its own calibration schedule and re-tunes periodically to recent
market conditions, because a parameter that worked in a low-volatility regime
stops working in a high one.

## How it fits together

```
Bot ──produces──► Signal ──enters──► Signal Pool
                                          │
                                          ▼
                          Agent (filters, analyses, decides)
                                          │
                                          ▼
                    Order ──at your broker──► Position
                                          │
                                          ▼
                     Monitoring (Take Profit / Stop Loss)
```

The bot proposes, the agent decides, monitoring protects. You set the rules at
each layer and can step in at any point.

## Next

- [Quick start](../getting-started/) — from zero to your first trade.
- [Glossary](../glossary/) — every other term you will see in the platform.
