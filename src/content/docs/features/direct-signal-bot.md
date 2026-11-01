---
title: Direct Signal Bot
description: Let the bots you trust open their signals in your portfolio by themselves. No agent, no credits, and every guard of your portfolio still applies.
---

A bot you trust finds a signal. Today someone has to decide whether to take it:
your AI agent, which costs credits every time it thinks, or you, clicking
**Open Order** in the Signal Pool.

**Direct Signal Bot** removes that step. You choose, for one portfolio, the bots
whose signals you already trust, and from then on every new signal of those bots
opens in that portfolio by itself — through exactly the same checks as if you had
clicked the button yourself.

It is **free**: no model is called, so no credits are spent. And it is **off
until you turn it on**.

## The two routes of a signal

<figure>
<svg viewBox="0 0 760 300" role="img" aria-labelledby="dsb-routes-title" style="width:100%;height:auto">
  <title id="dsb-routes-title">A bot signal reaches the Signal Pool and, if Direct Signal Bot is on, opens in your portfolio by itself</title>
  <style>
    .dsb-box{fill:none;stroke:currentColor;stroke-width:1.5;rx:8}
    .dsb-t{fill:currentColor;font:13px ui-sans-serif,system-ui,sans-serif}
    .dsb-s{fill:currentColor;font:11px ui-sans-serif,system-ui,sans-serif;opacity:.75}
    .dsb-l{stroke:currentColor;stroke-width:1.5;fill:none;marker-end:url(#dsb-arrow)}
    .dsb-dash{stroke-dasharray:5 4}
  </style>
  <defs>
    <marker id="dsb-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
  </defs>

  <rect class="dsb-box" x="8" y="118" width="130" height="58" rx="8"/>
  <text class="dsb-t" x="26" y="142">Your bot</text>
  <text class="dsb-s" x="26" y="160">fires a signal</text>

  <path class="dsb-l" d="M 142 147 H 196"/>

  <rect class="dsb-box" x="200" y="118" width="130" height="58" rx="8"/>
  <text class="dsb-t" x="222" y="142">Signal Pool</text>
  <text class="dsb-s" x="222" y="160">always, as today</text>

  <path class="dsb-l" d="M 334 132 C 370 132 370 60 396 60"/>
  <rect class="dsb-box dsb-dash" x="400" y="30" width="160" height="60" rx="8"/>
  <text class="dsb-t" x="418" y="54">Agent decides</text>
  <text class="dsb-s" x="418" y="72">costs credits</text>

  <path class="dsb-l" d="M 334 162 C 370 162 370 238 396 238"/>
  <rect class="dsb-box" x="400" y="208" width="160" height="60" rx="8"/>
  <text class="dsb-t" x="418" y="232">Direct Signal Bot</text>
  <text class="dsb-s" x="418" y="250">free, no agent</text>

  <path class="dsb-l" d="M 564 60 C 600 60 600 132 626 132"/>
  <path class="dsb-l" d="M 564 238 C 600 238 600 162 626 162"/>

  <rect class="dsb-box" x="630" y="118" width="122" height="58" rx="8"/>
  <text class="dsb-t" x="648" y="142">Your checks</text>
  <text class="dsb-s" x="648" y="160">then the order</text>
</svg>
<figcaption>Whichever route a signal takes, it goes through the same checks before it becomes a position.</figcaption>
</figure>

The pool does not change. Your agents keep seeing every signal and you keep
being able to open one by hand. What Direct Signal Bot adds is a third actor
that never hesitates — for the bots you picked.

## Why use it

- **It costs nothing to run.** No model is called, so your credits stay for the
  work that needs judgement.
- **It never sleeps.** A signal at 3 a.m. is taken at 3 a.m., without an agent
  scheduled and awake.
- **It keeps all your limits.** Your sizing, your maximum per order, the
  cooldown after losses, your symbol lists, the market clock, your broker's
  cash: nothing is bypassed. It is the same path as the **Open Order** button.
- **You keep the veto.** With *Wait before to Open Orders* on — the default —
  each automatic order still waits for your approval with its countdown.

And the honest part: **it does not think**. It takes every signal of those bots
that your rules allow. It does not read the news, does not judge the market
regime and does not balance your exposure. That is the trade-off, and it is why
you should point it at bots whose track record you have already seen.

## Turn it on

1. In the sidebar, click the portfolio you want. Its view opens.
2. Press the **⚙ gear** button at the top, **Portfolio Settings**.
3. Open the **Signals** tab. The **Direct Signal Bot** card is right under
   *Signal sources*.
4. Press the **✎ pencil** next to **Bots** and pick the bots whose signals
   should open by themselves (up to 20). Press **Save changes**.
5. The **Open signals automatically** switch turns on with your selection. The
   card's badge reads **Active**.

There is no Save button for the switch: each change is saved as you make it.

| Setting | How to change it | What it means |
|---------|------------------|---------------|
| **Open signals automatically** | Flip the switch. | On, every new signal of the selected bots opens here. Off, signals only reach the pool and your agents. |
| **Bots** | **✎ pencil** → pick → **Save changes** | The bots that open by themselves. Saving an empty list switches the automation off. |

:::note
The card appears only in portfolios you trade yourself. A bot portfolio produces
signals; it does not consume them.
:::

If the portfolio has a **BotConfig subscription** in *Signal sources*, only
those bots can be picked here: a bot that does not feed the portfolio would
never produce a signal for it.

## What happens on every signal

1. The bot opens its signal, and it appears in the Signal Pool as always.
2. For each portfolio that listed that bot, the signal goes through your
   checks: a position of that bot and symbol already open, the signal's age,
   the market clock, the cooldown after consecutive losses, your sizing, the
   capital your broker really has, and the live price.
3. The capital comes from your portfolio's allocator — the bot strategy's own
   sizing, over your broker equity when the portfolio has an account. **If no
   capital can be assigned, nothing opens.** The automation never invents an
   amount.
4. With *Wait before to Open Orders* on, the order appears as **Awaiting
   approval** with its countdown. Otherwise it goes to the market right away.
5. From there it is an ordinary position of yours: the bot's stop loss, take
   profit and time stop protect it, and you (or your agent) can close it
   whenever you want.

## Reading the result

The card lists the **last automatic opens**, each with what happened:

| What you see | What it means |
|---|---|
| **Opened** + amount | the position is open |
| **Waiting for your approval** | it is in your notifications with a countdown |
| **Not opened** + a reason | one of your own rules stopped it |
| **Failed** | a technical problem; it is not retried |

The most common reasons for *Not opened*, and what to do:

| Reason | Meaning | What to do |
|---|---|---|
| already hold a position on that symbol from this bot | the duplicate guard | nothing, this is the point of it |
| the signal is older than your limit | *Signal sources* → max signal age | raise it if your strategy is slow |
| the market is closed | stocks outside the session | nothing; the signal belongs to its session |
| the sizing allows no more positions | your sizing and max positions | review them in **Risk & Capital** |
| the portfolio is in cooldown | it follows consecutive losses | deliberate: it clears by itself |
| no capital available | the allocator assigned nothing | add capital or review the max per order |
| your broker refused the size | real cash or buying power | check the broker account |

## Good to know

- **It never closes a position.** Exits are always the bot's own stop loss,
  take profit or time stop. Nothing is liquidated by the automation.
- **It does not chase.** A signal refused by a check — or one that arrived with
  the market closed — is not retried later.
- **Your agents are told.** An agent reading the portfolio sees which bots open
  by themselves, so it does not spend a turn deciding something already decided.
- **One bot at a time is the safe way in.** Start with a single bot in
  production whose history you have seen, keep *Wait before to Open Orders* on
  for the first days, and set your maximum per order deliberately — the
  automation will use all of it.
- **It is per bot, not per symbol.** To accept only some symbols of a bot, use
  the portfolio's symbol whitelist in *Signal sources*.
- **It is not [Connect Trader Agent](/guides/copy-trader/).** That one mirrors
  another person's agent trades; this one follows a bot's signals with your own
  sizing.

## Direct Signal Bot, an agent, or both?

| | Direct Signal Bot | AI agent |
|---|---|---|
| Decides | nothing: takes every allowed signal of your bots | each signal, with news, context and memory |
| Cost | free | credits per run |
| Reacts | instantly, 24/7 | when scheduled or woken by an event |
| Best for | bots you already trust | choosing between many signals, judgement calls |

They coexist in the same portfolio: the automation takes the signals of the bots
you picked, and your agent spends its turns on everything else.
