---
title: Integraciones
description: Conecta brokers y proveedores de LLM manteniendo siempre el control de tus credenciales.
---

El pilar de **Integraciones** es la capa de conexión con servicios externos que extienden las capacidades de la plataforma más allá de su entorno nativo, manteniendo siempre el control de las credenciales y de las cuentas.

## Tipos de integración

| Integración | Para qué | Dónde se gestiona |
|-------------|----------|-------------------|
| **Brokers** | Ejecución de órdenes y datos de mercado (Alpaca, más próximamente) | Dashboard → Integraciones |
| **LLMs** | Modelos para tus agentes: OpenRouter, DeepSeek, OpenAI, Minimax | Dashboard → Integraciones |
| **Market Data** | Datos de mercado en tiempo real e históricos | Automático (via broker) |
| **OAuth** | Autenticación con proveedores externos (Google, etc.) | Registro/Login |
| **Webhooks** | Notificaciones y eventos hacia sistemas externos | (próximamente) |

## Conectar tu broker

1. Ve a **Integraciones** → **Brokers**.
2. Selecciona **Alpaca** (u otro soportado) y autoriza con tus credenciales.
3. TredOps solo tendrá permiso para **ejecutar y monitorizar** bajo las reglas que configures.

Sobre datos de mercado:

- Datos de cotizaciones SIP pueden tener hasta **15 min de retraso** (según el tipo de cuenta del broker).
- Datos de **crypto** no tienen retraso.

## Conectar proveedores LLM

TredOps es **multi-proveedor de LLMs**. Puedes:

- Usar los tokens incluidos en tu plan.
- Conectar tus **propias API keys** (OpenRouter, DeepSeek, OpenAI) y usar tus créditos.

La plataforma gestiona **fallback automático** entre proveedores para mantener a tus agentes operativos. Nadie más que tú ve tus claves: se almacenan cifradas.

## No custodial

**Principio fundamental:** el capital permanece siempre en tu cuenta del broker externo. TredOps no custodia fondos y no gestiona cuentas de inversión. La conexión solo te da a ti la capacidad de ejecutar órdenes desde la plataforma.

## Seguridad de las integraciones

- **Credenciales cifradas** con AES-256.
- **Tokens JWT** firmados para cada sesión.
- **Sistema de permisos granular**: cada operación requiere el permiso adecuado.
- **Rate limiting** y cabeceras de seguridad en los servicios.
- Puedes **revocar** cualquier conexión o clave en cualquier momento.