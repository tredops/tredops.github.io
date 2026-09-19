---
title: Monitoring
description: Automatic Take Profit and Stop Loss with continuous position monitoring.
---

The **Monitoring** pillar is the layer of continuous position monitoring with automatic risk management.

**Every order** generated or managed through TredOps always opens with a defined **Take Profit** and **Stop Loss**. The system continuously monitors positions to capture opportunities or close the trade when the configured conditions are met, reducing exposure to impulsive decisions or poor risk management.

## How it works

1. A periodic worker reviews all open positions.
2. For each position it fetches current market data.
3. It evaluates the position with the same strategy used to open it.
4. It checks risk levels:

   - **Stop Loss**: closes if the price drops below the maximum loss threshold.
   - **Take Profit**: closes if the price reaches the profit target.
   - **Strategy signal**: closes if the strategy evaluation says to exit.

5. If it decides to close, it updates your portfolio balance automatically.

## Risk parameters

You configure the levels when the order opens:

- **Stop Loss** — maximum accepted loss percentage.
- **Take Profit** — target profit percentage.
- **Trailing stop** (optional) — follows the price in your favor to protect profits.

> Once an order is open, it is evaluated with its own saved parameters, not those of the opening day.

## Closing reasons

| Reason | Description |
|--------|-------------|
| `STOP_LOSS` | Price fell below the maximum loss threshold |
| `TAKE_PROFIT` | Price reached the profit target |
| `STRATEGY_SIGNAL` | The strategy indicates closing the position |
| `FORCE_CLOSE` | Forced manual close |

## Agent risk management

When an autonomous agent operates for you, it also applies additional risk rules to protect your capital:

- Max **25%** per position.
- **10%** cash reserve.
- Close on a **−5%** loss.
- Close half the position at **+10%** profit.
- Default stop-loss distance of **15%**.

Thanks to this layer, TredOps automates and professionalizes risk management: no impulsive decisions, no badly calculated stops removed by volatility.