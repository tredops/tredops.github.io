---
title: Trade setups
description: Escribe la operación antes de que el precio llegue. Niveles, stop, take profit y escenarios alternativos que la plataforma vigila por ti y ejecuta como tus propias órdenes.
---

Un **trade setup** es lo que un trader disciplinado deja escrito antes de que el
precio llegue: *si cierra por encima de 200,3 entro largo con 300 USD y el stop en
195,3; si pierde 192 entro corto en su lugar; entre los dos niveles no hago nada;
válido tres días.*

Lo escribes una vez, con tus palabras, en el chat. A partir de ahí la plataforma
vigila el símbolo, dispara la regla que se cumple, abre la posición como una orden
tuya más y la protege con el stop y el take profit que pediste. A ti se te avisa
cuando pasa algo de verdad. Esperar no te cuesta nada.

Un setup no es una señal de un bot. Detrás no hay calibración, solo tus niveles.
Ahí está su fuerza — decides tú la operación — y su riesgo — nadie la ha validado.

## Crear uno desde el chat

Abre el **chat** del dashboard, escribe `/` y elige **trade-setup** (ver
[Skills de agente](/es/features/skills/)), y describe la operación:

```
En BTC, si cierra por encima de 103.500 entra largo 300 USD con el stop por
debajo de 101.800 y take profit en 108.000. Evalúalo cada 30 minutos, válido 5 días.
```

El agente lee primero la estructura real del símbolo — los niveles y cuántas veces
han sido tocados, el rango medio, la tendencia, los extremos del día y de la
semana anterior —, después convierte tu frase en reglas, normalmente las simula
sobre el histórico reciente y deja el setup armado. Te devuelve los niveles que
escribió, el intervalo que eligió y cuándo caduca.

:::tip
Di qué invalida la operación, no solo qué la dispara. *«Si pierde 101.800 estoy
equivocado»* se convierte en el stop, y el agente lo pondrá en un nivel en lugar
de en un porcentaje redondo.
:::

## Elegir el intervalo de evaluación

Es la decisión que más gente se salta y luego lamenta. Un setup tiene **un solo
intervalo**, y es lo único que conviene decir de forma explícita: es a la vez la
vela sobre la que se leen las reglas y la vela con la que se vigila la posición
abierta.

| Si dices | Obtienes |
|----------|----------|
| «cada 30 minutos» | reacción rápida, más ruido, stops que necesitan aire |
| «cada hora» | el valor por defecto, bien para la mayoría de swing |
| «cada 4 horas» o «cada 6 horas» | swing más amplio, menos rupturas falsas — típico en crypto |
| «al cierre diario» | una lectura al día, a las horas que nombres |

El crypto cotiza a todas horas, así que ahí una malla de 30 minutos o de 6 horas
tiene sentido. Una acción solo se lee durante su sesión regular, así que un
intervalo por debajo de una hora aporta poco. Si no lo dices, el agente elige
cada hora y te lo indica.

Dos cosas que conviene tener presentes. Un nivel tocado unos segundos entre dos
lecturas puede perderse, mientras que una ruptura que aguanta hasta el cierre de
la vela no. Y el intervalo que elijas no tiene nada que ver con los intervalos que
usan tus bots: un setup no tiene un bot detrás.

## De los niveles a las reglas

Cada regla es una condición sobre el precio y qué hacer cuando se cumple:

- **Una ruptura**: la vela cierra por encima de una resistencia, o por debajo de
  un soporte.
- **Un toque**: el máximo o el mínimo de la vela alcanza el nivel, aunque cierre
  de vuelta.
- **Simplemente más allá**: el precio ya está pasado el nivel, sin exigir ruptura.

Puedes pedir que más de una vela cerrada esté de acuerdo antes de que cuente. En
un nivel ruidoso, dos valen el retraso.

Cada regla lleva su propio tamaño y su **stop, que es obligatorio**. El take
profit es opcional, y también lo es un time stop — cerrar una posición que no ha
ido a ningún sitio después de N días.

## Escenarios alternativos

Un setup puede sostener los dos lados del mercado y dejar que el mercado elija:

> Por encima de 103.500 entra largo. Por debajo de 98.000 entra corto en su lugar.
> Lo que pase primero, el otro lado se olvida.

Los dos escenarios son alternativas. El primero que dispara cancela el otro, y la
card te dice que el lado perdedor quedó **descartado**, con el motivo. Esto es un
solo setup, no dos, y por eso no pueden acabar abiertos los dos.

## Escaleras: añadir mientras el movimiento confirma

Una regla puede esperar a que otra se ejecute antes. Así se escribe una entrada
progresiva:

> Por encima de 103.500 abre 300 USD con stop del 2 %. Si además supera 106.000,
> añade otros 300 USD y aprieta el stop de la primera posición al 1 %.

El segundo peldaño está dormido hasta que el primero se ejecuta, así que nunca
puede disparar por su cuenta. Y cuando se ejecuta puede **reproteger lo que ya
está abierto**: apretar el stop, poner o quitar el take profit. Si el primer
peldaño se cancela, es rechazado o caduca, los peldaños de encima caen con él.

Combina las dos cosas y un setup se convierte en una estrategia completa: una
escalera larga, un escenario corto como alternativa, y el lado que dispare
conserva sus peldaños armados mientras el otro se descarta.

## Salidas, incluida «pregúntame»

Además del stop y el take profit puedes añadir salidas por precio propias, con dos
resultados posibles:

- **Cerrar la posición** cuando se alcanza el nivel. El stop del motor siempre
  tiene prioridad, y las salidas son todo o nada — no hay cierres parciales.
- **Despertar al agente** en lugar de cerrar. La posición sigue abierta y el agente
  es llamado una vez, con el mercado delante, para decidir: fijar el take profit,
  añadir un peldaño, poner una salida de protección bajo el último mínimo, o no
  hacer nada.

La segunda existe para el caso en que fijar hoy un take profit sería adivinar. Es
también la respuesta a la situación incómoda en la que el mercado ha seguido tu
plan, el último size ya ha entrado y nada dice por dónde salir.

## Leer la card

Tus setups armados viven en **Positions**, junto a tus posiciones abiertas. La
card muestra el símbolo, el lado o los lados, el intervalo de evaluación, la
caducidad y cada regla con su estado:

| Estado | Significado |
|--------|-------------|
| **Armada** | esperando su nivel |
| **En espera** | un peldaño cuyo predecesor aún no se ha ejecutado |
| **Ejecutada** | abrió una posición, y la card enlaza con ella |
| **Descartada** | ganó el escenario alternativo, o ya había una posición abierta |
| **Rechazada** | se alcanzó el nivel pero la ejecución fue rechazada |
| **Caducada** | la ventana se cerró sin que se alcanzara el nivel |

Una regla ejecutada muestra un badge que te lleva a la posición que abrió, y la
card de la posición lleva un badge de vuelta al setup que la creó. El gráfico
respeta el número de velas que elegiste en el filtro del header, así que lo que
ves alrededor de los niveles es la misma ventana que usas en el resto del
dashboard.

## Seguimiento

El setup se ejecuta solo, y recibes una notificación cuando dispara, caduca, es
rechazado o cierra. Si quieres que un **agente** reaccione en lugar de solo
enterarte, dale al portfolio una tarea que escuche los eventos de setup — ver
[Programar tareas](/es/guides/agent-tasks/). El agente lee entonces el setup y el
mercado y decide lo que el evento pide: replantear los niveles, tomar el
beneficio, retirarse.

También puedes preguntar en el chat cuando quieras: *«¿cómo va mi setup de BTC?»*

## Qué se aplica a las órdenes de un setup

Un setup abre órdenes reales en tu portfolio, así que todo lo que tengas
configurado sigue aplicándose:

- **Tus límites de riesgo.** Los topes de tamaño de orden, el capital máximo, el
  límite de posiciones abiertas y los demás guardas del portfolio se comprueban en
  el momento en que la regla dispara, contra tu capital real. Una regla bloqueada
  así simplemente se vuelve a leer en la siguiente vela.
- **[Wait before to Open Orders](/es/features/wait-to-open/).** Si el portfolio lo
  tiene activo, la orden disparada espera tu aprobación como cualquier otra.
- **Las copias y las notificaciones** se comportan igual que con una orden de bot.
- **Los cortos** necesitan un activo que se pueda prestar. El crypto no se puede
  poner corto.

:::caution
Un setup activo por símbolo y portfolio. Si pides un segundo sobre un símbolo que
ya tiene uno, el agente actualizará o cancelará el existente en lugar de apilar
dos planes contradictorios sobre el mismo precio.
:::

## Buenas costumbres

- **Déjalo caducar.** Una tesis vale días, no un trimestre. Por defecto son tres
  días y el máximo son treinta. Un setup que caduca una y otra vez sin disparar te
  está diciendo que el nivel está mal, y eso es información útil.
- **Pon el stop en un nivel, no en un número redondo**, y dale más aire que una
  vela normal de tu intervalo. Un stop dentro del ruido lo caza el ruido.
- **Cambia una cosa a la vez** cuando estés aprendiendo: compara dos setups que se
  diferencien en el stop *o* en el nivel, no en los dos.
- **No ensanches un stop para «dar aire» a la operación.** Si la invalidación ya ha
  ocurrido, cancela el setup y cierra.

## Desde tu propio cliente MCP

Todo lo anterior está disponible por [TredOps MCP](/es/integrations/tredops-mcp/)
si prefieres manejarlo desde tu propio agente: crear, simular, consultar,
actualizar y cancelar setups, con las mismas reglas y los mismos límites.
