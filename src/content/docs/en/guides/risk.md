---
title: Managing risk
description: Take Profit, Stop Loss, position sizing and cash reserve. The rules that keep a bad run from becoming a problem.
---

TredOps does not exist to be right more often — it exists so you **lose less by
neglect**. This page collects the platform's risk rules and how to set them.

## The rule you cannot switch off

**Every order opened through TredOps carries a Take Profit and a Stop Loss.**
There is no checkbox to remove it — not for agents, not for scheduled tasks, not
in autonomous mode.

The reason is the one behind the product itself: most avoidable losses do not
come from picking wrong, but from not having decided in advance when to get out.

## The four parameters

### Take Profit

The price at which a winning position is closed. Set at open, derived from the
strategy's calibration for that asset.

Too tight and it cuts good trades short; too far and a gain evaporates on the way
there.

### Stop Loss

The price at which a losing position is closed. It is the most delicate
parameter: too narrow and the asset's normal noise sweeps you out of a trade that
was going to work.

That is why TredOps derives it from the **asset's recent volatility**, not from a
fixed percentage applied to everything. A defensive ETF and a crypto pair cannot
carry the same stop.

### Maximum position size

How much of the portfolio's capital may go into a single position. The default is
**25%**: even if one position goes to zero, the portfolio survives.

Lower it if you trade correlated assets — three positions in the same sector are
not three separate bets, they are one bet tripled.

### Cash reserve

The share of the portfolio that is never invested, **10%** by default. It exists
so you can react: average in, hedge, or take an opportunity without having to
close something else at the wrong moment.

## Where to set them

| Level | What it sets | Where |
|-------|--------------|-------|
| **Portfolio** | Max position size, cash reserve, signal filters | Dashboard → Portfolios → Settings |
| **Bot** | Take Profit / Stop Loss levels per strategy | Dashboard → Bots → Configuration |
| **Order** | One-off adjustment before opening | At order confirmation |

Portfolio rules **override everything else**. If an agent proposes a trade that
breaks them, the trade does not open — it is a block, not a warning.

## Monitoring: what happens after the open

Once a position is open, a periodic process watches it:

1. It pulls the asset's current price.
2. It re-evaluates the position with the same strategy that opened it.
3. It closes on Take Profit, on Stop Loss, or when the strategy itself says to
   get out before either.

In other words: you do not wait for a price level if the reason for being in the
trade has already gone.

## Where to start

If you do not know what numbers to use, start here and adjust with data, not
intuition:

- **Max per position**: 15%
- **Cash reserve**: 20%
- **Simultaneous positions**: 3 or 4
- **Agent mode**: Plan for the first two weeks

After a couple of months of your own history, review which of these limits
actually got in your way and which one saved you.

## Common mistakes

- **Widening the stop because the position is down.** The fastest way to turn a
  bearable loss into one that hurts.
- **Concentrating in one sector.** Five tech positions on a bad day for tech are
  one very large position.
- **Confusing autonomous with unattended.** Autonomous means it executes on its
  own, not that nobody needs to look.

## Next

- [Monitoring](../../pillars/monitoring/) — the full pillar in detail.
- [Security](../../security/) — what TredOps controls and what you control.
