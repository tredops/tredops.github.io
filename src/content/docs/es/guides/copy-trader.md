---
title: Copy Trader Agent
description: Copia automáticamente las operaciones de un agente público con uno de tus portfolios, en proporción a tu capital y sin gastar créditos de LLM.
---

**Copy Trader Agent** es copy trading aplicado a los agentes de TredOps: eliges
un agente público, conectas uno de tus portfolios como seguidor y, a partir de
ese momento, cada operación que abre o cierra ese agente se replica en tu
cartera **en proporción a tu capital**.

Lo encuentras en **Copy Trader Agents** dentro del dashboard.

## Por qué usarlo

Un agente propio decide con un LLM, y eso cuesta créditos en cada evaluación. Un
portfolio seguidor **no usa LLM**: solo replica. Es la diferencia entre pagar
por pensar y pagar por copiar.

Tiene sentido si:

- Quieres resultados sin escribir un system prompt ni afinar un bot.
- Quieres mantener un portfolio con una estrategia que ya funciona mientras
  experimentas en otro.
- El gasto en créditos de un agente propio no te compensa para el tamaño de esa
  cartera.

No tiene sentido si quieres control fino sobre cada decisión. Para eso está el
[Playground](../playground/).

## Agentes Free y Pro

Cada Copy Trader Agent lleva una de dos etiquetas:

- **Free** — abierto a todos los planes, Freemium incluido. Copiarlo **no cuesta
  créditos ni fee de copia**. Es la forma en que una cuenta gratuita sigue
  operando con un agente después de la prueba.
- **Pro** — para cuentas Premium (y durante la prueba gratuita). Son los que
  pagan el fee de copia que se describe más abajo.

Cuántos de tus portfolios pueden copiar a la vez depende de tu plan: uno en
Freemium, sin límite en Premium. Donde un agente Pro o un portfolio extra quede
fuera de tu alcance verás la etiqueta *Pro* y un botón de upgrade, nunca una
petición fallida. Ver [Planes y precios](../../pricing/).

## Elegir un agente

Cada agente publicado muestra, de forma pública y sin retoques:

- **La curva de capital** desde su inicio, con el porcentaje actual.
- **El beneficio de sus últimas operaciones cerradas**, barra a barra.
- **Win rate** y número de operaciones cerradas.
- **Cuántos seguidores** tiene.
- **Todo su historial de órdenes**: símbolo, fechas, precios, tamaño, P&L y el
  motivo de cada cierre.

Entra en el detalle de un agente antes de copiarlo y mira tres cosas que el
porcentaje grande no te cuenta:

| Qué mirar | Por qué |
|-----------|---------|
| **Cuántas operaciones lleva** | Un +30 % con 4 operaciones no dice nada |
| **Su peor racha** | Es lo que vas a tener que aguantar sin cerrar en pánico |
| **Cómo de concentrado opera** | Tres posiciones del mismo sector son una apuesta, no tres |

:::note[Lo que no se publica]
Verás **qué** hizo el agente, no **cómo** lo decide. Los parámetros afinados de
su estrategia y su configuración interna no son públicos: el historial es el
track record, no la receta.
:::

## Empezar a copiar

1. Entra en **Copy Trader Agents** y abre el agente que te interese.
2. Pulsa **Copy** y elige **cuál de tus portfolios** lo va a seguir.
3. Listo. El portfolio seguidor muestra un indicador azul en la barra lateral.

Un portfolio copia **un solo agente a la vez**, pero puedes tener varios
portfolios copiando a agentes distintos —o incluso al mismo—.

## Cómo se calcula tu tamaño de posición

La réplica es **proporcional**, no una copia literal:

> Si el agente destina el 5 % de su equity a una posición, tu portfolio destina
> el 5 % del suyo.

Así que no necesitas tener el mismo capital que el agente que copias. Lo que sí
importa: **si no tienes liquidez suficiente, esa operación se salta**. No se
abre a medias ni se endeuda tu cartera. Queda registrada como omitida, con el
motivo, y recibes una notificación.

## Qué pasa con tus reglas y tus tareas

Esto es lo que más sorprende, así que conviene tenerlo claro de antemano.

**Tus reglas de riesgo se siguen aplicando.** Una réplica pasa por los mismos
controles que cualquier otra orden tuya: límite de capital por posición, reserva
de liquidez, cooldown, filtros de señal. Si uno de ellos la bloquea, la
operación se omite con ese motivo. **Copiar no es ceder el control.**

**Tus AgentTasks del portfolio seguidor se pausan.** Mientras ese portfolio esté
copiando, sus tareas programadas quedan en pausa —tendría poco sentido que un
agente tuyo y el agente copiado se pisaran en la misma cartera—. Al dejar de
copiar se restauran exactamente como estaban. Las tareas que ya tenías
desactivadas no se tocan.

**Toda réplica lleva Take Profit y Stop Loss**, como cualquier orden de TredOps.

## Dejar de copiar

Desde la card del agente o desde los ajustes del portfolio, en un clic.

:::caution[Las posiciones abiertas se quedan]
Dejar de copiar **no cierra** lo que ya está abierto. Esas posiciones siguen
siendo tuyas y las gestiona el Monitoring con su Take Profit y su Stop Loss,
pero ya no llegarán los cierres del agente. Si quieres salir del todo, ciérralas
tú después.
:::

Al dejar de copiar se reactivan las AgentTasks que estaban pausadas.

## Qué cuesta

Un portfolio seguidor no consume créditos por decidir, porque no decide. Copiar
un agente marcado **Free** no cuesta nada en absoluto: ni créditos ni fee, sea
cual sea tu plan.

Copiar un agente **Pro** paga un **fee simbólico**: un porcentaje del consumo de
créditos del agente fuente, y solo en las ejecuciones en las que ese agente
realmente abrió o cerró alguna operación. Por defecto es el **10 %** de lo que
gastó el agente en esa ejecución, y puede estar configurado a cero. Lo ves
desglosado en tu consumo de créditos.

Sale a cuenta frente a un agente propio precisamente porque un agente reparte su
coste entre todos sus seguidores.

## Seguimiento

En los ajustes de tu portfolio seguidor tienes la tabla de replicaciones: qué se
copió, cuándo, con qué tamaño y —cuando algo no se copió— **por qué**. Los
motivos habituales son de negocio, no fallos:

- **Sin liquidez suficiente** — no cabía en tu cartera en ese momento.
- **Tamaño inviable** — la proporción daba una posición demasiado pequeña.
- **Bloqueada por un control tuyo** — una de tus reglas de riesgo la paró.

Recibes una notificación cuando una copia no se ejecuta por un motivo sobre el
que puedes actuar.

:::note[No hay histórico al empezar]
Al empezar a seguir, las posiciones que el agente ya tenía abiertas **no se
copian**. La replicación arranca con sus operaciones nuevas. Por eso, durante
los primeros días verás menos actividad de la que sugiere su historial.
:::

## Siguiente paso

- [Playground](../playground/) — escribir tu propio agente en lugar de copiar uno.
- [Gestionar el riesgo](../risk/) — los límites que siguen mandando mientras copias.
- [Planes y precios](../../pricing/) — cómo funcionan los créditos.
