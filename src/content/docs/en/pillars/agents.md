---
title: AI Agents
description: RAG chat, Playground, AgentTask, and autonomous agents to manage your portfolio.
---

The **AI Agents & SubAgents** pillar is the artificial intelligence layer for autonomous portfolio and strategy management.

TredOps includes a **RAG chat** that lets you interact in natural language with your main agent and your subagents.

## Capabilities

- **RAG chat** — Natural-language interaction with your agents.
- **Playground** — Create your own agents and subagents with custom system prompts.
- **AgentTask** — Schedule agentic tasks: supervision, periodic analysis, rebalancing, alerts…
- **Tools** — Tools agents can call to query portfolios, market data, signals, and execute orders.

## Usage examples

- *"How is my portfolio today?"*
- *"Analyze the signal pool and propose the best three opportunities."*
- *"Monitor TEST and close if it drops 3%."*
- *"Rebalance my portfolio to defensive sectors."*
- *"Every Monday, summarize how my bot ranking closed the week."*

## Operation modes

| Mode | What it does |
|------|--------------|
| `plan` | Read-only analysis, executes nothing. |
| `trading` | The agent can decide and execute trades within the chat. |
| `autonomous-execution` | Unsupervised execution (scheduled agents via AgentTask). |

## Decision Engine

When an agent evaluates a signal before trading, it applies a **signal scoring**:

- Profit: 30% · Momentum: 25% · Reliability: 25% · Freshness: 20%.

Based on the score, the agent decides to **open an order**, **skip**, or ask for confirmation, applying trend and RSI bonuses.

## Risk Manager

Autonomous agents operate under strict risk rules (max 25% per position, 10% cash reserve, automatic stops) so autonomy never means uncontrolled risk.

## Scheduled tasks (AgentTask)

You can schedule recurring tasks: they run automatically at the times you define (`executionDays`, `executionHour`, `executionRepetition`). Examples: periodic supervision, market alerts, rebalancing, or weekly summaries.

## Memory

The agent remembers your portfolio context and previous conversations (up to 10 saved entries per portfolio) to give coherent answers over time.

## Playground (Premium)

In the Playground you define your own **system prompts**, choose the LLM model (multi-provider: OpenRouter, DeepSeek, etc.), and create specialized subagents for specific tasks. You control which tools they can use and under which risk rules.