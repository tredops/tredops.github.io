---
title: Agentes IA
description: Chat RAG, Playground, AgentTask y agentes autónomos para gestionar tu cartera.
---

El pilar de **AI Agents y SubAgents** es la capa de inteligencia artificial para la gestión autónoma de carteras y estrategias.

TredOps incorpora un **chat RAG** que te permite interactuar en lenguaje natural con tu agente principal y tus subagentes.

## Capacidades

- **Chat RAG** — Interacción en lenguaje natural con tus agentes.
- **Playground** — Crea tus propios agentes y subagentes con system prompts personalizados.
- **AgentTask** — Programa tareas agénticas: supervisión, análisis periódico, rebalanceo, alertas…
- **Tools** — Herramientas que los agentes pueden invocar para consultar carteras, datos de mercado, señales y ejecutar órdenes.

## Ejemplos de uso

- *"¿Cómo está mi portfolio hoy?"*
- *"Analiza el pool de señales y propón las tres mejores oportunidades."*
- *"Supervisa TEST y cierra si baja un 3 %."*
- *"Rebalancea mi cartera a los sectores defensivos."*
- *"Cada lunes, resume cómo ha cerrado la semana mi ránking de bots."*

## modos de operación

| Modo | Qué hace |
|------|----------|
| `plan` | Solo lectura y análisis, sin ejecutar nada. |
| `trading` | El agente puede decidir y ejecutar operaciones dentro del chat. |
| `autonomous-execution` | Ejecución no supervisada (agentes programados con AgentTask). |

## Decision Engine

Cuando un agente valora una señal antes de operar, aplica un **scoring de señales**:

- Profit: 30 % · Momentum: 25 % · Fiabilidad: 25 % · Frescura: 20 %.

Según la puntuación, el agente decide **abrir orden**, **ignorar** o pedir confirmación, aplicando bonificaciones basadas en tendencia y RSI.

## Risk Manager

Los agentes autónomos operan bajo reglas de riesgo estrictas (máximo 25 % por posición, reserva de caja del 10 %, stops automáticos), de modo que la autonomía nunca significa riesgo descontrolado.

## Tareas programadas (AgentTask)

Puedes programar tareas recurrentes: se ejecutan automáticamente en el horario que definas (`executionDays`, `executionHour`, `executionRepetition`). Ejemplos: supervisiones periódicas, alertas de mercado, rebalanceos o resúmenes semanales.

## Memoria

El agente recuerda el contexto de tu cartera y de conversaciones anteriores (máximo 10 entradas guardadas por portfolio), para darte respuestas coherentes a lo largo del tiempo.

## Playground (Premium)

En el Playground defines tus propios **system prompts**, eliges el modelo LLM (multi-proveedor: OpenRouter, DeepSeek, etc.) y creas subagentes especializados para tareas concretas. Tú controlas qué herramientas pueden usar y bajo qué reglas de riesgo.