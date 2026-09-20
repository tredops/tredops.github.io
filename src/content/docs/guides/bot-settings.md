---
title: Bot settings explained
description: Every option in the bot creation form, what the warnings mean, and what to do about them.
---

[Your first bot](../first-bot/) walks you through the flow. This page is the
reference for the form itself: what each option does, what the messages mean,
and which ones you should act on.

:::tip[The one thing to remember]
Every percentage-like field is a **fraction of the price, not a percentage**.
`0.03` is 3%. Typing `0.5` thinking "half a percent" gives you a **50%** stop
loss, which in practice never triggers. The form shows the translation under
the field — read it before saving.
:::

## What you are actually configuring

You are not choosing one strategy with one set of numbers. You are describing a
**search space**, and TredOps tries combinations inside it and keeps the ones
that performed best.

So every field below takes a **list of candidates**, not a single value:

```
Stop Loss Ranges:  0.02, 0.03, 0.04
                 = 2.0% · 3.0% · 4.0%
```

That means "try a 2% stop, a 3% stop and a 4% stop, and tell me which worked".
The more values you add, the longer the search takes.

## Strategies

Pick which families the search may use. Each one reacts to a different market
shape:

| Family | Enters when |
|---|---|
| **Breakout** | Price makes a new high (or low) of its recent range |
| **EMA / SMA** | A fast moving average crosses a slow one |
| **MACD** | Momentum turns |
| **RSI** | The asset is oversold or overbought |
| **Bollinger Bands** | Price leaves its usual band and comes back |
| **Breakout + RSI** | A breakout that momentum confirms |

Each family comes in three directions: **Long** (buys), **Short** (sells
borrowed shares) and **Both**. Short variants only appear for assets your broker
lets you short — crypto, for example, cannot be shorted at Alpaca.

:::note
Selecting more families does not make the bot better; it makes the search
larger. If you have no strong opinion, leave the default selection.
:::

## Risk settings

### Stop Loss

Where the position closes if the price moves against you, as a fraction of the
entry price. This is a **trailing** stop: it follows the price up and locks in
gains.

- **Typical range:** 0.02 to 0.06 (2% to 6%).
- **Crypto** moves more, so a stop that is too tight triggers on noise alone.
- **A stop above 10% is close to having none.** It will rarely fire, and the
  position exits by take profit or by signal instead.

### Take Profit

Where the position closes in profit. Leave a value empty to mean **no take
profit**: the position then only exits by stop loss or by strategy signal.

### Sizing

How much of the bot's capital goes into each position, as a fraction. `0.25`
means a quarter, so **at most four positions open at once** on that asset.

### Leverage

How much borrowed money the bot may use. **This is an experiment, not a
setting**: you give a list and the optimiser decides.

| You enter | What happens |
|---|---|
| `1` | No borrowed money. Always included. |
| `1,2` | The optimiser tries both and keeps whichever scored better |

1x is always in the list so there is something to compare against. If 2x does
not earn its extra risk, 1x wins on its own merits.

:::caution[Leverage tightens your stop loss]
With leverage *L*, a 1% move against you costs *L*% of your own money. Your
broker does not wait for it to reach zero: past a point it closes the position
itself, at whatever price it finds. So TredOps caps how wide a stop loss can be:

| Leverage | Max stop loss | Broker liquidates at |
|---|---|---|
| 1x | no limit | never — no borrowed money |
| 2x | 5.0% | 33% adverse move |
| 3x | 3.3% | 11% adverse move |
| 4x | — | immediately, no margin left |

The Leverage card in the form shows this table for the levels you picked, plus
how many of *your* stop loss values survive each one.
:::

## Market data

**How many bars** of history the search runs on. This is the field most likely
to silently break a bot.

:::danger[It must cover at least 20 days]
The bot's score measures the **last 20 days** of the data it was given. If your
history is shorter than that, the score comes out as 0 and **the bot never
opens a position**, with nothing on screen explaining why.

Same bot, same parameters, only the amount of history changes:

| Bars | Days covered | Result |
|---|---|---|
| 200 | 8 | no signal, score 0 |
| 600 | 24 | works normally |
| 1200 | 49 | works normally |

With one bar per hour, use **600 or more**. The calibration warns you when the
history it received is too short.
:::

## Quality

### Minimum score to open

The bot only acts when its score clears this. The score is **percent of capital
over the last 20 days, net of drawdown**, so `0.5` means half a percentage
point. The default is a sensible starting point.

:::note
If you are copying settings from an older bot, check this value. Scores used to
be measured in dollars; a threshold like `0.04` made sense then and means
"accept almost anything" now.
:::

### Promotion rules

These decide whether a bot reaches **production** after its test:

- **Win rate** — the share of winning trades it needs.
- **Minimum profit** — how much it must have earned, and over how many days.

Both are measured over the end of the tested period, not over today.

## Optimisation

| Option | What it changes |
|---|---|
| **Generations** | How many rounds of refinement. More rounds, more time. |
| **Population** | How many combinations per round. |

Both are capped by how big your search space actually is. If you only gave a
handful of values, the search finishes quickly no matter what you put here —
that is normal, not a failure.

## While it runs

Calibration happens in the background; you can close the tab. The notification
shows progress and an estimate:

```
Optimizing AVAX/USD: 1792 of ~2564 backtests · ~3 min left
```

When a bot covers several assets, they share one notification and each one keeps
its own percentage. The time left is the **slowest** asset's, because that is
when the whole thing is actually ready:

```
Calibrating AVAX/USD 100% · BTC/USD 15% · SOL/USD 15% · ~6 min left
```

## Reading the result

### Test P&L and Live P&L

The bot list shows two money columns and they are **not** the same thing:

| Column | What it is |
|---|---|
| **Test P&L** | What the bot *would have* done over the past, in the test |
| **Live P&L** | What it actually did with your book |

**"Not tested"** means the bot has no test behind it yet — which is different
from having been tested and earned nothing.

### Production or staging

A bot reaches **production** by passing its test. If it does not, it stays in
**staging** and the reason is shown on the row.

## Messages you may see

| Message | What it means | What to do |
|---|---|---|
| `No stop loss in your grid survives 2x: all of them are above 5.0%` | Every stop you listed is wider than leverage allows, so nothing would be left to try | Lower the stop loss values, or lower the leverage |
| `Every level above 1x would be dropped` | None of the leverage levels can be used with this asset and these stops | Fix the reasons shown in the table, or leave leverage at 1 |
| `Crypto is never leveraged` | Your broker does not lend against crypto | Nothing to fix; the bot runs at 1x |
| `Alpaca only allows 3x intraday` | That level needs positions closed before the session ends | Enable intraday, or lower the leverage |
| `200 bars cover only 8.0 days and the score measures the last 20` | Not enough history; the score will be 0 and the bot will not trade | Raise the number of bars |
| `Never passed a performance test` | The bot has not been tested, so it stays in staging | Run the test |
| `Profit 0% over 20 days below the required 1%` | It has trades, but none recent enough to satisfy the rule | Widen the profit window, or accept staging |
| `No performance-test trades in the last 30 days of the window` | The test produced no trades near the end of the period | Usually means the strategy rarely triggers on this asset |
| `Calibration failed: the engine is not authorised to read market data` | A credentials problem on our side, not your configuration | Retrying will not help; contact support |
| `Empty experiment grid` | Every combination you described was rejected | Almost always leverage against stop loss: see the first two rows |

## Common mistakes

- **Typing percentages instead of fractions.** `0.5` is 50%, not 0.5%. The field
  shows the translation underneath.
- **Not enough history.** The single most common reason a bot never trades.
- **Leverage with wide stops.** They contradict each other; the form tells you
  before you save.
- **Adding every strategy family.** It makes the search slower, not smarter.

## Next

- [Your first bot](../first-bot/) — the walkthrough.
- [Managing risk](../risk/) — how Take Profit and Stop Loss behave once live.
