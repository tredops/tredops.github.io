---
title: Trade setups
description: Write the trade before the price gets there. Levels, stop, take profit and alternative scenarios that the platform watches for you and executes as your own orders.
---

A **trade setup** is what a disciplined trader writes down before the price
arrives: *if it closes above 200.3, go long 300 USD with the stop at 195.3; if it
breaks 192, go short instead; between the two, do nothing; valid for three days.*

You write it once, in your own words, in the chat. From then on the platform
watches the symbol, fires the rule that is met, opens the position as one of your
own orders, and protects it with the stop and the take profit you asked for. You
are told when something actually happens. Waiting costs you nothing.

A setup is not a bot signal. There is no calibration behind it, only your levels.
That is its strength — you decide the trade — and its risk — nothing vetted it.

## Creating one from the chat

Open the dashboard **chat**, type `/` and pick **trade-setup** (see
[Agent skills](/features/skills/)), then describe the trade:

```
/trade-setup On BTC, if it closes above 103,500 go long 300 USD with the stop
under 101,800 and take profit at 108,000. Check it every 30 minutes, valid 5 days.
```

The agent reads the symbol's real structure first — the levels and how many times
they have been touched, the average range, the trend, the prior day and week
extremes — then turns your sentence into rules, usually simulates them on recent
history, and leaves the setup armed. It tells you back the levels it wrote, the
interval it chose and when the setup expires.

:::tip
Say what invalidates the trade, not only what triggers it. *"If it loses 101,800
I am wrong"* becomes the stop, and the agent will place it at a level instead of
at a round percentage.
:::

## Choosing the evaluation interval

This is the decision most people skip and then regret. A setup has **one
interval**, and it is the one thing you should be explicit about: it is both the
candle the rules are read on and the candle the open position is watched on.

| Say this | You get |
|----------|---------|
| "every 30 minutes" | fast reaction, more noise, stops need room |
| "hourly" | the default, good for most swing trades |
| "4 hours" or "6 hours" | a wider swing, fewer false breaks — typical for crypto |
| "on the daily close" | one read a day, at the times you name |

Crypto trades around the clock, so a 30-minute or 6-hour grid makes sense there.
A stock is only read during its regular session, so an interval under an hour
buys you little. If you do not say, the agent picks hourly and tells you.

Two things to keep in mind. A level touched for a few seconds between two reads
can be missed, while a break that holds into the candle close is not. And the
interval you choose has nothing to do with the intervals your bots use: a setup
has no bot behind it.

## From levels to rules

Each rule is one condition on the price and what to do when it is met:

- **A break**: the candle closes above a resistance, or below a support.
- **A touch**: the candle's high or low reaches the level, even if it closes back.
- **Simply beyond**: the price is already past the level, no break required.

You can ask for more than one closed candle to agree before it counts. On a noisy
level, two is worth the delay.

Every rule carries its own size and its **stop, which is mandatory**. A take
profit is optional, and so is a time stop — close a position that has gone
nowhere after N days.

## Alternative scenarios

A setup can hold both sides of the market and let the market pick:

> Above 103,500 go long. Below 98,000 go short instead. Whichever happens first,
> forget the other side.

The two scenarios are alternatives. The first one to fire cancels the other, and
the card tells you the losing side was **skipped**, with the reason. This is one
setup, not two, which is why they cannot both end up open.

## Ladders: adding as the move confirms

A rule can wait for another rule to fill first. That is how you write a
progressive entry:

> Above 103,500 open 300 USD with a 2 % stop. If it then clears 106,000, add
> another 300 USD, and tighten the stop of the first position to 1 %.

The second rung is dormant until the first one fills, so it can never fire on its
own. When it does fill it can **re-protect what is already open** — tighten the
stop, set or remove the take profit. If the first rung is cancelled, rejected or
expires, the rungs above it go with it.

Combine the two features and one setup becomes a full strategy: a long ladder, a
short scenario as the alternative, and whichever side triggers keeps its own rungs
armed while the other is dropped.

## Exits, including "ask me"

On top of the stop and the take profit you can add price exits of your own, with
two possible outcomes:

- **Close the position** when the level is reached. The engine's stop always has
  priority, and exits are all-or-nothing — there are no partial closes.
- **Wake the agent** instead of closing. The position stays open and the agent is
  called once, with the market in front of it, to decide: set the take profit,
  add a rung, put a protective exit under the last swing, or do nothing.

The second one is there for the case where fixing a take profit today would just
be a guess. It is also the answer to the awkward situation where the market has
followed your plan, the last size has gone in and nothing says where to get out.

## Reading the card

Your armed setups live in **Positions**, next to your open positions. The card
shows the symbol, the side or sides, the evaluation interval, the expiry, and
every rule with its state:

| State | Meaning |
|-------|---------|
| **Armed** | waiting for its level |
| **Waiting** | a rung whose predecessor has not filled yet |
| **Filled** | it opened a position, and the card links to it |
| **Skipped** | the alternative scenario won, or a position was already open |
| **Rejected** | the level was reached but the fill was refused |
| **Expired** | the window closed without the level being reached |

A filled rule shows a badge that takes you to the position it opened, and the
position card carries a badge back to the setup that created it. The chart
respects the candle count you picked in the header filter, so what you see around
the levels is the same window you use everywhere else.

## Following up

The setup executes on its own, and you get a notification when it triggers,
expires, is rejected or closes. If you want an **agent** to react rather than just
be told, give the portfolio a task that listens for setup events — see
[Scheduling tasks](/guides/agent-tasks/). The agent then reads the setup and the
market and decides what the event asks for: re-plan the levels, take the profit,
stand down.

You can also just ask in the chat at any time: *"how is my BTC setup doing?"*

## What applies to a setup's orders

A setup opens real orders in your portfolio, so everything you have configured
keeps applying:

- **Your risk limits.** Order size caps, maximum capital, open-position limits and
  the portfolio's own guards are all checked at the moment the rule fires, against
  your real capital. A rule blocked this way is simply read again on the next
  candle.
- **[Wait before to Open Orders](/features/wait-to-open/).** If the portfolio has
  it on, the fired order waits for your approval like any other.
- **Copy and notifications** behave exactly as they do for a bot order.
- **Shorts** need a shortable asset. Crypto cannot be shorted.

:::caution
One active setup per symbol and portfolio. If you ask for a second one on a
symbol that already has one, the agent will update or cancel the existing setup
rather than stack two conflicting plans on the same price.
:::

## Good habits

- **Let it expire.** A thesis is good for days, not for a quarter. The default is
  three days and the maximum is thirty. A setup that keeps expiring untriggered is
  telling you the level is wrong, which is useful information.
- **Put the stop at a level, not at a round number**, and give it more room than
  one normal candle of your chosen interval. A stop inside the noise gets hit by
  the noise.
- **Change one thing at a time** when you are learning: compare two setups that
  differ in the stop *or* in the level, not both.
- **Do not widen a stop to give the trade room.** If the invalidation has
  happened, cancel the setup and close.

## From your own MCP client

Everything above is available through [TredOps MCP](/integrations/tredops-mcp/) if
you prefer to drive it from your own agent: create, simulate, inspect, update and
cancel setups, with the same rules and the same limits.
