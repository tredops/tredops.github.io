---
title: Playground
description: Crea agentes y sub-agentes propios con tu system prompt, tu modelo y tus herramientas, y ponlos a gestionar un portfolio.
---

El **Playground** (también llamado *ExpertMode*) es donde dejas de usar los
agentes que mantiene TredOps y construyes los tuyos. Un agente creado aquí no es
una demo: se asigna a un portfolio y gestiona posiciones reales con las mismas
reglas de riesgo que cualquier otro.

Está disponible en el plan **Premium** y, de forma temporal, en la
[prueba Premium](../../pricing/).

## Qué defines en un agente

| Pieza | Qué decide |
|-------|-----------|
| **System prompt** | Cómo piensa: qué prioriza, qué evita, cuándo actúa y cuándo se queda quieto |
| **Modelo** | Qué LLM lo mueve, de los disponibles o de tu proveedor conectado |
| **Herramientas** | Qué puede invocar: leer cartera, leer señales, pedir datos de mercado, abrir o cerrar órdenes |
| **Portfolio** | Sobre qué cartera trabaja |
| **Tipo** | Agente principal, o **sub-agente** al que otro delega |

## El system prompt es el 80 % del resultado

Dos agentes con el mismo modelo y las mismas herramientas se comportan de forma
completamente distinta según cómo estén escritos. Un prompt vago produce un
agente que da vueltas, gasta créditos y no decide.

> ❌ "Eres un agente de trading. Busca oportunidades y gana dinero."

> ✅ "Gestionas una cartera de ETFs sectoriales con horizonte de 2 a 6 semanas.
> Priorizas la preservación de capital sobre la rentabilidad: no abres más de
> tres posiciones simultáneas ni destinas más del 20 % del capital a una sola, y
> nunca tienes dos posiciones del mismo sector. Descartas señales con menos de
> 48 horas de histórico. Antes de abrir, compruebas la liquidez disponible.
> Explicas siempre el motivo de cada apertura y de cada cierre."

Lo que separa uno del otro:

- **Un horizonte temporal.** Sin él, el agente no sabe si una posición de tres
  días va bien o va mal.
- **Límites numéricos.** "Prudente" no significa nada; "máximo 20 % por
  posición" sí.
- **Criterios de descarte.** Qué **no** debe tocar, que es lo que más se olvida.
- **La obligación de explicarse.** Un agente que justifica sus decisiones es un
  agente que puedes auditar y corregir.

## Sub-agentes: repartir el criterio

Un agente principal puede apoyarse en **sub-agentes** especializados en lugar de
meterlo todo en un prompt gigante que nadie puede mantener:

- Uno que analice un sector concreto.
- Uno que revise el riesgo de la cartera y proponga recortes.
- Uno que prepare un rebalanceo.
- Uno que filtre el Signal Pool y devuelva solo lo que encaja.

El principal reparte el trabajo y consolida las respuestas. Es la forma de tener
criterios distintos —incluso contradictorios a propósito, como un agente
optimista y otro escéptico— conviviendo sin pisarse.

Las ediciones del [Benchmark](../../benchmark/) enfrentan exactamente a
sub-agentes: mismo capital, misma ventana histórica, distinto modelo y distinto
prompt. Es el mismo mecanismo que tienes en el Playground.

## Cómo llevarlo a producción sin sustos

1. **Escribe el prompt** y asigna el agente a un portfolio, mejor uno nuevo y
   pequeño.
2. **Pruébalo en modo Plan.** Solo lee y propone. Pregúntale qué haría y por
   qué, durante varios días.
3. **Léete sus justificaciones.** Aquí es donde se ven los agujeros del prompt:
   el agente hace algo razonable por un motivo que tú no querías.
4. **Pásalo a Trading.** Ejecuta, pero contigo delante.
5. **Conviértelo en una** [AgentTask](../agent-tasks/) cuando ya reconozcas su
   criterio.

No te saltes el paso 3. Es el barato.

## Los límites siguen ahí

Un agente que has escrito tú **no tiene más permisos** que uno de TredOps:

- No opera fuera de las reglas de riesgo del portfolio. Los límites de capital
  por posición y la reserva de liquidez mandan sobre cualquier instrucción del
  prompt.
- No abre órdenes sin Take Profit y Stop Loss.
- No ve tus credenciales del broker: usa tokens con permisos acotados.
- Consume créditos. Un agente que razona mucho cuesta más que uno que decide
  rápido — ver [Planes y precios](../../pricing/).

Esto es deliberado: el Playground te deja cambiar **el criterio**, no las
protecciones.

## Siguiente paso

- [Trabajar con agentes](../first-agent/) — los modos de operación en detalle.
- [Programar tareas (AgentTask)](../agent-tasks/) — automatizar lo que ya funciona.
- [Copy Trader Agent](../copy-trader/) — usar el agente de otro en vez de escribir
  el tuyo.
