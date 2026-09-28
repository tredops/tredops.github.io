---
title: Integrations
description: Connect your broker, your AI providers and your signal sources to TredOps, and keep control of every credential.
---

An integration is a connection between TredOps and a service you already use. You add it once from **Dashboard → Integrations**, and from then on the platform can execute, read or receive on your behalf, under the rules you set.

## The four kinds

| Kind | What it brings | Examples |
|------|----------------|----------|
| **Broker** | Order execution and market data in a real account | Alpaca (paper and live) |
| **AI · LLM** | Models your agents think with, billed to your own account | OpenRouter, DeepSeek, OpenAI, NVIDIA |
| **Signals** | Entries and exits decided outside TredOps | [TradingView](/integrations/tradingview/) |
| **Notifications** | Your notifications, approvals and agent chat outside the dashboard | [Telegram](/integrations/telegram/) |

A broker integration is where your money is. An AI integration is where your agents' reasoning happens. A signal integration is where trading decisions come from. They combine: a TradingView alert can open a position that a broker executes, an agent supervises and you approve from Telegram.

## Connect, verify, disconnect

1. **Connect.** Open Integrations, press the ⊕ button and pick the service. Each one asks for what it needs: an OAuth authorization for a broker, an API key for a model provider, a short form for a signal source.
2. **Verify.** The list shows a **Verify connection** action for every integration that supports a health check. It answers whether the credential still works, not whether it was ever right.
3. **Disconnect.** The ⋯ menu of the row removes the integration and revokes the token TredOps was using. History stays: closed positions, past signals and reports are never deleted by a disconnect.

Expanding a row opens its panel, which is where the details of that particular service live.

## How your credentials are kept

- Every secret in an integration is **encrypted at rest** and is never returned to the browser once stored. The dashboard shows a masked hint, not the value.
- Tokens TredOps mints for itself are **scoped**: a webhook token authenticates on its own webhook and nowhere else, and it carries only the permission it needs.
- Rotating a secret revokes the previous one immediately. Nothing else about the integration changes.
- **Non-custodial**: your capital stays in your broker account. TredOps executes and monitors, it never holds funds.

## Plan limits

Some integrations are limited by plan, for example how many TradingView webhooks a user may have, or how many bots each of them may run. When you reach a limit the dashboard says so at the moment you try to connect, and the upgrade path is one click away. Limits never affect integrations you already have connected.
