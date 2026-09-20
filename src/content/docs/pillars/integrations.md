---
title: Integrations
description: Connect brokers and LLM providers while keeping control of your credentials.
---

The **Integrations** pillar is the layer that connects external services to extend the platform beyond its native environment, while you keep control of your credentials and accounts.

## Types of integration

| Integration | What it's for | Where it's managed |
|-------------|---------------|--------------------|
| **Brokers** | Order execution and market data (Alpaca, more coming) | Dashboard → Integrations |
| **LLMs** | Models for your agents: OpenRouter, DeepSeek, OpenAI, Minimax | Dashboard → Integrations |
| **Market data** | Real-time and historical market data | Automatic (via broker) |
| **OAuth** | Authentication with external providers (Google, etc.) | Sign up/Sign in |
| **Webhooks** | Notifications and events to external systems | (coming soon) |

## Connect your broker

1. Go to **Integrations** → **Brokers**.
2. Select **Alpaca** (or another supported broker) and authorize with your credentials.
3. TredOps will only be able to **execute and monitor** under the rules you configure.

About market data:

- SIP quotes can be delayed up to **15 min** (depending on your broker account type).
- **Crypto** data has no delay.

## Connect LLM providers

TredOps is **multi-LLM**. You can:

- Use the tokens included in your plan.
- Connect your **own API keys** (OpenRouter, DeepSeek, OpenAI) and use your credits.

The platform handles **automatic failover** between providers to keep your agents running. No one else sees your keys: they are stored encrypted.

## Non-custodial

**Core principle:** your capital always stays in your external broker account. TredOps does not custody funds and does not manage investment accounts. The connection only gives you the ability to execute orders from the platform.

## Integration security

- **Encrypted credentials** with AES-256.
- **Signed JWT tokens** for every session.
- **Granular permission system**: every operation requires the proper permission.
- **Rate limiting** and security headers across services.
- You can **revoke** any connection or key at any time.