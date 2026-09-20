---
title: Seguridad
description: Cómo protege TredOps tus credenciales, tus cuentas y tus datos.
---

TredOps se construyó sobre un principio de seguridad claro: **tu capital y tus credenciales te pertenecen**. Esta página resume cómo se protegen.

## No custodial

- TredOps **no custodia fondos** ni gestiona cuentas de inversión.
- El capital permanece siempre en tu cuenta del broker externo.
- En caso de duda o desconfianza, puedes revocar la integración y TredOps deja de poder operar de inmediato.

## Credenciales

- Las claves de brokers y proveedores LLM se **cifran** (AES-256) antes de almacenarse.
- Solo tú puedes ver o revocar tus credenciales.
- Los agentes usan **tokens de acceso** con permisos granulares, nunca tus claves en claro.

## Autenticación

- Sistema de autenticación central (JWT) para todas las sesiones de la plataforma.
- Soporte de **OAuth** con proveedores externos (Google, etc.).
- Rotación de sesiones y caducidad de tokens por seguridad.
- **Rate limiting** y cabeceras de seguridad en los servicios expuestos.

## Permisos

Cada operación que un agente o bot realiza requiere el permiso correspondiente (`execute_agent`, monitorización de órdenes, acceso a datos, gestión de tokens…). Los agentes autónomos operan bajo estas reglas y bajo el [Risk Manager](../pillars/monitoring/) de la plataforma.

## Contacto

Si detectas un problema de seguridad, escríbenos a **security@tredops.com**.