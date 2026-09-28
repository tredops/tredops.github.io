---
title: Wait before to Open Orders
description: Ten la última palabra antes de que se abra una posición. Cada orden nueva espera tu aprobación, con una cuenta atrás y una decisión automática si no respondes.
head:
  - tag: meta
    attrs:
      property: og:image
      content: https://docs.tredops.com/features/waitBeforeToOpen.jpg
  - tag: meta
    attrs:
      name: twitter:image
      content: https://docs.tredops.com/features/waitBeforeToOpen.jpg
  - tag: meta
    attrs:
      property: og:image:alt
      content: "Wait before to Open Orders: el agente propone, tú decides"
  - tag: meta
    attrs:
      property: og:image:width
      content: '1536'
  - tag: meta
    attrs:
      property: og:image:height
      content: '1024'
  - tag: meta
    attrs:
      name: twitter:image:alt
      content: "Wait before to Open Orders: el agente propone, tú decides"
---

![Wait before to Open Orders: el agente propone, tú decides](/features/waitBeforeToOpen.jpg)

Tu agente puede encontrar una oportunidad en cualquier momento, pero quizá
quieras decidir tú antes de que tu dinero entre en ella. **Wait before to Open
Orders** te da exactamente eso: cada posición nueva del portfolio espera tu
aprobación antes de llegar al mercado.

Cuando una posición está a punto de abrirse, recibes una notificación con una
cuenta atrás y dos botones, **Approve** y **Reject**. Decides tú, o dejas que
decida la cuenta atrás con la regla que elegiste de antemano.

## Para qué sirve

- **Mantienes el control del dinero real.** El agente hace el análisis y
  propone la operación; tú la confirmas. Es especialmente útil en un portfolio
  conectado a una cuenta real del broker.
- **No se pierde nada si no estás.** Si no respondes a tiempo, se aplica la
  decisión automática: abrir la posición igualmente o descartarla.
- **Se adapta a tu ritmo.** La espera va de un minuto a un día entero.

## Cómo funciona

1. Tu agente, una alerta de TradingView o tú decidís abrir una posición.
2. En lugar de ir al mercado, la posición se crea como **Awaiting approval**
   (pendiente de aprobación).
3. Aparece una notificación **Approve position?** con el símbolo, la dirección,
   el precio y una cuenta atrás, **Auto-decision in**.
4. Pulsas **Approve** para abrirla ya, o **Reject** para descartarla.
5. Si la cuenta atrás termina sin respuesta, se aplica la decisión automática.

La notificación se actualiza sola a **Position Opened** o **Position Skipped**,
así que siempre ves cómo terminó.

## Activarla y configurarla

Está **activada por defecto** en tus portfolios, con una espera de cinco
minutos y **Open position** como decisión automática. Puedes cambiarla en cada
portfolio cuando quieras desde los ajustes del portfolio.

### Cambiarla desde los ajustes del portfolio

1. En la barra lateral, pulsa el portfolio que quieres cambiar. Se abre su
   vista.
2. Arriba de la vista, pulsa el botón del **⚙ engranaje**, con la etiqueta
   **Portfolio Settings**.
3. Baja hasta la tarjeta **Wait before to Open Orders**.
4. Cambia lo que necesites. No hay botón de guardar: cada cambio se guarda en
   cuanto lo haces y aparece un breve mensaje de confirmación.

La tarjeta tiene tres ajustes:

| Ajuste | Cómo se cambia | Qué significa |
|--------|----------------|---------------|
| **Ask me before opening an order** | Mueve el interruptor. | Activado, cada posición nueva te espera. Desactivado, las posiciones se abren al momento. |
| **Wait** | Escribe los minutos y pulsa Enter o haz clic fuera de la casilla. | El tiempo que tienes para decidir, de 1 minuto a 24 horas. Por defecto, 5. |
| **Automatic decision if not manually approved** | Pulsa **Open position** (abrir) o **Skip position** (descartar). | Qué pasa si termina la cuenta atrás y no has respondido. |

La espera siempre se escribe en minutos. Algunos valores útiles:

| Quieres | Escribe |
|---------|---------|
| 5 minutos | `5` |
| 30 minutos | `30` |
| 1 hora | `60` |
| 4 horas | `240` |
| 24 horas | `1440` |

Un número menor que 1 se queda en 1, y uno mayor que 1440 se queda en 1440.

Con el interruptor desactivado, los otros dos ajustes aparecen en gris pero
conservan sus valores, así que al volver a activarlo recuperas tu última
elección.

El mensaje de confirmación te dice qué ha cambiado, por ejemplo *New orders
now wait 5 min for your approval*, *New orders open immediately* o *Unanswered
orders will be skipped*. Si en su lugar ves un error, no se ha guardado nada:
inténtalo de nuevo.

:::note
La tarjeta solo aparece en los portfolios que supervisas tú. Si no la ves, ese
portfolio no usa el paso de aprobación.
:::

Al crear un portfolio nuevo, el asistente muestra la misma elección en un paso
opcional, **Approval**, justo antes de la revisión final. El portfolio rápido
que se crea con un clic empieza siempre con cinco minutos y **Open position**.

### Qué decisión automática elegir

- **Open position** es para cuando confías en el agente y solo quieres poder
  frenar una operación. Si se te pasa la notificación, la operación se hace.
- **Skip position** es para cuando nada debe abrirse sin tu sí explícito. Si
  se te pasa la notificación, la operación no se hace.

## Dónde puedes decidir

- **El panel de notificaciones** del dashboard, con la cuenta atrás y los
  botones Approve y Reject.
- **El Signal Pool**, que muestra la señal en espera con su gráfico y los
  mismos dos botones.
- **Telegram**, desde el móvil. Con la
  [integración de Telegram](/es/integrations/telegram/) vinculada, la
  notificación llega a tu chat con los botones **Approve** y **Reject**, y el
  comando `/pending` lista todas las posiciones que esperan tu decisión.

Decidas donde decidas, los demás sitios se actualizan con el resultado. Una
posición solo se decide una vez: si ya se aprobó, se rechazó o la decidió la
cuenta atrás, volver a pulsar un botón no hace nada.

## Qué pasa después de tu decisión

**Cuando una posición se abre**, la hayas aprobado tú o la cuenta atrás, se
abre al **precio de mercado de ese momento**, no al precio de la señal que la
creó. La cantidad se recalcula con ese precio. En un portfolio conectado a una
cuenta real del broker, la orden se envía al broker en ese momento y es su
ejecución la que fija el precio final.

**Cuando una posición se descarta**, queda como **Cancelled** y no se compra ni
se vende nada. Tu capital vuelve a estar libre. El agente puede proponer la
misma idea más adelante si sigue teniendo sentido.

## Mientras una posición espera

- **Tu capital queda reservado.** El importe de la posición en espera se
  aparta, para que el agente no pueda gastarlo dos veces en otra cosa.
- **Sin duplicados.** Si la misma señal vuelve a llegar mientras una espera, no
  se crea una segunda posición.
- **El stop loss y el take profit empiezan al abrirse.** Una posición en espera
  aún no está en el mercado, así que no tiene protección que vigilar ni cuenta
  en tus ganancias y pérdidas.
- **La encuentras en Orders.** Las posiciones en espera aparecen como
  **Awaiting approval** en la pestaña **Pending**. Las descartadas aparecen como
  **Cancelled** en la pestaña **Closed**.
- **Tu agente lo sabe.** Al agente se le indica que la posición espera tu
  decisión. No lo trata como un error ni intenta abrirla de nuevo.

## Qué espera y qué no

| Origen de la posición | ¿Espera? |
|-----------------------|----------|
| Tu agente de IA | Sí |
| Una posición que abres tú | Sí |
| Una alerta de [TradingView](/es/integrations/tradingview/) | Sí |
| Una copia de [Connect Trader Agent](/es/guides/copy-trader/) en un portfolio seguidor | No, las copias nunca se retrasan |

Dos detalles que conviene saber:

- **Alertas de TradingView.** Otra alerta en la misma dirección mientras una
  posición espera no abre una segunda. Una alerta de cierre, o una en la
  dirección contraria, descarta la posición en espera.
- **Agentes que otros copian.** Si tu portfolio se copia con Connect Trader
  Agent, los seguidores copian una posición solo cuando de verdad se abre. Una
  posición descartada nunca les llega.

## Conviene saber

- El ajuste es de cada portfolio. Puedes tenerlo activado en el portfolio de tu
  cuenta real y desactivado en uno donde estás probando.
- Desactivar la espera solo afecta a las posiciones nuevas. Las que ya esperan
  mantienen su cuenta atrás: decide sobre ellas como siempre, o deja que
  termine.
- Si cambias la decisión automática, las posiciones que ya esperan siguen la
  nueva cuando termina su cuenta atrás.
- Una espera larga es segura pero puede hacerte perder movimientos rápidos: la
  posición se abre al precio del momento en que apruebas, que puede ser distinto
  del precio cuando apareció la señal.
