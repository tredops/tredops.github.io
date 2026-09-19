---
title: Your first bot
description: Build, optimise and ship a trading bot in TredOps, step by step.
---

A TredOps bot is an algorithmic strategy applied to one or more assets, with its
parameters optimised over historical data. This guide takes you from a blank
screen to a bot producing signals.

:::tip[Before you start]
If you have not connected your broker yet, go through the
[quick start](../../getting-started/) first. A bot can be built and evaluated
without a broker, but it will not be able to execute anything.
:::

## 1. Pick the asset

From the dashboard, go to **Bots → Create bot** and choose what to trade:

- **ETFs** — The recommended starting point: less noise, more history, tighter
  spreads. It is what most Benchmark editions use.
- **Stocks** — More movement, and more company-specific risk.
- **Crypto** — A 24/7 market with high volatility. Demands wider stops.

You can create one bot per asset, or one bot per **sector** (tech, energy,
defensives…), grouping several symbols under the same strategy.

## 2. Let it optimise

Once the asset is chosen, TredOps pulls its history and searches for the strategy
parameters that behave best on it. The optimisation uses **genetic algorithms**:
instead of trying every combination, it crosses and mutates the ones that score
best.

Two paths:

- **Default configuration** — Recommended to start. TredOps picks the search
  space and the scoring criteria.
- **Your own configuration** (Premium) — You set each parameter's range, the data
  window and the objective metric.

Optimisation is queued and runs in the background. You can close the tab.

## 3. Read the Performance Testing

Optimising over a history is easy; surviving what was not in that history is
not. So before a bot is allowed to trade, TredOps puts it through **Performance
Testing**:

- It runs over periods that were not used in the optimisation.
- It faces unexpected market conditions (gaps, volatility spikes, regime
  changes).
- Its result is compared against **Buy & Hold** on the same asset.

Look at three things in the report:

| What to check | What you want |
|---------------|---------------|
| Out-of-sample result | That it does not collapse versus the optimisation |
| Maximum drawdown | That you can live with it without killing the bot in a panic |
| Number of trades | Too few → unreliable result; too many → costs |

## 4. Production or staging

TredOps applies an automatic **quality threshold**:

- If the bot clears it, it goes to **production** and its signals enter the
  Signal Pool.
- If it does not, it stays in **staging**: still running in the background,
  accumulating results, but its signals never reach your book.

A bot in staging is not a failed bot; it is a bot that has not proven anything
yet. Check back in a few weeks.

## 5. Calibration handles the rest

Once in production, every bot has its own **calibration schedule**. It
periodically re-tunes its parameters to recent market conditions without you
doing a thing.

Calibration always uses data from before the moment being evaluated, to avoid
*look-ahead bias* (deciding with information that did not exist at the time).

## 6. From bot to trade

From here on the bot **proposes**; it does not execute:

1. The bot produces a signal.
2. The signal enters the [Signal Pool](../../pillars/bots-ci/).
3. Your portfolio's filters drop the ones that do not fit.
4. An [agent](../first-agent/) decides whether to execute it.
5. If executed, the order opens with Take Profit and Stop Loss and enters
   [Monitoring](../../pillars/monitoring/).

## Common mistakes

- **Creating ten bots on day one.** Start with one or two and understand how they
  behave before scaling.
- **Killing a bot over one bad week.** The relevant evaluation window is months,
  not days.
- **Optimising until the history looks perfect.** A flawless historical result is
  usually overfitting; what matters is the out-of-sample result.

## Next

- [Working with agents](../first-agent/) — who decides which signals get executed.
- [Managing risk](../risk/) — how Take Profit and Stop Loss are set.
