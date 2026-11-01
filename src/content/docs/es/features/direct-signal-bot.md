---
title: Direct Signal Bot
description: Deja que los bots en los que confías abran sus señales en tu portfolio por sí solos. Sin agente, sin créditos, y con todas las comprobaciones de tu portfolio intactas.
---

Un bot en el que confías encuentra una señal. Hoy alguien tiene que decidir si
la toma: tu agente de IA, que gasta créditos cada vez que piensa, o tú, pulsando
**Open Order** en el Signal Pool.

**Direct Signal Bot** elimina ese paso. Eliges, para un portfolio, los bots
cuyas señales ya te convencen, y desde ese momento cada señal nueva de esos bots
se abre en ese portfolio por sí sola — pasando exactamente por las mismas
comprobaciones que si hubieras pulsado el botón tú mismo.

Es **gratis**: no se llama a ningún modelo, así que no gasta créditos. Y está
**apagado hasta que tú lo enciendes**.

## Las dos rutas de una señal

<figure>
<svg viewBox="0 0 760 300" role="img" aria-labelledby="dsb-rutas-title" style="width:100%;height:auto">
  <title id="dsb-rutas-title">La señal de un bot llega al Signal Pool y, si Direct Signal Bot está activo, se abre sola en tu portfolio</title>
  <style>
    .dsb-box{fill:none;stroke:currentColor;stroke-width:1.5;rx:8}
    .dsb-t{fill:currentColor;font:13px ui-sans-serif,system-ui,sans-serif}
    .dsb-s{fill:currentColor;font:11px ui-sans-serif,system-ui,sans-serif;opacity:.75}
    .dsb-l{stroke:currentColor;stroke-width:1.5;fill:none;marker-end:url(#dsb-arrow-es)}
    .dsb-dash{stroke-dasharray:5 4}
  </style>
  <defs>
    <marker id="dsb-arrow-es" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
  </defs>

  <rect class="dsb-box" x="8" y="118" width="130" height="58" rx="8"/>
  <text class="dsb-t" x="26" y="142">Tu bot</text>
  <text class="dsb-s" x="26" y="160">lanza una señal</text>

  <path class="dsb-l" d="M 142 147 H 196"/>

  <rect class="dsb-box" x="200" y="118" width="130" height="58" rx="8"/>
  <text class="dsb-t" x="222" y="142">Signal Pool</text>
  <text class="dsb-s" x="222" y="160">siempre, como hoy</text>

  <path class="dsb-l" d="M 334 132 C 370 132 370 60 396 60"/>
  <rect class="dsb-box dsb-dash" x="400" y="30" width="170" height="60" rx="8"/>
  <text class="dsb-t" x="418" y="54">Decide el agente</text>
  <text class="dsb-s" x="418" y="72">gasta créditos</text>

  <path class="dsb-l" d="M 334 162 C 370 162 370 238 396 238"/>
  <rect class="dsb-box" x="400" y="208" width="170" height="60" rx="8"/>
  <text class="dsb-t" x="418" y="232">Direct Signal Bot</text>
  <text class="dsb-s" x="418" y="250">gratis, sin agente</text>

  <path class="dsb-l" d="M 574 60 C 604 60 604 132 626 132"/>
  <path class="dsb-l" d="M 574 238 C 604 238 604 162 626 162"/>

  <rect class="dsb-box" x="630" y="118" width="122" height="58" rx="8"/>
  <text class="dsb-t" x="646" y="142">Tus controles</text>
  <text class="dsb-s" x="646" y="160">y luego la orden</text>
</svg>
<figcaption>Por la ruta que vaya, una señal pasa por los mismos controles antes de convertirse en posición.</figcaption>
</figure>

El pool no cambia. Tus agentes siguen viendo todas las señales y tú sigues
pudiendo abrir una a mano. Lo que añade Direct Signal Bot es un tercer actor que
nunca duda — para los bots que hayas elegido.

## Por qué usarlo

- **No cuesta nada ejecutarlo.** No se llama a ningún modelo, así que tus
  créditos se quedan para el trabajo que exige criterio.
- **No duerme.** Una señal a las 3 de la mañana se toma a las 3 de la mañana,
  sin necesidad de un agente programado y despierto.
- **Mantiene todos tus límites.** Tu sizing, tu máximo por orden, el cooldown
  tras pérdidas, tus listas de símbolos, el reloj del mercado, el efectivo real
  de tu bróker: no se salta nada. Es el mismo camino que el botón **Open Order**.
- **Conservas el veto.** Con *Wait before to Open Orders* activo —lo está por
  defecto— cada orden automática sigue esperando tu aprobación con su cuenta
  atrás.

Y la parte honesta: **no piensa**. Toma todas las señales de esos bots que tus
reglas permitan. No lee noticias, no juzga el régimen de mercado y no equilibra
tu exposición. Ése es el intercambio, y por eso conviene apuntarlo a bots cuyo
historial ya hayas visto.

## Cómo activarlo

1. En la barra lateral, pulsa el portfolio que quieras. Se abre su vista.
2. Pulsa el botón **⚙ engranaje** de arriba, **Portfolio Settings**.
3. Abre la pestaña **Signals**. La tarjeta **Direct Signal Bot** está justo
   debajo de *Signal sources*.
4. Pulsa el **✎ lápiz** junto a **Bots** y elige los bots cuyas señales deben
   abrirse solas (hasta 20). Pulsa **Save changes**.
5. El interruptor **Open signals automatically** se activa con tu selección y la
   etiqueta de la tarjeta pasa a **Active**.

El interruptor no tiene botón de guardar: cada cambio se guarda al hacerlo.

| Ajuste | Cómo se cambia | Qué significa |
|--------|----------------|---------------|
| **Open signals automatically** | Mueve el interruptor. | Activo, cada señal nueva de los bots elegidos se abre aquí. Apagado, las señales solo llegan al pool y a tus agentes. |
| **Bots** | **✎ lápiz** → elegir → **Save changes** | Los bots que se abren solos. Guardar una lista vacía apaga el automatismo. |

:::note
La tarjeta aparece solo en los portfolios que operas tú. Un portfolio de bot
produce señales; no las consume.
:::

Si el portfolio tiene una **suscripción de BotConfigs** en *Signal sources*,
aquí solo se pueden elegir esos bots: un bot que no alimenta al portfolio nunca
produciría una señal para él.

## Qué pasa con cada señal

1. El bot abre su señal y aparece en el Signal Pool, como siempre.
2. Para cada portfolio que haya listado ese bot, la señal pasa por tus
   controles: una posición ya abierta de ese bot y símbolo, la antigüedad de la
   señal, el reloj del mercado, el cooldown tras pérdidas consecutivas, tu
   sizing, el capital que tu bróker tiene de verdad y el precio en vivo.
3. El capital lo pone el asignador de tu portfolio — el sizing de la propia
   estrategia del bot, sobre la equity de tu bróker si el portfolio tiene
   cuenta. **Si no se puede asignar capital, no se abre nada.** El automatismo
   nunca se inventa un importe.
4. Con *Wait before to Open Orders* activo, la orden aparece como **En espera de
   aprobación** con su cuenta atrás. Si no, va al mercado directamente.
5. A partir de ahí es una posición tuya normal: la protegen el stop loss, el
   take profit y el time stop del bot, y tú (o tu agente) puedes cerrarla cuando
   quieras.

## Cómo leer el resultado

La tarjeta lista las **últimas aperturas automáticas**, cada una con lo que pasó:

| Lo que ves | Qué significa |
|---|---|
| **Opened** + importe | la posición está abierta |
| **Waiting for your approval** | está en tus notificaciones con su cuenta atrás |
| **Not opened** + motivo | una de tus propias reglas la paró |
| **Failed** | un problema técnico; no se reintenta |

Los motivos más habituales de *Not opened*, y qué hacer:

| Motivo | Qué significa | Qué hacer |
|---|---|---|
| ya tienes una posición de ese símbolo y ese bot | la guarda de duplicados | nada: es justo para esto |
| la señal es más antigua que tu límite | *Signal sources* → antigüedad máxima | súbelo si tu estrategia es lenta |
| el mercado está cerrado | acciones fuera de sesión | nada; la señal pertenece a su sesión |
| el sizing no permite más posiciones | tu sizing y tu máximo de posiciones | revísalos en **Risk & Capital** |
| el portfolio está en cooldown | viene de pérdidas consecutivas | es deliberado: se pasa solo |
| no hay capital disponible | el asignador no asignó nada | añade capital o revisa el máximo por orden |
| tu bróker rechazó el tamaño | efectivo o poder de compra real | revisa la cuenta del bróker |

## Conviene saber

- **Nunca cierra una posición.** Las salidas siempre son el stop loss, el take
  profit o el time stop del bot. El automatismo no liquida nada.
- **No persigue.** Una señal rechazada por un control —o que llegó con el
  mercado cerrado— no se reintenta más tarde.
- **Tus agentes lo saben.** Un agente que lee el portfolio ve qué bots se abren
  solos, así que no gasta un turno decidiendo algo ya decidido.
- **Empezar por un bot es la forma segura.** Arranca con un único bot en
  producción cuyo historial hayas visto, deja *Wait before to Open Orders*
  activo los primeros días y fija tu máximo por orden a conciencia: el
  automatismo lo usará entero.
- **Es por bot, no por símbolo.** Para aceptar solo algunos símbolos de un bot,
  usa la lista blanca de símbolos del portfolio, en *Signal sources*.
- **No es [Connect Trader Agent](/es/guides/copy-trader/).** Aquél replica las
  operaciones del agente de otra persona; éste sigue las señales de un bot con
  tu propio sizing.

## ¿Direct Signal Bot, un agente, o los dos?

| | Direct Signal Bot | Agente de IA |
|---|---|---|
| Decide | nada: toma todas las señales permitidas de tus bots | cada señal, con noticias, contexto y memoria |
| Coste | gratis | créditos por ejecución |
| Reacciona | al instante, 24/7 | cuando está programado o lo despierta un evento |
| Ideal para | bots en los que ya confías | elegir entre muchas señales, decisiones con criterio |

Conviven en el mismo portfolio: el automatismo toma las señales de los bots que
elegiste y tu agente gasta sus turnos en todo lo demás.
