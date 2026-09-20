---
title: Trabajar con agentes
description: Habla con tu agente, entiende sus modos de operación y crea tus propios sub-agentes en el Playground.
---

Los bots proponen; los **agentes** deciden. Un agente es un modelo de lenguaje
con acceso al contexto de tu cartera, a los datos de mercado y a un conjunto de
herramientas para actuar. Esta guía te enseña a usarlo.

## 1. Empieza preguntando

Entra en el **chat** del dashboard y pregunta sin miedo. El agente tiene contexto
real de tus portfolios, no responde de memoria:

- *"¿Cómo está mi portfolio hoy?"*
- *"¿Qué posiciones tengo abiertas y cuánto llevo en cada una?"*
- *"¿Por qué se cerró la posición de ayer?"*
- *"¿Qué hay en el pool de señales para ETFs defensivos?"*

Estas preguntas son **de solo lectura**: el agente consulta y responde, no toca
nada.

## 2. Entiende los modos de operación

Cada conversación y cada tarea corren en un modo, y el modo decide qué puede
hacer el agente:

| Modo | Qué puede hacer | Cuándo usarlo |
|------|-----------------|---------------|
| **Plan** | Solo leer y proponer. No abre ni cierra nada. | Siempre que estés explorando o aprendiendo |
| **Trading** | Ejecutar, pero contigo delante | Cuando quieres que actúe y poder frenarlo |
| **Autónomo** | Ejecutar sin supervisión, dentro de tus reglas | Tareas programadas ya rodadas |

:::caution
Empieza siempre en **Plan**. Pasa a **Trading** cuando ya reconozcas el tipo de
decisiones que toma tu agente, y a **Autónomo** solo con reglas de riesgo que
hayas comprobado.
:::

## 3. Pídele que actúe

Cuando estés en modo Trading, el agente ejecuta lo que le pidas dentro de los
límites del portfolio:

- *"Analiza el pool de señales y abre las dos mejores oportunidades de esta
  semana."*
- *"Cierra la posición de TEST si pierde un 3 %."*
- *"Reduce a la mitad la exposición a tecnología."*
- *"Rebalancea la cartera hacia sectores defensivos."*

El agente te explica **qué va a hacer y por qué** antes de hacerlo. Si la
instrucción choca con las reglas de riesgo del portfolio, lo dice en lugar de
saltárselas.

## 4. Crea tus propios agentes en el Playground

En el **Playground** (Premium) defines agentes a medida:

- **System prompt** — Cómo piensa, qué prioriza, qué evita. Aquí es donde se nota
  la diferencia entre un agente conservador y uno agresivo.
- **Modelo** — Qué LLM lo mueve. Puedes usar los créditos incluidos o conectar tu
  propia cuenta de [OpenRouter o DeepSeek](../../pillars/integrations/).
- **Herramientas** — Qué puede invocar: consultar cartera, leer señales, abrir o
  cerrar órdenes, pedir datos de mercado.
- **Portfolio asignado** — Sobre qué cartera trabaja.

Un buen system prompt es específico. Compara:

> ❌ "Eres un agente de trading. Gana dinero."

> ✅ "Gestionas una cartera de ETFs sectoriales con horizonte de 2 a 6 semanas.
> Priorizas la preservación de capital: no abres más de tres posiciones
> simultáneas ni destinas más del 20 % del capital a una sola. Descartas señales
> con menos de 48 horas de histórico. Explicas siempre el motivo de cada cierre."

## 5. Delega en sub-agentes

Un agente principal puede apoyarse en **sub-agentes** especializados: uno que
analice el sector tecnológico, otro que revise el riesgo de la cartera, otro que
prepare un rebalanceo.

El agente principal reparte el trabajo y consolida las respuestas. Es la forma de
tener criterios distintos conviviendo sin meterlos todos en un mismo prompt
imposible de mantener.

Las ediciones del [Benchmark](../../benchmark/) enfrentan precisamente a
sub-agentes: mismo capital, misma ventana, distinto modelo y distinto prompt.

## 6. Automatiza

Cuando una rutina funcione en el chat, conviértela en una tarea programada:
[Programar tareas (AgentTask)](../agent-tasks/).

## Qué no hace un agente

- **No opera fuera de las reglas del portfolio.** Los límites de capital por
  posición y las reservas de liquidez mandan sobre cualquier instrucción.
- **No abre órdenes sin Take Profit y Stop Loss.** No hay forma de desactivarlo.
- **No ve tus credenciales.** Usa tokens con permisos acotados, nunca tus claves
  del broker.

## Siguiente paso

- [Programar tareas (AgentTask)](../agent-tasks/)
- [Gestionar el riesgo](../risk/)
