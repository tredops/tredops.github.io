---
title: Opciones de un bot, explicadas
description: Cada opción del formulario de creación, qué significan los avisos y qué hacer con ellos.
---

[Tu primer bot](../first-bot/) te lleva por el recorrido. Esta página es la
referencia del formulario: qué hace cada opción, qué significan los mensajes y
cuáles conviene atender.

:::tip[Lo único que hay que recordar]
Todos los campos que parecen porcentajes son una **fracción del precio, no un
porcentaje**. `0,03` es un 3%. Escribir `0,5` pensando en "medio por ciento" te
deja un stop loss del **50%**, que en la práctica no salta nunca. El formulario
enseña la traducción debajo del campo: léela antes de guardar.
:::

## Qué estás configurando en realidad

No eliges una estrategia con unos números. Describes un **espacio de búsqueda**,
y TredOps prueba combinaciones dentro de él y se queda con las que mejor
funcionaron.

Por eso cada campo admite una **lista de candidatos**, no un valor:

```
Stop Loss Ranges:  0.02, 0.03, 0.04
                 = 2.0% · 3.0% · 4.0%
```

Eso significa "prueba un stop del 2%, otro del 3% y otro del 4%, y dime cuál
funcionó". Cuantos más valores añadas, más tarda la búsqueda.

## Estrategias

Eliges qué familias puede usar la búsqueda. Cada una reacciona a una forma
distinta del mercado:

| Familia | Entra cuando |
|---|---|
| **Breakout** | El precio marca un máximo (o mínimo) nuevo de su rango reciente |
| **EMA / SMA** | Una media rápida cruza a una lenta |
| **MACD** | El impulso se gira |
| **RSI** | El activo está sobrevendido o sobrecomprado |
| **Bandas de Bollinger** | El precio sale de su banda habitual y vuelve |
| **Breakout + RSI** | Una ruptura que el impulso confirma |

Cada familia viene en tres direcciones: **Long** (compra), **Short** (vende
prestado) y **Both**. Las variantes en corto solo aparecen en activos que tu
bróker permite vender en corto: la cripto, por ejemplo, no se puede cortar en
Alpaca.

:::note
Seleccionar más familias no hace mejor al bot, hace más grande la búsqueda. Si
no tienes una opinión formada, deja la selección por defecto.
:::

## Riesgo

### Stop Loss

Dónde se cierra la posición si el precio va en tu contra, como fracción del
precio de entrada. Es un stop **dinámico**: acompaña al precio cuando sube y va
asegurando la ganancia.

- **Rango habitual:** 0,02 a 0,06 (del 2% al 6%).
- La **cripto** se mueve más, así que un stop demasiado ajustado salta solo por
  el ruido.
- **Un stop por encima del 10% se parece mucho a no tener stop.** Casi nunca
  salta, y la posición acaba saliendo por take profit o por señal.

### Take Profit

Dónde se cierra la posición en ganancias. Deja un valor vacío para decir **sin
take profit**: entonces la posición solo sale por stop loss o por señal.

### Sizing

Cuánto capital del bot entra en cada posición, en fracción. `0,25` es un cuarto,
así que **como mucho cuatro posiciones abiertas a la vez** en ese activo.

### Apalancamiento

Cuánto dinero prestado puede usar el bot. **Es un experimento, no un ajuste**:
das una lista y el optimizador decide.

| Escribes | Qué pasa |
|---|---|
| `1` | Sin dinero prestado. Siempre incluido. |
| `1,2` | El optimizador prueba los dos y se queda con el que puntuó mejor |

El 1x siempre está en la lista para que haya con qué comparar. Si el 2x no
compensa su riesgo extra, gana el 1x por méritos propios.

:::caution[El apalancamiento estrecha tu stop loss]
Con apalancamiento *L*, un movimiento del 1% en tu contra te cuesta un *L*% de
tu propio dinero. Y el bróker no espera a que llegue a cero: pasado un punto
cierra él la posición, al precio que encuentre. Por eso TredOps limita cuánto
puede ensancharse el stop loss:

| Apalancamiento | Stop loss máximo | El bróker liquida en |
|---|---|---|
| 1x | sin límite | nunca, no hay dinero prestado |
| 2x | 5,0% | movimiento adverso del 33% |
| 3x | 3,3% | movimiento adverso del 11% |
| 4x | — | al instante, no queda margen |

La tarjeta de Apalancamiento del formulario enseña esta tabla para los niveles
que elegiste, y cuántos de *tus* stop loss sobreviven a cada uno.
:::

## Datos de mercado

**Cuántas velas** de histórico usa la búsqueda. Es el campo que más
silenciosamente puede dejar un bot inútil.

:::danger[Tiene que cubrir al menos 20 días]
La puntuación del bot mide los **últimos 20 días** de los datos que recibió. Si
tu histórico es más corto, la puntuación sale 0 y **el bot no abre ni una
posición**, sin que nada en pantalla lo explique.

Mismo bot, mismos parámetros, cambiando solo la cantidad de histórico:

| Velas | Días que cubren | Resultado |
|---|---|---|
| 200 | 8 | sin señal, puntuación 0 |
| 600 | 24 | funciona con normalidad |
| 1200 | 49 | funciona con normalidad |

Con una vela por hora, usa **600 o más**. La calibración avisa cuando el
histórico que recibió se queda corto.
:::

## Calidad

### Puntuación mínima para abrir

El bot solo actúa cuando su puntuación supera este valor. La puntuación es
**porcentaje del capital en los últimos 20 días, descontado el drawdown**, así
que `0,5` es medio punto porcentual. El valor por defecto es un buen punto de
partida.

:::note
Si copias ajustes de un bot antiguo, revisa este valor. Antes la puntuación se
medía en dólares; un umbral como `0,04` tenía sentido entonces y hoy significa
"acepta casi cualquier cosa".
:::

### Reglas de promoción

Deciden si un bot llega a **producción** después de su test:

- **Tasa de acierto** — qué proporción de operaciones ganadoras necesita.
- **Beneficio mínimo** — cuánto tiene que haber ganado, y en cuántos días.

Las dos se miden sobre el final del periodo probado, no sobre hoy.

## Optimización

| Opción | Qué cambia |
|---|---|
| **Generaciones** | Cuántas rondas de refinamiento. Más rondas, más tiempo. |
| **Población** | Cuántas combinaciones por ronda. |

Las dos quedan acotadas por lo grande que sea tu espacio de búsqueda. Si diste
pocos valores, la búsqueda termina enseguida pongas lo que pongas aquí: es
normal, no es un fallo.

## Mientras se ejecuta

La calibración ocurre en segundo plano; puedes cerrar la pestaña. La
notificación enseña el avance y una estimación:

```
Optimizing AVAX/USD: 1792 of ~2564 backtests · ~3 min left
```

Cuando un bot cubre varios activos comparten una sola notificación y cada uno
conserva su porcentaje. El tiempo que falta es el del activo **más lento**,
porque es cuando estará listo de verdad:

```
Calibrating AVAX/USD 100% · BTC/USD 15% · SOL/USD 15% · ~6 min left
```

## Leer el resultado

### Test P&L y Live P&L

La lista de bots enseña dos columnas de dinero y **no** son lo mismo:

| Columna | Qué es |
|---|---|
| **Test P&L** | Lo que el bot *habría* hecho sobre el pasado, en el test |
| **Live P&L** | Lo que hizo de verdad con tu cartera |

**"Not tested"** significa que el bot todavía no tiene un test detrás, que es
distinto de haberse probado y no haber ganado nada.

### Producción o staging

Un bot llega a **producción** aprobando su test. Si no lo aprueba se queda en
**staging** y el motivo aparece en su fila.

## Mensajes que puedes ver

| Mensaje | Qué significa | Qué hacer |
|---|---|---|
| `No stop loss in your grid survives 2x: all of them are above 5.0%` | Todos los stop que pusiste son más anchos de lo que el apalancamiento permite, así que no quedaría nada que probar | Baja los valores de stop loss, o baja el apalancamiento |
| `Every level above 1x would be dropped` | Ningún nivel de apalancamiento es usable con este activo y estos stop | Corrige los motivos de la tabla, o deja el apalancamiento en 1 |
| `Crypto is never leveraged` | Tu bróker no presta dinero contra cripto | No hay nada que arreglar; el bot opera a 1x |
| `Alpaca only allows 3x intraday` | Ese nivel exige cerrar las posiciones antes del fin de sesión | Activa intradía, o baja el apalancamiento |
| `200 bars cover only 8.0 days and the score measures the last 20` | Histórico insuficiente; la puntuación será 0 y el bot no operará | Sube el número de velas |
| `Never passed a performance test` | El bot no se ha probado, así que se queda en staging | Lanza el test |
| `Profit 0% over 20 days below the required 1%` | Tiene operaciones, pero ninguna lo bastante reciente para cumplir la regla | Amplía la ventana de beneficio, o acepta el staging |
| `No performance-test trades in the last 30 days of the window` | El test no produjo operaciones cerca del final del periodo | Suele significar que la estrategia se activa poco en ese activo |
| `Calibration failed: the engine is not authorised to read market data` | Un problema de credenciales nuestro, no de tu configuración | Reintentar no sirve; escribe a soporte |
| `Empty experiment grid` | Todas las combinaciones que describiste fueron rechazadas | Casi siempre es el apalancamiento contra el stop loss: mira las dos primeras filas |

## Errores habituales

- **Escribir porcentajes en vez de fracciones.** `0,5` es 50%, no 0,5%. El campo
  enseña la traducción debajo.
- **Histórico insuficiente.** El motivo más frecuente de que un bot no opere.
- **Apalancamiento con stop anchos.** Se contradicen; el formulario te avisa
  antes de guardar.
- **Marcar todas las familias de estrategias.** Hace la búsqueda más lenta, no
  más lista.

## Siguiente

- [Tu primer bot](../first-bot/) — el recorrido completo.
- [Gestionar el riesgo](../risk/) — cómo se comportan Take Profit y Stop Loss en vivo.
