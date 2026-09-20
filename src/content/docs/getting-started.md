---
title: Quick start
description: From zero to your first trade in TredOps. Sign up, connect your broker, pick a strategy and let monitoring do its job.
---

TredOps aims to be understandable and usable in **under 2 minutes**. This is the
recommended path; each step links to the detailed guide if you want to go deeper.

:::tip[First time?]
If portfolio, bot and signal are not yet clear terms, start with
[Key concepts](../concepts/). Five minutes there saves confusion later.
:::

## 1. Create your account

Go to [tredops.com](https://tredops.com) and sign up. You start on a **14-day
Free Trial**, no card required:

- Access to the bots and agents maintained by the TredOps team.
- Limited LLM credits, enough for a real test drive.
- Monitoring with Take Profit and Stop Loss.
- Up to 2 active bots.

See [Plans & pricing](../pricing/) for the detail on each plan.

## 2. Connect your broker

TredOps is **non-custodial**: your funds stay in your broker account and the
platform never touches them.

1. Go to **Integrations** in the dashboard.
2. Connect **Alpaca** (or the supported broker) by authorising the connection.
3. Add the assets you want to trade: ETFs, stocks or crypto.

Your credentials are stored encrypted and are only used to execute and monitor
the trades your bots and agents decide, under the risk rules you configure. You
can revoke the integration at any time.

:::caution[Start on paper trading]
If your broker offers a paper account, connect that first. You will see exactly
the same behaviour with no real money involved.
:::

## 3. Set your risk rules

Before anything trades, go to **Portfolios → Settings** and decide three things:

- How much capital may go into **a single position** (start at 15%).
- How much you want to keep permanently in **cash** (start at 20%).
- How many **simultaneous positions** you accept (3 or 4 at first).

These rules override any agent and any task. See [Managing risk](../guides/risk/).

## 4. Pick a strategy with the Benchmark

Before building anything of your own, look at what works: the
[public Benchmark](../benchmark/) compares agents and LLM models over the same
market window and the same capital, against **Buy & Hold**.

Do not use it as a leaderboard to copy the winner from — use it to see **how**
each profile behaves: how many trades it opens, how long it sits in a losing
position, how concentrated it gets.

## 5. Put a bot to work

The TredOps-maintained bots already give you signals from day one. If you want
your own:

1. **Bots → Create bot** and pick the asset or sector.
2. Accept the default configuration: TredOps optimises the parameters with
   genetic algorithms over the asset's history.
3. The bot goes through **Performance Testing**. Only if it clears the quality
   threshold does it reach production; otherwise it stays in staging, running in
   the background.

Full guide: [Your first bot](../guides/first-bot/).

## 6. Talk to your agent

Open the chat and start **in Plan mode**, which only reads and proposes:

- *"How is my portfolio doing today?"*
- *"What is in the signal pool that fits my rules?"*
- *"If I opened the TEST signal, how much capital would that commit?"*

Once you recognise the kind of decisions it makes, switch to **Trading** so it
executes with you watching. Full guide:
[Working with agents](../guides/first-agent/).

## 7. Let Monitoring work

Every order opens with **Take Profit** and **Stop Loss**. From there the system
reviews your positions continuously and closes them when a level is reached or
when the strategy itself says to get out.

This is the part not to fiddle with: it exists precisely to prevent decisions
made in the heat of the moment.

## 8. Automate what already works

When a chat routine gives you good results, turn it into an
[AgentTask](../guides/agent-tasks/) and let it run on its own.

## First-week checklist

- [ ] Broker connected (paper trading preferably).
- [ ] Portfolio risk rules set.
- [ ] One Benchmark edition read end to end.
- [ ] One bot in production or staging.
- [ ] Three conversations with the agent in Plan mode.
- [ ] No AgentTask in autonomous mode yet.

## Next steps

- [Key concepts](../concepts/) — the platform's vocabulary.
- [The four pillars](../pillars/bots-ci/) — how each layer works inside.
- [Security](../security/) — what TredOps protects and what you control.
- [FAQ](../faq/) — the questions that come up most.
