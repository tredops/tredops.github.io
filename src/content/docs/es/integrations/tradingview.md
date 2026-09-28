---
title: TradingView
description: Envía tus alertas de TradingView a TredOps y opera con stop loss, take profit y supervisión de agentes.
---

TradingView decide cuándo entrar y cuándo salir. TredOps ejecuta esa decisión, protege la posición y la muestra junto a todo lo demás que tienes en marcha.

Tu estrategia de Pine o tu alerta de precio llama a un webhook. TredOps convierte la alerta en una posición real dentro de un bot tuyo, le aplica el stop loss, el take profit y la salida por tiempo que hayas configurado, publica la señal en tu Signal Pool privado y deja que tus agentes la vean. Tú sigues usando TradingView igual que hasta ahora.

:::note
Los webhooks requieren un plan **Essential** o superior de TradingView. Es un requisito de TradingView, no de TredOps.
:::

## Conectarlo

1. **Dashboard → Integraciones → ⊕ → TradingView.** Ponle nombre y decide cómo debe operarse cada señal: capital por señal, stop loss, take profit, salida por tiempo, sizing, apalancamiento y si se permiten cortos.
2. TredOps responde con una **Webhook URL** y un **Message**. Copia los dos. El mensaje contiene tu passphrase y **solo se muestra una vez**.
3. En TradingView crea tu alerta, abre **Notifications**, activa **Webhook URL** y pega la URL. Pega el mensaje en el campo **Message**.

Eso es todo. La primera alerta que llegue crea sola el bot de ese símbolo.

## El mensaje

```json
{
  "passphrase": "<tu passphrase>",
  "action": "open-long",
  "asset": "{{ticker}}",
  "price": "{{close}}",
  "quantity": "0.01",
  "time": "{{timenow}}",
  "strategy": "My_Strategy"
}
```

| Campo | Qué significa |
|-------|---------------|
| `passphrase` | El secreto del webhook. Autentica solo en este webhook y no sirve en ningún otro sitio de TredOps. |
| `action` | Qué hacer: `open-long`, `close-long`, `open-short`, `close-short`. |
| `asset` | El ticker. `{{ticker}}` lo rellena; un prefijo de mercado como `NASDAQ:` se ignora. |
| `price` | El precio de la alerta. `{{close}}` lo rellena y la posición se abre a ese precio. |
| `capital` | Dólares que poner en la posición. Opcional, y manda sobre todo lo demás. |
| `quantity` | Unidades. Junto con el precio fija el tamaño cuando no hay `capital`. |
| `time` | Cuándo se disparó la alerta. `{{timenow}}` lo rellena y esa es la fecha de la operación. |
| `strategy` | Una etiqueta libre que viaja con la posición, para distinguir tus estrategias. |

Los campos que queden como marcador sin sustituir se ignoran, que es lo que pasa con las alertas de precio no asociadas a una estrategia.

### Cuánto invierte cada señal

Tres vías, en este orden:

1. `capital` en la alerta, en dólares. `"capital": "300"` pone 300 dólares en esa posición.
2. `quantity` por `price`, que es lo que produce una estrategia de Pine cuando manda sus propios contratos.
3. El **capital por señal** de la integración, junto a Leverage en sus ajustes. Es lo que recibe una alerta que no dice ninguno de los dos, y es la configuración más simple: lo fijas una vez en 500 y te olvidas del tamaño.

Pida lo que pida la alerta, una orden nunca compromete más que el tope por orden del portfolio de la integración ni que su saldo disponible, así que una passphrase filtrada no puede dimensionar una operación por su cuenta. Un `price` que se aleje más de un 10 % del mercado se ignora en favor del precio de mercado, y un `time` a más de 15 minutos de la recepción también.

## Las cuatro acciones

| Acción | Qué hace TredOps |
|--------|------------------|
| `open-long` | Abre un largo, o añade uno si el Sizing deja hueco. Si hay un corto abierto en ese símbolo, lo cierra primero y da la vuelta. |
| `close-long` | Cierra todos los largos de ese símbolo. Si no hay ninguno, no hace nada. |
| `open-short` | Abre un corto, o añade uno si el Sizing deja hueco, dando la vuelta a un largo abierto. Requiere **Allow shorts**. |
| `close-short` | Cierra todos los cortos de ese símbolo. |

Una alerta por acción. Como la acción dice el lado, una estrategia que invierte su posición se sigue correctamente con una sola alerta.

Las palabras que TradingView emite en `{{strategy.order.action}}` (`buy`, `sell`, `close`) se siguen aceptando por compatibilidad, pero nunca invierten una posición: con un largo abierto, un `sell` solo lo cierra.

### Ejemplo: un largo en BTC/USD

Alerta de entrada:

```json
{ "passphrase": "<tu passphrase>", "action": "open-long", "asset": "BTCUSD",
  "price": "{{close}}", "capital": "300", "time": "{{timenow}}", "strategy": "My_Strategy" }
```

Alerta de salida:

```json
{ "passphrase": "<tu passphrase>", "action": "close-long", "asset": "BTCUSD",
  "price": "{{close}}", "time": "{{timenow}}", "strategy": "My_Strategy" }
```

El cripto cotiza a todas horas, así que estas alertas se aceptan cualquier día de la semana.

### Ejemplo: un corto en GLD

Alerta de entrada:

```json
{ "passphrase": "<tu passphrase>", "action": "open-short", "asset": "GLD",
  "price": "{{close}}", "capital": "500", "time": "{{timenow}}", "strategy": "My_Strategy" }
```

Alerta de salida:

```json
{ "passphrase": "<tu passphrase>", "action": "close-short", "asset": "GLD",
  "price": "{{close}}", "time": "{{timenow}}", "strategy": "My_Strategy" }
```

Los cortos necesitan **Allow shorts** activado en la integración y un activo que se pueda vender en corto. Las acciones y los ETF solo se aceptan con su mercado abierto; una alerta que llega fuera de sesión se rechaza y recibes un aviso.

## Cuántas posiciones puede tener un símbolo

Una alerta pasa por las mismas reglas que cualquier bot de TredOps. El **Sizing**, en los ajustes de la integración, decide cuántas posiciones puede tener el símbolo a la vez: 100 % es una, 50 % dos, 10 % diez. Una segunda alerta del mismo lado añade una posición mientras haya hueco; pasado el límite se registra y se ignora. Solo se añade otra mientras las abiertas estén en beneficio, y tras varias pérdidas seguidas el periodo de enfriamiento del bot frena las entradas un tiempo. Una alerta de cierre siempre cierra el lado entero.

## Qué añade TredOps a tus señales

- **Protección.** El stop loss, el take profit y la salida por tiempo corren en cada posición desde que se abre, mande o no mande TradingView algo más. El stop sigue al mejor precio alcanzado.
- **Tu Signal Pool privado.** Estas señales las ves solo tú. Nadie más las ve y nunca se publican.
- **Agentes.** Tus agentes las leen como cualquier otra señal, así que pueden actuar sobre ellas, seguirlas en otro portfolio o informar de ellas.
- **Un solo sitio.** La posición aparece en tus posiciones, tus bots y tus notificaciones con el logo de TradingView, junto a todo lo demás.

Cambiar los ajustes de la integración afecta a las posiciones nuevas. Las que ya están abiertas conservan el stop y el objetivo con los que se abrieron.

## Depuración

Expande la fila de la integración. El panel muestra:

- La **webhook URL**, lista para copiar.
- Un **icono de información** con las cuatro acciones y ejemplos listos para usar.
- **Last requests**: las últimas llamadas que respondió el webhook, cada una desplegable con el cuerpo exacto que envió TradingView, la respuesta que devolvió TredOps y en qué acabó la alerta. Tu passphrase aparece censurada.

Ese registro es la forma más rápida de distinguir los tres casos típicos: la alerta nunca llegó, la alerta llegó y fue rechazada, o la alerta se aceptó y la posición está en otra parte del dashboard.

**Verify connection**, en el menú de la fila y en la cabecera, ejecuta una prueba de humo que comprueba la passphrase, el bot, el portfolio y la cola de ejecución sin crear ninguna orden.

## Rechazos habituales

| Lo que ves | Qué significa |
|------------|---------------|
| `invalid passphrase` | El mensaje de TradingView no es el actual. Rota la passphrase y pega el mensaje nuevo en todas las alertas de esta integración. |
| `market_closed` | El mercado del activo estaba cerrado cuando se disparó la alerta. El cripto siempre está abierto; acciones y ETF siguen su sesión. |
| `symbol_not_supported` | El ticker no corresponde a un activo que TredOps pueda operar. |
| `shorts_disabled` | La alerta pedía un corto y la integración no los permite. |
| `bots_limit_reached` | Se alcanzó el límite de símbolos de tu plan para esta integración. |
| `sizing_limit_reached` | El símbolo ya tiene tantas posiciones como permite el Sizing. No hay nada que hacer. |
| `blocked` | Una regla del bot frenó la entrada: las posiciones abiertas no están en beneficio, o el enfriamiento tras pérdidas está activo. |
| `wrong_side` | Llegó un `close-long` teniendo un corto, o al revés. |

## Seguridad

Tu passphrase es la única credencial del webhook y viaja en el cuerpo de la alerta, no en la URL, así que nunca llega a los logs de proxies ni de servidores. Autentica solo en este webhook: usada en cualquier otro sitio de TredOps se rechaza sin ni siquiera consultar la base de datos.

Se muestra al conectar la integración y al rotarla, y nunca más. Rotar revoca la anterior de inmediato, así que actualiza el mensaje de tus alertas justo después.

## Desconectar

Desconectar borra todo lo que creó esta integración, y no se puede deshacer:

1. Las posiciones que sigan abiertas se **cierran a mercado** primero.
2. Se borran sus órdenes, el bot de cada símbolo, su historial de alertas, sus notificaciones, su portfolio y su configuración.
3. La passphrase se revoca, así que el webhook deja de aceptar alertas.

Las posiciones que otros portfolios abrieron siguiendo sus señales son tuyas y se conservan. El portfolio también se conserva si había algo más operando en él. Si una de las posiciones abiertas no se puede cerrar, no se borra nada y el dashboard te lo dice, para que la cierres desde tus posiciones y lo vuelvas a intentar.
