---
title: Telegram
description: Get your TredOps notifications on Telegram, approve or skip a position from your phone, and talk to your agent from the chat.
---

Telegram brings TredOps to your pocket. Once your chat is linked, the notifications you already see in the dashboard reach your phone, a position waiting for your approval comes with **Approve** and **Reject** buttons, and any message you write goes to your TredOps agent, the same one you talk to in the dashboard chat.

You choose what reaches the chat: which portfolios and which kinds of events. Everything else stays in the dashboard.

## Connect it

1. **Dashboard → Integrations → ⊕ → Telegram.** A QR code appears, together with an **Open in Telegram** link.
2. Scan the QR with your phone, or tap the link if Telegram is installed on the device you are using. Telegram opens the chat with the TredOps bot and sends the link code for you when you press **Start**.
3. The dialog notices the link on its own and moves to the preferences step. Pick your portfolios and events, press **Save**, and you are done. The bot greets you with a summary of what it will send.

The QR is valid for ten minutes and works once. If it expires, press **Generate a new link**. One Telegram chat can be linked to one TredOps account, and one account to one chat.

:::tip
If you open the bot chat by hand and only see "This chat is not linked to a TredOps account yet", go back to the dashboard and use the QR or the link: the code that links your account travels with them, not with a `/start` you type yourself.
:::

## What reaches your chat

Open **Preferences** from the ⋯ menu of the Telegram row, or expand the row, to change these at any time.

| Setting | Meaning |
|---------|---------|
| **Portfolios** | *All portfolios*, or only the ones you tick. A notification about a portfolio you did not tick never reaches Telegram, even if its event type is on. |
| **Events** | The kinds of notification you want: position opened or closed, bot signals, calibrations, agent tasks, TradingView alerts, billing and errors. |
| **Admin events** | Shown only to administrators: platform issues reported by the agents. |
| **Chat mode** | How your agent answers from Telegram: **plan** analyses and recommends without trading; **trading** may open and close positions as it does in the dashboard. Switching to trading asks you to confirm. |

The dashboard keeps showing everything regardless of these settings; they only decide what is forwarded to Telegram.

## Approve a position from your phone

If a portfolio has **Wait before to Open Orders** on, every new position starts as *awaiting approval* and the notification you receive says so:

- the symbol, the portfolio, the direction and the price,
- how long is left before the automatic decision, and what that decision is (**Open** or **Skip**),
- two buttons, **✅ Approve** and **❌ Reject**,
- **Open in Signal Pool**, which opens the signal in the dashboard with the filters set to it.

Tap Approve to open the position now, or Reject to skip it. The message updates itself with the outcome, and it does the same if you decide from the dashboard or if the timer runs out first. A position that was already decided cannot be decided again: the bot tells you so.

`/pending` lists every position currently waiting for you, with the same buttons.

## Talk to your agent

Write anything in the chat and your TredOps agent answers, with the same tools and the same memory it has in the dashboard: your portfolios, the Signal Pool, market data and your past conversation. While it works you see a **Thinking…** message that keeps counting the time and turns into the answer when it is ready. Long analyses can take a few minutes.

Every answer ends with a small cost line: the credits it used and how many you have left, or *Own API key* when the agent runs on a provider key of yours. If you run out of credits the bot says so and points you to the credits page.

## Commands

| Command | What it does |
|---------|--------------|
| `/status` | Your link and current preferences |
| `/pending` | Positions waiting for your approval |
| `/portfolios` | Choose the portfolios that notify you |
| `/events` | Choose the events that notify you |
| `/mode` | Agent chat mode, plan or trading |
| `/prompt` | The agent prompt used from Telegram |
| `/stop` | Cancel the answer in progress and anything queued behind it |
| `/clear` | Forget the conversation and start fresh |
| `/unlink` | Disconnect this chat |
| `/help` | The list of commands |

## Disconnect

From the dashboard, the ⋯ menu of the Telegram row offers **Unlink**; from the chat, `/unlink` does the same. Either way the bot stops sending messages at once and the permission it had to act for you is revoked. Nothing else changes: your notifications, positions and history stay in the dashboard. You can link again whenever you want.

## Good to know

- Only a private chat with the bot works. Groups and channels are ignored.
- Anything the bot does for you, it does with your own account and your own permissions. It cannot approve a position that is not yours or read another user's portfolios.
- Telegram messages have a length limit; a long answer arrives in several messages, in order.
- The bot never asks for passwords, keys or codes in the chat, and it never will. The only code it needs travels inside the QR link.
