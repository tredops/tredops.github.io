---
title: Agent skills
description: The expert playbooks your agent follows. What each one is for, how to give your agent the ones it needs, and how to call one from the chat.
---

A **skill** is an expert playbook: a written procedure the agent reads before
acting on a subject. Not a tool and not a prompt you have to maintain — it is the
method TredOps has distilled for one job, with its rules, its order of steps and
the mistakes to avoid.

The difference is easy to see. Ask an agent *"should I follow this signal?"* with
no skill and it will reason as the model sees fit, differently each time. Ask the
same with the signal skill loaded and it reads direction first, checks the
evidence in the order that matters, and refuses the signal when the evidence is
not there.

## What skills exist

These are available on every plan that includes agents. They are the same
playbooks the platform's own agents use.

| Skill | What it is for |
|-------|----------------|
| **Trade setup** | Leave a complete strategy armed on a symbol by price levels, and follow it. See [Trade setups](/features/trade-setups/) |
| **Signal judge** | Decide whether to follow a signal from the pool, with the logic of the strategy that produced it |
| **Trade review** | Post-mortem of a closed position: why it closed, whether the thesis held, what to change |
| **Portfolio risk setup** | Configure a portfolio: risk profile, order size, signal filters and sources |
| **Context reader** | Read a portfolio's context and a market-data block and turn them into an analysis that cites real numbers |
| **Bots builder expert** | Diagnose, version, calibrate and promote bots, one hypothesis at a time |
| **Agent task designer** | Design and audit scheduled or event-driven tasks |

Some skills also carry **supporting files** — recipes, level tables, checklists —
that the agent opens only when the playbook points at them, so a long procedure
does not crowd out the conversation.

## Your agent only has the skills you give it

A skill is **pinned** to an agent. An agent uses the skills pinned to it and no
others: it cannot reach for a different playbook on its own, and it will not
announce skills that are not its own. This is deliberate — an agent you built to
judge signals should not quietly start reconfiguring bots.

Where you pin them:

1. Open the **Playground** and pick the agent you want to change.
2. In the model panel, open the **Skills** section. It lists the skills your plan
   gives you.
3. Tick the ones that agent needs, and save or publish.

From that moment the agent starts every run with those playbooks already loaded —
it does not spend a turn fetching them — and can re-read them or open their
supporting files whenever it needs to.

:::note
An agent with nothing pinned has no skills. If you notice an agent reasoning in a
looser way than before, or the `/` menu in the chat coming up empty, check its
Skills section in the Playground first.
:::

## Calling a skill from the chat

In the dashboard **chat**, type `/` at the start of the message. A list opens with
the skills of the agent you are talking to, with a one-line summary of each. Pick
one, write your question after it, and send:

```
/trade-setup I want to buy the breakout of 103 on this symbol, 300 USD, stop under 98
```

The agent loads that playbook and answers following it. You do not have to
remember the names: the list filters as you type, and arrow keys plus Enter pick
the highlighted one.

The same works on **Telegram**: the bot's command menu lists the available skills,
and `/skills` prints them with their description. Writing `/trade_setup <your
question>` is the equivalent of the `/` menu in the web chat.

## Skills in your own MCP client

If you connect your own agent (Claude Code, Claude Desktop, Cursor…) through
[TredOps MCP](/integrations/tredops-mcp/), the same skills reach it as
prompts, resources and the `listSkills` / `getSkill` tools. Load one before
working on its domain and your client follows the same procedure as the agents
inside the platform.

## Good to know

- **Skills do not replace risk limits.** A playbook changes how an agent decides,
  never what it is allowed to do: the portfolio's limits, the approval step and
  the plan's permissions apply exactly the same.
- **A skill is not a system prompt.** Your prompt says who the agent is; the skill
  says how a particular job is done well. Keep the prompt about criteria and let
  the skill carry the procedure.
- **Pin few.** Two or three relevant playbooks beat all of them: a focused agent
  decides better, and every skill it starts with is context it carries all run.
- Some skills are reserved for the platform's own maintenance and never appear in
  your list.
