---
title: Programar tareas (AgentTask)
description: Convierte una rutina del chat en una tarea agéntica que se ejecuta sola, con el alcance y la frecuencia que tú decidas.
---

Una **AgentTask** es una instrucción que un agente ejecuta de forma periódica sin
que tengas que abrir el chat. Es la diferencia entre "reviso la cartera cuando me
acuerdo" y "la cartera se revisa sola cada mañana".

## Cuándo crear una

Una rutina merece ser una tarea cuando cumple tres cosas:

1. **La repites.** Si la haces una vez, hazla en el chat.
2. **Ya la has probado en el chat** y el agente responde como esperas.
3. **Tiene un criterio de parada claro.** "Analiza el mercado" no lo tiene;
   "cierra si la posición pierde un 3 %" sí.

## Crear una tarea

Desde **Agentes → Tareas → Nueva tarea**:

| Campo | Qué define |
|-------|-----------|
| **Agente** | Quién la ejecuta: tu agente principal o un sub-agente especializado |
| **Portfolio** | Sobre qué cartera actúa |
| **Instrucción** | Qué tiene que hacer, en lenguaje natural |
| **Frecuencia** | Cada cuánto despierta |
| **Modo** | Plan (solo informa) o Autónomo (puede ejecutar) |
| **Notificaciones** | Si quieres un aviso en cada ejecución o solo cuando actúe |

Los agentes también pueden crear tareas por su cuenta cuando tú se lo pides
("revisa esto cada lunes"), siempre dentro de los permisos del portfolio.

## Cuatro tareas que merecen la pena

**Resumen diario (modo Plan)**

> Cada día de mercado a las 09:00, resume el estado del portfolio: equity, P&L
> del día, posiciones abiertas con su resultado y cualquier posición que haya
> cerrado en las últimas 24 horas con su motivo.

**Filtro de señales (modo Plan)**

> Cada 4 horas, revisa el Signal Pool y propón las tres mejores oportunidades
> para este portfolio. No abras nada: solo explica por qué cada una encaja.

**Supervisión de riesgo (modo Autónomo)**

> Cada hora, revisa las posiciones abiertas. Si alguna supera el 25 % del capital
> del portfolio, reduce la exposición hasta ese límite. Avísame de cada ajuste.

**Rebalanceo semanal (modo Autónomo)**

> Cada lunes al abrir el mercado, rebalancea la cartera para que ningún sector
> supere el 40 % de la exposición total. No abras posiciones nuevas: solo ajusta
> las existentes.

## Cómo escribir la instrucción

Una buena instrucción responde a cuatro preguntas: **cuándo**, **qué mirar**,
**qué hacer** y **qué no hacer**.

> ❌ "Vigila mi cartera y haz lo que haga falta."

> ✅ "Cada hora, revisa las posiciones abiertas de este portfolio. Si una lleva
> más de 10 días abierta y su P&L está entre −1 % y +1 %, ciérrala y explica por
> qué. No abras posiciones nuevas ni toques las que estén en ganancias."

El "qué no hacer" es la parte que más gente se salta y la que más disgustos
evita.

## Seguimiento

Cada ejecución deja un registro con lo que el agente vio, lo que decidió y lo que
hizo. Puedes revisarlo en el historial de la tarea, incluido el coste en créditos
de cada ejecución.

Si una tarea empieza a comportarse de forma rara, pásala a modo **Plan**: seguirá
informándote sin tocar la cartera mientras ajustas la instrucción.

## Límites

- Las tareas nunca se saltan las reglas de riesgo del portfolio.
- Toda orden abierta por una tarea lleva Take Profit y Stop Loss.
- Puedes pausar o borrar una tarea en cualquier momento; la pausa surte efecto
  antes de la siguiente ejecución.
- Cada ejecución consume créditos de LLM. Una tarea cada 5 minutos consume 12
  veces más que una cada hora, y rara vez decide 12 veces mejor.

## Siguiente paso

- [Gestionar el riesgo](../risk/)
- [Planes y precios](../../pricing/) — cuántos créditos incluye cada plan.
