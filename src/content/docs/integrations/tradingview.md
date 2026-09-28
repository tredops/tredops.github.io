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
| `capital` | Dollars to put in the position. Optional, and it wins over everything else. |
| `quantity` | Units. Together with the price it sets the size when there is no `capital`. |
| `time` | When the alert fired. `{{timenow}}` fills it in, and it becomes the date of the trade. |
| `strategy` | A free label that travels with the position, so you can tell your strategies apart. |

Fields you leave as unfilled placeholders are simply ignored, which is what happens with price alerts that are not attached to a strategy.

### How much each signal invests

Three ways, in this order:

1. `capital` in the alert, in dollars. `"capital": "300"` puts 300 dollars in that position.
2. `quantity` times `price`, which is what a Pine strategy produces when it sends its own contracts.
3. The **capital per signal** of the integration, next to Leverage in its settings. This is what an alert that says neither gets, and it is the simplest setup: fix it once at 500 and never think about size again.

Whatever the alert asks, an order never commits more than the per-order ceiling of the integration's portfolio or its available balance, so a leaked passphrase cannot size a trade on its own. A `price` more than 10% away from the market is ignored in favour of the market price, and a `time` more than 15 minutes from reception is ignored too.

## The four actions

| Action | What TredOps does |
|--------|-------------------|
| `open-long` | Opens a long, or adds one if Sizing leaves room. If a short is open on that symbol, it closes it first and reverses. |
| `close-long` | Closes every long of that symbol. Does nothing if there is none. |
| `open-short` | Opens a short, or adds one if Sizing leaves room, reversing an open long. Requires **Allow shorts**. |
| `close-short` | Closes every short of that symbol. |

One alert per action. Because the action names the side, a strategy that reverses its position is followed correctly with a single alert.

The words TradingView emits in `{{strategy.order.action}}` (`buy`, `sell`, `close`) are still accepted for compatibility, but they never reverse a position: on an open long, a `sell` only closes it.

### Example: a long on BTC/USD

Entry alert:

```json
{ "passphrase": "<your passphrase>", "action": "open-long", "asset": "BTCUSD",
  "price": "{{close}}", "capital": "300", "time": "{{timenow}}", "strategy": "My_Strategy" }
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
  "price": "{{close}}", "capital": "500", "time": "{{timenow}}", "strategy": "My_Strategy" }
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

The webhook's own reply says the same thing. Whenever the alert is settled within about two seconds, which is nearly always, the response carries the outcome in the same words the panel uses, so a test from a terminal explains itself:

```json
{ "accepted": true, "status": "processed", "result": "sizing_limit_reached",
  "message": "SIZING_LIMIT_REACHED: Maximum 1 positions allowed based on sizing_pct 1. Currently open: 1",
  "symbol": "BTC/USD", "orderId": "…", "closedOrderIds": [] }
```

`status` is `processed`, `rejected` or `failed`; `result` is the decision (`open_long`, `close_long`, `sizing_limit_reached`, `blocked`, `market_closed`…) and `message` the reason. If the worker has not settled the alert in time, `status` is `queued` and the panel shows the outcome a moment later.

**Verify connection**, in the row menu and in the header, runs a smoke test that checks the passphrase, the bot, the portfolio and the execution queue without creating any order.

## Common rejections

| What you see | What it means |
|--------------|---------------|
| `invalid passphrase` | The message in TradingView is not the current one. Rotate the passphrase and paste the new message in every alert of this integration. |
| `market_closed` | The asset's market was closed when the alert fired. Crypto is always open; stocks and ETFs follow their session. |
| `symbol_not_supported` | The ticker does not match an asset TredOps can trade. |
| `shorts_disabled` | The alert asked for a short and the integration does not allow them. |
| `bots_limit_reached` | Your plan's limit of symbols for this integration is reached. |
| `sizing_limit_reached` | The symbol already holds as many positions as Sizing allows. Nothing to do. |
| `blocked` | A bot rule held the entry: the open positions are not in profit, or the cooldown after losses is active. |
| `wrong_side` | A `close-long` arrived while holding a short, or the reverse. |

## Security

Your passphrase is the only credential of the webhook, and it lives in the alert body, not in the URL, so it never reaches proxy or server logs. It authenticates on this webhook alone: used anywhere else in TredOps it is rejected without even a lookup.

It is shown when you connect the integration and when you rotate it, and never again. Rotating revokes the previous one immediately, so update the message in your alerts right after.

## Disconnecting

Disconnecting deletes everything this integration created, and it cannot be undone:

1. Any position still open is **closed at market** first.
2. Its orders, the bot of each symbol, its alert history, its notifications, its portfolio and its configuration are deleted.
3. The passphrase is revoked, so the webhook stops accepting alerts.

Positions other portfolios opened by following its signals are yours, and they are kept. The portfolio is kept too if anything else was trading in it. If one of the open positions cannot be closed, nothing is deleted and the dashboard tells you, so close it from your positions and try again.
