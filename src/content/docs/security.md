---
title: Security
description: How TredOps protects your credentials, your accounts, and your data.
---

TredOps was built on a clear security principle: **your capital and credentials belong to you**. This page summarizes how they are protected.

## Non-custodial

- TredOps **does not custody funds** or manage investment accounts.
- Your capital always stays in your external broker account.
- If you ever have doubts, revoke the integration and TredOps can no longer operate immediately.

## Credentials

- Broker keys and LLM provider keys are **encrypted** (AES-256) before storage.
- Only you can view or revoke your credentials.
- Agents use **access tokens** with granular permissions, never your plaintext keys.

## Authentication

- Central authentication system (JWT) for all platform sessions.
- **OAuth** with external providers (Google, etc.).
- Session rotation and token expiry.
- **Rate limiting** and security headers on exposed services.

## Permissions

Every operation an agent or bot performs requires the corresponding permission (`execute_agent`, order monitoring, data access, token management…). Autonomous agents operate under these rules and under the platform's [Risk Manager](../pillars/monitoring/).

## Contact

If you find a security issue, email us at **security@tredops.com**.