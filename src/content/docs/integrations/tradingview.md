---
title: TradingView
description: Send your TradingView alerts to TredOps and let them trade with stop loss, take profit and agent supervision.
---

TradingView decides when to enter and exit. TredOps executes that decision, protects the position and shows it next to everything else you run.

Your Pine strategy or your price alert calls a webhook. TredOps turns the alert into a real position inside a bot of your own, applies the stop loss, take profit and time exit you configured, publishes the signal in your private Signal Pool, and lets your agents see it. You keep using TradingView exactly as you do today.

:::note
Webhooks require a TradingView **Essential** plan or higher. That is a TradingView requirement, not a TredOps one.
:::

## Connect it

1. **Dashboard → Integrations → ⊕ → TradingView.** Give it a name and set how each signal should be traded: capital per signal, stop loss, take profit, time exit, position sizing, leverage and whether shorts are allowed.
2. TredOps answers with a **Webhook URL** and a **Message**. Copy both. The message contains your passphrase and **is shown only once**.
3. In TradingView, create your alert, open **Notifications**, enable **Webhook URL** and paste the URL. Paste the message in the **Message** field.

That is the whole setup. The first alert that arrives creates the bot for that symbol automatically.

## The message

```json
{
  "passphrase": "<your passphrase>",
  "action": "open-long",
  "asset": "{{ticker}}",
  "price": "{{close}}",
  "quantity": "0.01",
  "time": "{{timenow}}",
  "strategy": "My_Strategy"
}
```

| Field | Meaning |
|-------|---------|
| `passphrase` | Your webhook secret. It authenticates only on this webhook and works nowhere else in TredOps. |
| `action` | What to do: `open-long`, `close-long`, `open-short`, `close-short`. |
| `asset` | The ticker. `{{ticker}}` fills it in; an exchange prefix like `NASDAQ:` is ignored. |
| `price` | The price of the alert. `{{close}}` fills it in, and the position is booked at it. |
| `quantity` | Units. Together with the price it sets the capital of the position. Without it, the capital per signal of the integration is used. |
| `time` | When the alert fired. `{{timenow}}` fills it in, and it becomes the date of the trade. |
| `strategy` | A free label that travels with the position, so you can tell your strategies apart. |

Fields you leave as unfilled placeholders are simply ignored, which is what happens with price alerts that are not attached to a strategy.

## The four actions

| Action | What TredOps does |
|--------|-------------------|
| `open-long` | Opens a long. If a short is open on that symbol, it closes it first and reverses. |
| `close-long` | Closes the long of that symbol. Does nothing if there is none. |
| `open-short` | Opens a short, reversing an open long. Requires **Allow shorts**. |
| `close-short` | Closes the short of that symbol. |

One alert per action. Because the action names the side, a strategy that reverses its position is followed correctly with a single alert.

The words TradingView emits in `{{strategy.order.action}}` (`buy`, `sell`, `close`) are still accepted for compatibility, but they never reverse a position: on an open long, a `sell` only closes it.

### Example: a long on BTC/USD

Entry alert:

```json
{ "passphrase": "<your passphrase>", "action": "open-long", "asset": "BTCUSD",
  "price": "{{close}}", "quantity": "0.01", "time": "{{timenow}}", "strategy": "My_Strategy" }
```

Exit alert:

```json
{ "passphrase": "<your passphrase>", "action": "close-long", "asset": "BTCUSD",
  "price": "{{close}}", "time": "{{timenow}}", "strategy": "My_Strategy" }
```

Crypto trades around the clock, so these alerts are accepted any day of the week.

### Example: a short on GLD

Entry alert:

```json
{ "passphrase": "<your passphrase>", "action": "open-short", "asset": "GLD",
  "price": "{{close}}", "quantity": "10", "time": "{{timenow}}", "strategy": "My_Strategy" }
```

Exit alert:

```json
{ "passphrase": "<your passphrase>", "action": "close-short", "asset": "GLD",
  "price": "{{close}}", "time": "{{timenow}}", "strategy": "My_Strategy" }
```

Shorts need **Allow shorts** enabled in the integration and an asset that can be shorted. Stocks and ETFs are only accepted while their market is open; an alert that arrives outside the session is rejected and you are notified.

## What TredOps adds to your signals

- **Protection.** Stop loss, take profit and the time exit run on every position from the moment it opens, whether or not TradingView sends anything else. The stop trails the best price reached.
- **Your private Signal Pool.** These signals are visible to you alone. Nobody else sees them, and they are never published.
- **Agents.** Your agents read them like any other signal, so they can act on them, follow them in a different portfolio or report on them.
- **One place.** The position shows up in your positions, your bots and your notifications with the TradingView logo, next to everything else you run.

Changing the settings of the integration affects new positions. Positions already open keep the stop and target they were opened with.

## Debugging

Expand the integration row. The panel shows:

- The **webhook URL**, ready to copy.
- An **information icon** with the four actions and ready-made examples.
- **Last requests**: the most recent calls the webhook answered, each one expandable to the exact body TradingView sent, the answer TredOps returned, and what the alert ended up doing. Your passphrase is redacted from it.

That log is the fastest way to tell the three usual cases apart: the alert never arrived, the alert arrived and was rejected, or the alert was accepted and the position is elsewhere in the dashboard.

**Verify connection**, in the row menu and in the header, runs a smoke test that checks the passphrase, the bot, the portfolio and the execution queue without creating any order.

## Common rejections

| What you see | What it means |
|--------------|---------------|
| `invalid passphrase` | The message in TradingView is not the current one. Rotate the passphrase and paste the new message in every alert of this integration. |
| `market_closed` | The asset's market was closed when the alert fired. Crypto is always open; stocks and ETFs follow their session. |
| `symbol_not_supported` | The ticker does not match an asset TredOps can trade. |
| `shorts_disabled` | The alert asked for a short and the integration does not allow them. |
| `bots_limit_reached` | Your plan's limit of symbols for this integration is reached. |
| `duplicate` | The alert asked for the position you already have. Nothing to do. |
| `wrong_side` | A `close-long` arrived while holding a short, or the reverse. |

## Security

Your passphrase is the only credential of the webhook, and it lives in the alert body, not in the URL, so it never reaches proxy or server logs. It authenticates on this webhook alone: used anywhere else in TredOps it is rejected without even a lookup.

It is shown when you connect the integration and when you rotate it, and never again. Rotating revokes the previous one immediately, so update the message in your alerts right after. If you disconnect the integration, the token is revoked and the bots are paused, keeping the history.
