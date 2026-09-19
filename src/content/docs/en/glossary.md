---
title: Glossary
description: Every term that shows up in TredOps and in these docs, explained in one line.
---

## Platform

**Agent** — A language model with your portfolio context, tools and permissions.
It is the one deciding which trades open and close.

**AgentTask** — An instruction an agent runs periodically without intervention.
See [Scheduling tasks](../guides/agent-tasks/).

**Benchmark** — Public comparison of agents and LLM models over the same market
window and the same capital. See [editions](../benchmark/).

**Bot** — Algorithmic strategy over one or more assets, with parameters optimised
on historical data. It produces signals; it does not execute.

**Calibration** — The process that finds a strategy's optimal parameters for an
asset, over historical data. It repeats periodically.

**ExpertMode / Playground** — Where you build your own bots and agents, with
custom system prompts and parameters.

**Monitoring** — Continuous supervision of open positions, with automatic closing
on Take Profit, Stop Loss or a strategy exit signal.

**Portfolio** — A book inside TredOps, with its capital, positions and risk
rules.

**Signal Pool** — Shared store of the signals bots produce, from which agents
pick the ones worth executing.

**Staging** — State of a bot that has not cleared the quality threshold yet: it
runs in the background, but its signals never reach your book.

**Sub-agent** — Specialised agent the main one delegates part of the analysis or
management to.

## Market and trading

**Buy & Hold** — Buy and keep. It is the reference everything in the Benchmark is
measured against: if a strategy cannot beat it, its complexity is not worth it.

**Cash** — The part of the portfolio that is not invested.

**Drawdown** — Maximum decline from a prior peak. It measures how bad a strategy
feels, not how well it ends.

**Equity** — Total portfolio value at a point in time: invested capital plus
cash.

**Long** — A position that gains when the price rises.

**Look-ahead bias** — The error of judging a past decision with information that
did not exist at the time. TredOps calibrations avoid it by design.

**OHLCV** — Market data per period: open, high, low, close, volume.

**Order** — Buy or sell instruction sent to the broker.

**Overfitting** — Tuning a strategy so tightly to its history that it stops
working on new data. It is what Performance Testing catches.

**P&L** — Profit and loss. **Realised** once the position is closed, **unrealised**
while it is open.

**Position** — What you hold in the market as a result of an order.

**Rebalancing** — Adjusting the portfolio's weights back to the target
allocation.

**Short** — A position that gains when the price falls. Marked `↓` in the charts.

**Signal** — A trade proposed by a bot.

**Stop Loss** — The price at which a losing position is closed.

**Take Profit** — The price at which a winning position is closed.

**Volatility** — How much an asset's price moves. It determines how wide a stop
has to be.

## Account and billing

**Credits** — Unit of language-model consumption. Every message and every task
run spends credits. See [Plans & pricing](../pricing/).

**Integration** — Connection to an external service: a broker (Alpaca) or an LLM
provider (OpenRouter, DeepSeek).

**Non-custodial** — TredOps never holds or manages your money: it stays in your
broker account. See [Security](../security/).

**Access token** — Scoped credential agents use to act on your behalf. Never your
broker keys.
