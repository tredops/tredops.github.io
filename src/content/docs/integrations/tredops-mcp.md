---
title: TredOps MCP
description: Connect Claude Code, Claude Desktop, Cursor, OpenCode or any MCP client to your portfolios, with a token you control and the same rules your agents follow.
---

TredOps MCP lets an AI agent you already use work on your TredOps account. Claude Code, Claude Desktop, Cursor, OpenCode or any client that speaks the Model Context Protocol connects to `https://m.tredops.com/mcp` with a token you create in the dashboard, and from there it can read your portfolios, judge signals, open and close orders, and manage your bots and agent tasks, under the same limits as the agents that run inside TredOps.

The connection is yours: one token per client, shown once, revocable at any time. What the agent sees is decided server-side by your plan and by the permissions of the token, never by the agent.

:::note
TredOps MCP is a **Premium** feature. The number of connections you may keep open depends on your plan; the dashboard tells you when you reach the limit.
:::

## Connect it

1. **Dashboard → Integrations → ⊕ → TredOps MCP.** Give the connection a name that says where the token will live (for example *Claude Code on my laptop*), choose its **Access** and press **Create connection**.
   - **Full access** (default): read portfolios and signals, open and close orders, manage bots and agent tasks.
   - **Read-only**: the agent can analyse but never trade or change anything. Good for research clients, shared machines, or a first try. The connection row shows a *Read-only* badge, and only the read-only tools appear to the agent.
2. **Copy the token now.** It is shown only this once; later you can only rotate it. It looks like `tredops_<id>@<secret>` and carries the permissions `read`, `write` and `delete` (just `read` for a read-only connection). Rotating keeps the access level.
3. Open **Connection instructions** and pick your client. Each tab has the exact snippet with your endpoint and server name already filled in.

### Claude Code

Run once in a terminal, then restart Claude Code and check `/mcp`:

```bash
claude mcp add --transport http --scope user tredops https://m.tredops.com/mcp --header "Authorization: Bearer tredops_<id>@<secret>"
```

### Claude Desktop / Cursor

Add this to `claude_desktop_config.json` (Claude Desktop) or `.cursor/mcp.json` (Cursor) and restart the app:

```json
{
  "mcpServers": {
    "tredops": {
      "url": "https://m.tredops.com/mcp",
      "headers": {
        "Authorization": "Bearer tredops_<id>@<secret>"
      }
    }
  }
}
```

### OpenCode

Add this to `opencode.json` in your project or home folder:

```json
{
  "mcp": {
    "tredops": {
      "type": "remote",
      "url": "https://m.tredops.com/mcp",
      "headers": {
        "Authorization": "Bearer tredops_<id>@<secret>"
      }
    }
  }
}
```

### Any other client

The server speaks MCP over Streamable HTTP. Authenticate every request with `Authorization: Bearer <token>`, initialize a session and keep the `mcp-session-id` response header for the following calls:

```bash
curl -sS -i -X POST 'https://m.tredops.com/mcp' \
  -H 'Authorization: Bearer tredops_<id>@<secret>' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-agent","version":"1.0.0"}}}'
```

## What your agent can do

The agent receives a set of **tools** (actions) and **skills** (expert playbooks). Both are filtered for you: admin and research tools are never exposed through this connection, and tools that need a higher plan simply do not appear.

| Area | Tools (examples) |
|------|------------------|
| **Portfolios** | status of every portfolio, the full context of one (balance, open orders, history, signal pool, market snapshot), create or update a portfolio and its risk profile |
| **Signals** | the signal pool with each bot's track record and risk, market data per signal with the bot's own timeframe, news, save a signal analysis |
| **Orders** | open a position from a signal, force-close a position, rebalance, read an order in full |
| **Bots** | your BotConfigs and bots with calibration, replay verdict and P&L, create improved versions, run calibrations and performance tests, move bots between staging and production |
| **Agents** | create and schedule agent tasks, run a sub-agent on a portfolio, portfolio decision memory |
| **Support** | report an issue to the TredOps team |

Expanding the connection row in the dashboard shows **Tools available to your agents**: how many of the platform's tools your plan unlocks, grouped by area, with a `read-only`, `writes` or `destructive` badge on each.

### Skills

Skills are the playbooks TredOps agents follow: how to judge a signal with the logic of the strategy that produced it, how to read a portfolio context or a market data block, how to improve a bot with one hypothesis per version, how to review a closed trade, how to configure a portfolio's risk. Your MCP client sees them as prompts (in Claude Code, `/mcp__tredops__signal-judge`), as resources, and through the `listSkills` and `getSkill` tools. Load one before working on its domain; the agent then follows the same rules as the agents inside TredOps. [Agent skills](/features/skills/) explains them in full, including how to reach them from the dashboard chat and from Telegram.

| Skill | Use it when |
|-------|-------------|
| `context-reader` | you want an analysis of a portfolio or a symbol that cites the right numbers |
| `signal-judge` | the agent has to decide whether to follow a signal |
| `trade-review` | a position closed and you want to know why, and what to change |
| `portfolio-risk-setup` | you are creating or tuning a portfolio: risk profile, order size, signal filters and sources |
| `bots-builder-expert` | you want to diagnose, version, calibrate or promote bots |
| `trade-setup` | you want to arm a strategy on a symbol by price levels and follow it — see [Trade setups](/features/trade-setups/) |
| `agent-task-designer` | you are designing or auditing a scheduled or event-driven task |

## Guardrails

The same rules that govern TredOps agents apply to yours:

- An order is opened only within the risk limits of the portfolio (position size, cash reserve, broker balance). If the context of the portfolio cannot be read, the order is refused rather than guessed.
- A bot can reach production only with a passed performance test; a promotion without evidence is rejected.
- **Wait before to Open**: if a portfolio has it enabled, an order opened by the agent waits for your approval; the agent is told it is pending, not opened.
- A token acts on your account only. Portfolios, orders and bots of other users do not exist for it.

## Rotate or revoke

- **Rotate token** (expand the row): issues a new token and shows it once. The previous token is revoked immediately and every agent using it stops working until you reconfigure it.
- **Revoke access…** (⋯ menu of the row): deletes the connection and revokes its token. Nothing else changes: your portfolios, orders and history stay.

There is no **Verify connection** action for this integration: the token is checked by the service on every call, so the moment it stops working your agent tells you.

## Security

- Only the id of the token is stored; the secret is shown when created or rotated and never again.
- The client sends the token in the `Authorization` header over HTTPS. Keep it out of repositories and shared configuration files.
- Every call runs with your identity and your plan, decided server-side. A client cannot claim a different plan or role.
- Admin and research capabilities are not reachable through MCP connections, whatever the client requests.

## Good to know

- One connection per client is the easiest way to know which agent did what: the token line shows **Created** and **Last used**.
- Agents work best when they load a skill first. If your client supports MCP prompts, start a task with the skill of its domain.
- A rotated token invalidates the sessions already open with the old one; reconnect the client after rotating.
