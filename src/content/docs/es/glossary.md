---
title: Glosario
description: Los términos que aparecen en TredOps y en esta documentación, explicados en una línea.
---

## Plataforma

**Agente** — Modelo de lenguaje con contexto de tu cartera, herramientas y
permisos. Es quien decide qué operaciones se abren y se cierran.

**AgentTask** — Instrucción que un agente ejecuta de forma periódica sin
intervención. Ver [Programar tareas](../guides/agent-tasks/).

**Benchmark** — Comparativa pública de agentes y modelos LLM sobre la misma
ventana de mercado y el mismo capital. Ver [ediciones](../benchmark/).

**Bot** — Estrategia algorítmica sobre uno o varios activos, con parámetros
optimizados sobre datos históricos. Genera señales; no ejecuta.

**Calibración** — Proceso que busca los parámetros óptimos de una estrategia para
un activo, sobre datos históricos. Se repite de forma periódica.

**ExpertMode / Playground** — Entorno donde creas tus propios bots y agentes, con
system prompts y parámetros a medida.

**Monitoring** — Vigilancia continua de las posiciones abiertas, con cierre
automático por Take Profit, Stop Loss o señal de la estrategia.

**Portfolio** — Cartera dentro de TredOps, con su capital, sus posiciones y sus
reglas de riesgo.

**Signal Pool** — Depósito compartido de las señales que generan los bots, del
que los agentes seleccionan las que merece la pena ejecutar.

**Sub-agente** — Agente especializado al que el agente principal delega una parte
del análisis o la gestión.

**Staging** — Estado de un bot que todavía no ha superado el umbral de calidad:
se ejecuta en segundo plano, pero sus señales no llegan a tu cartera.

## Mercado y operativa

**Buy & Hold** — Comprar y mantener. Es la referencia con la que se compara todo
en el Benchmark: si una estrategia no la bate, no compensa su complejidad.

**Corto (short)** — Posición que gana cuando el precio baja. En los gráficos se
marca con `↓`.

**Drawdown** — Caída máxima desde un máximo previo. Mide lo mal que se pasa con
una estrategia, no lo bien que acaba.

**Equity** — Valor total del portfolio en un momento dado: capital invertido más
liquidez.

**Largo (long)** — Posición que gana cuando el precio sube.

**Liquidez (cash)** — Parte del portfolio que no está invertida.

**Look-ahead bias** — Error de evaluar una decisión pasada con información que en
ese momento no existía. Las calibraciones de TredOps lo evitan por diseño.

**OHLCV** — Datos de mercado por periodo: apertura, máximo, mínimo, cierre y
volumen (*open, high, low, close, volume*).

**Orden** — Instrucción de compra o venta enviada al broker.

**P&L** — Pérdidas y ganancias (*profit and loss*). **Realizado** si la posición
ya se cerró, **no realizado** si sigue abierta.

**Posición** — Lo que tienes abierto en el mercado como resultado de una orden.

**Rebalanceo** — Ajuste de los pesos de la cartera para volver a la distribución
objetivo.

**Señal** — Propuesta de operación generada por un bot.

**Sobreajuste (overfitting)** — Ajustar tanto una estrategia a su histórico que
deja de funcionar con datos nuevos. Es lo que detecta el Performance Testing.

**Stop Loss** — Precio al que se cierra una posición en pérdidas.

**Take Profit** — Precio al que se cierra una posición en ganancias.

**Volatilidad** — Cuánto se mueve el precio de un activo. Determina lo ancho que
debe ser un stop.

## Cuenta y facturación

**Créditos** — Unidad de consumo de los modelos de lenguaje. Cada mensaje y cada
ejecución de tarea gasta créditos. Ver [Planes y precios](../pricing/).

**Integración** — Conexión con un servicio externo: un broker (Alpaca) o un
proveedor de LLM (OpenRouter, DeepSeek).

**No custodial** — TredOps nunca guarda ni gestiona tu dinero: permanece en tu
cuenta del broker. Ver [Seguridad](../security/).

**Token de acceso** — Credencial con permisos acotados que usan los agentes para
actuar en tu nombre. Nunca tus claves del broker.
