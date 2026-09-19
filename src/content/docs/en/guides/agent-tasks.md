---
title: Scheduling tasks (AgentTask)
description: Turn a chat routine into an agentic task that runs on its own, with the scope and frequency you decide.
---

An **AgentTask** is an instruction an agent runs periodically without you opening
the chat. It is the difference between "I check the book when I remember" and
"the book checks itself every morning."

## When to create one

A routine deserves to be a task when three things hold:

1. **You repeat it.** If you do it once, do it in chat.
2. **You have already tested it in chat** and the agent answers as expected.
3. **It has a clear stopping condition.** "Analyse the market" does not have one;
   "close if the position drops 3%" does.

## Creating a task

From **Agents → Tasks → New task**:

| Field | What it sets |
|-------|--------------|
| **Agent** | Who runs it: your main agent or a specialised sub-agent |
| **Portfolio** | Which book it acts on |
| **Instruction** | What it must do, in plain language |
| **Frequency** | How often it wakes up |
| **Mode** | Plan (reports only) or Autonomous (may execute) |
| **Notifications** | Whether you want an alert on every run or only when it acts |

Agents can also create tasks themselves when you ask them to ("check this every
Monday"), always within the portfolio's permissions.

## Four tasks worth having

**Daily summary (Plan mode)**

> Every trading day at 09:00, summarise the portfolio: equity, day P&L, open
> positions with their result, and any position closed in the last 24 hours with
> its reason.

**Signal filter (Plan mode)**

> Every 4 hours, review the Signal Pool and propose the three best opportunities
> for this portfolio. Do not open anything: just explain why each one fits.

**Risk supervision (Autonomous mode)**

> Every hour, review open positions. If any exceeds 25% of the portfolio's
> capital, reduce the exposure down to that limit. Notify me of every adjustment.

**Weekly rebalance (Autonomous mode)**

> Every Monday at the open, rebalance the book so no sector exceeds 40% of total
> exposure. Do not open new positions: only adjust existing ones.

## Writing the instruction

A good instruction answers four questions: **when**, **what to look at**, **what
to do** and **what not to do**.

> ❌ "Watch my book and do whatever is needed."

> ✅ "Every hour, review this portfolio's open positions. If one has been open
> more than 10 days and its P&L is between −1% and +1%, close it and explain why.
> Do not open new positions and do not touch anything that is in profit."

The "what not to do" is the part most people skip, and the one that prevents the
most damage.

## Follow-up

Every run leaves a record of what the agent saw, what it decided and what it did.
You can review it in the task history, including the credit cost of each run.

If a task starts behaving oddly, switch it to **Plan**: it will keep reporting
without touching the book while you fix the instruction.

## Limits

- Tasks never bypass the portfolio's risk rules.
- Every order a task opens carries Take Profit and Stop Loss.
- You can pause or delete a task at any time; a pause takes effect before the
  next run.
- Every run consumes LLM credits. A task every 5 minutes costs 12× one every
  hour, and rarely decides 12× better.

## Next

- [Managing risk](../risk/)
- [Plans & pricing](../../pricing/) — how many credits each plan includes.
