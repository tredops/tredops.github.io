---
title: Wait before to Open Orders
description: Have the last word before a position opens. Every new order waits for your approval, with a countdown and an automatic decision if you do not answer.
head:
  - tag: meta
    attrs:
      property: og:image
      content: https://docs.tredops.com/features/waitBeforeToOpen.jpg
  - tag: meta
    attrs:
      name: twitter:image
      content: https://docs.tredops.com/features/waitBeforeToOpen.jpg
  - tag: meta
    attrs:
      property: og:image:alt
      content: "Wait before to Open Orders: the agent proposes, you decide"
  - tag: meta
    attrs:
      property: og:image:width
      content: '1536'
  - tag: meta
    attrs:
      property: og:image:height
      content: '1024'
  - tag: meta
    attrs:
      name: twitter:image:alt
      content: "Wait before to Open Orders: the agent proposes, you decide"
---

![Wait before to Open Orders: the agent proposes, you decide](/features/waitBeforeToOpen.jpg)

Your agent can find an opportunity at any moment, but you may want the final
say before your money goes into it. **Wait before to Open Orders** gives you
exactly that: every new position in the portfolio waits for your approval
before it reaches the market.

When a position is about to open, you get a notification with a countdown and
two buttons, **Approve** and **Reject**. You decide, or you let the countdown
decide for you with the rule you chose in advance.

## Why use it

- **You keep control of real money.** The agent does the analysis and proposes
  the trade; you confirm it. It is especially useful on a portfolio connected to
  a live broker account.
- **Nothing is lost if you are away.** If you do not answer in time, the
  automatic decision applies: open the position anyway, or skip it.
- **It fits your pace.** The wait goes from one minute to a full day.

## How it works

1. Your agent, a TradingView alert or you decide to open a position.
2. Instead of going to the market, the position is created as **Awaiting
   approval**.
3. A notification **Approve position?** appears with the symbol, the direction,
   the price and a countdown, **Auto-decision in**.
4. You press **Approve** to open it now, or **Reject** to skip it.
5. If the countdown ends without an answer, the automatic decision applies.

The notification then updates itself to **Position Opened** or **Position
Skipped**, so you always see how it ended.

## Turn it on and set it up

It is **on by default** for your portfolios, with a five-minute wait and
**Open position** as the automatic decision. You can change it for each
portfolio at any time from the portfolio settings.

### Change it from the portfolio settings

1. In the sidebar, click the portfolio you want to change. Its view opens.
2. At the top of the view, press the **⚙ gear** button, labelled **Portfolio
   Settings**.
3. Scroll to the **Wait before to Open Orders** card.
4. Change what you need. There is no Save button: each change is saved as soon
   as you make it, and a short confirmation message appears.

The card has three settings:

| Setting | How to change it | What it means |
|---------|------------------|---------------|
| **Ask me before opening an order** | Flip the switch. | On, every new position waits for you. Off, positions open immediately. |
| **Wait** | Type the minutes, then press Enter or click outside the box. | The time you have to decide, from 1 minute to 24 hours. The default is 5. |
| **Automatic decision if not manually approved** | Click **Open position** or **Skip position**. | What happens if the countdown ends and you have not answered. |

The wait is always written in minutes. Some useful values:

| You want | Type |
|----------|------|
| 5 minutes | `5` |
| 30 minutes | `30` |
| 1 hour | `60` |
| 4 hours | `240` |
| 24 hours | `1440` |

A number below 1 becomes 1, and one above 1440 becomes 1440.

When the switch is off, the other two settings are greyed out but keep their
values, so turning it back on restores your last choice.

The confirmation message tells you what changed, for example *New orders now
wait 5 min for your approval*, *New orders open immediately* or *Unanswered
orders will be skipped*. If you see an error instead, nothing was saved: try
again.

:::note
The card only appears in portfolios that you supervise yourself. If you do not
see it, that portfolio does not use the approval step.
:::

When you create a new portfolio, the wizard shows the same choice in an
optional **Approval** step, just before the final review. The quick portfolio
created with one click always starts with five minutes and **Open position**.

### Which automatic decision to choose

- **Open position** is for when you trust the agent and only want the chance
  to stop a trade. If you miss the notification, the trade still happens.
- **Skip position** is for when nothing should open without your explicit
  yes. If you miss the notification, the trade does not happen.

## Where you can decide

- **The notifications panel** in the dashboard, with the countdown and the
  Approve and Reject buttons.
- **The Signal Pool**, which shows the waiting signal with its chart and the
  same two buttons.
- **Telegram**, from your phone. With the
  [Telegram integration](/integrations/telegram/) linked, the notification
  reaches your chat with **Approve** and **Reject** buttons, and the `/pending`
  command lists every position waiting for you.

Wherever you decide, every other place updates to show the outcome. A position
can only be decided once: if it was already approved, rejected or decided by
the countdown, pressing a button again does nothing.

## What happens after your decision

**When a position opens**, whether you approved it or the countdown did, it
opens at the **market price of that moment**, not at the price of the signal
that created it. The amount is recalculated with that price. On a portfolio
connected to a live broker account, the order is sent to the broker at that
moment and the broker's fill sets the final price.

**When a position is skipped**, it is marked as **Cancelled** and nothing is
bought or sold. Your capital is free again. The agent may propose the same idea
later if it still makes sense.

## While a position is waiting

- **Your capital is reserved.** The amount of the waiting position is set
  aside, so the agent cannot spend it twice on something else.
- **No duplicates.** If the same signal arrives again while one is waiting, no
  second position is created.
- **Stop loss and take profit start when it opens.** A waiting position is not
  in the market yet, so it has no protection to run and does not count in your
  profit and loss.
- **You can find it in Orders.** Waiting positions appear as **Awaiting
  approval** in the **Pending** tab. Skipped ones appear as **Cancelled** in
  the **Closed** tab.
- **Your agent knows.** The agent is told that the position is waiting for you.
  It does not treat it as an error and does not try to open it again.

## What waits and what does not

| Source of the position | Does it wait? |
|------------------------|---------------|
| Your AI agent | Yes |
| A position you open yourself | Yes |
| A [TradingView](/integrations/tradingview/) alert | Yes |
| A [Connect Trader Agent](/guides/copy-trader/) copy in a follower portfolio | No, copies are never delayed |

Two details worth knowing:

- **TradingView alerts.** Another alert in the same direction while a position
  is waiting does not open a second one. An alert to close, or one in the
  opposite direction, skips the waiting position.
- **Agents that others copy.** If your portfolio is copied through Connect
  Trader Agent, the followers copy a position only once it actually opens. A
  skipped position never reaches them.

## Good to know

- The setting belongs to each portfolio. You can keep it on for the portfolio
  with your real account and off for one where you are testing.
- Turning the wait off only affects new positions. Those already waiting keep
  their countdown: decide on them as usual, or let it finish.
- If you change the automatic decision, positions already waiting follow the
  new one when their countdown ends.
- A long wait is safe but can make you miss fast moves: the position opens at
  the price of the moment you approve, which may be different from the price
  when the signal appeared.
