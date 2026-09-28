---
title: Telegram
description: Recibe las notificaciones de TredOps en Telegram, aprueba o descarta una posición desde el móvil y habla con tu agente desde el chat.
---

Telegram lleva TredOps a tu bolsillo. Con el chat vinculado, las notificaciones que ya ves en el dashboard llegan a tu móvil, una posición que espera tu aprobación llega con los botones **Approve** y **Reject**, y cualquier mensaje que escribas va a tu agente de TredOps, el mismo con el que hablas en el chat del dashboard.

Tú eliges qué llega al chat: qué portfolios y qué tipos de eventos. Lo demás se queda en el dashboard.

## Conectarlo

1. **Dashboard → Integraciones → ⊕ → Telegram.** Aparece un código QR junto a un enlace **Open in Telegram**.
2. Escanea el QR con el móvil, o pulsa el enlace si tienes Telegram en el dispositivo que estás usando. Telegram abre el chat con el bot de TredOps y envía el código de vinculación por ti al pulsar **Start**.
3. El diálogo detecta la vinculación solo y pasa al paso de preferencias. Elige portfolios y eventos, pulsa **Save** y listo. El bot te saluda con un resumen de lo que va a enviarte.

El QR vale diez minutos y se usa una sola vez. Si caduca, pulsa **Generate a new link**. Un chat de Telegram solo puede vincularse a una cuenta de TredOps, y una cuenta a un solo chat.

:::tip
Si abres el chat del bot a mano y solo ves "This chat is not linked to a TredOps account yet", vuelve al dashboard y usa el QR o el enlace: el código que vincula tu cuenta viaja con ellos, no con un `/start` escrito por ti.
:::

## Qué llega a tu chat

Abre **Preferences** en el menú ⋯ de la fila de Telegram, o expande la fila, para cambiarlo cuando quieras.

| Ajuste | Significado |
|--------|-------------|
| **Portfolios** | *All portfolios*, o solo los que marques. Una notificación de un portfolio no marcado nunca llega a Telegram, aunque su tipo de evento esté activo. |
| **Events** | Los tipos de notificación que quieres: posición abierta o cerrada, señales de bots, calibraciones, tareas de agentes, alertas de TradingView, facturación y errores. |
| **Admin events** | Solo para administradores: incidencias de la plataforma reportadas por los agentes. |
| **Chat mode** | Cómo responde tu agente desde Telegram: **plan** analiza y recomienda sin operar; **trading** puede abrir y cerrar posiciones como en el dashboard. Cambiar a trading pide confirmación. |

El dashboard sigue mostrándolo todo independientemente de estos ajustes; solo deciden qué se reenvía a Telegram.

## Aprobar una posición desde el móvil

Si un portfolio tiene activado [**Wait before to Open Orders**](/es/features/wait-to-open/), cada posición nueva nace *pendiente de aprobación* y la notificación que recibes lo dice:

- el símbolo, el portfolio, la dirección y el precio,
- cuánto falta para la decisión automática y cuál es esa decisión (**Open** o **Skip**),
- dos botones, **✅ Approve** y **❌ Reject**,
- **Open in Signal Pool**, que abre esa señal sola en el dashboard, con su gráfico y sus botones Approve y Reject.

Pulsa Approve para abrir la posición ya, o Reject para descartarla. El mensaje se actualiza solo con el resultado, y hace lo mismo si decides desde el dashboard o si el contador termina antes. Una posición ya decidida no se puede decidir dos veces: el bot te lo indica.

`/pending` lista todas las posiciones que esperan tu decisión, con los mismos botones.

## Hablar con tu agente

Escribe lo que quieras en el chat y tu agente de TredOps responde con las mismas herramientas y la misma memoria que en el dashboard: tus portfolios, el Signal Pool, los datos de mercado y la conversación anterior. Mientras trabaja ves un mensaje **Thinking…** que va contando el tiempo y se convierte en la respuesta cuando está lista. Un análisis largo puede tardar unos minutos.

Cada respuesta termina con una línea de coste: los créditos que ha usado y cuántos te quedan, o *Own API key* cuando el agente corre con una clave de proveedor tuya. Si te quedas sin créditos el bot lo dice y te lleva a la página de créditos.

## Comandos

| Comando | Qué hace |
|---------|----------|
| `/status` | Tu vínculo y las preferencias actuales |
| `/pending` | Posiciones que esperan tu aprobación |
| `/portfolios` | Elegir los portfolios que te avisan |
| `/events` | Elegir los eventos que te avisan |
| `/mode` | Modo del chat del agente, plan o trading |
| `/prompt` | El prompt del agente usado desde Telegram |
| `/stop` | Cancelar la respuesta en curso y lo que esperaba detrás |
| `/clear` | Olvidar la conversación y empezar de cero |
| `/unlink` | Desconectar este chat |
| `/help` | La lista de comandos |

## Desconectar

Desde el dashboard, el menú ⋯ de la fila de Telegram ofrece **Unlink**; desde el chat, `/unlink` hace lo mismo. En ambos casos el bot deja de enviar mensajes al instante y el permiso que tenía para actuar por ti queda revocado. Nada más cambia: tus notificaciones, posiciones e historial siguen en el dashboard. Puedes volver a vincular cuando quieras.

## Conviene saber

- Solo funciona un chat privado con el bot. Grupos y canales se ignoran.
- Todo lo que el bot hace por ti lo hace con tu propia cuenta y tus propios permisos. No puede aprobar una posición que no sea tuya ni leer los portfolios de otro usuario.
- Los mensajes de Telegram tienen un límite de longitud; una respuesta larga llega en varios mensajes, en orden.
- El bot nunca pide contraseñas, claves ni códigos en el chat, y nunca lo hará. El único código que necesita viaja dentro del enlace del QR.
