---
title: Monitoring
description: Take Profit y Stop Loss automáticos con monitorización continua de posiciones.
---

El pilar de **Monitoring** es la capa de monitorización continua de posiciones con gestión automática de riesgo.

**Toda orden** generada o gestionada a través de TredOps se abre siempre con **Take Profit** y **Stop Loss** definidos. El sistema monitoriza de forma continua las posiciones para capturar oportunidades o cerrar la operación cuando se cumplen las condiciones establecidas, reduciendo la exposición a decisiones impulsivas o a una gestión de riesgo deficiente.

## Cómo funciona

1. Un worker periódico revisa todas las posiciones abiertas.
2. Para cada posición obtiene los datos de mercado actuales.
3. Evalúa la posición con la misma estrategia que se usó al abrirla.
4. Comprueba los niveles de riesgo:

   - **Stop Loss**: cierra si el precio cae por debajo del umbral de pérdida máxima.
   - **Take Profit**: cierra si el precio alcanza el objetivo de ganancia.
   - **Señal de estrategia**: cierra si la evaluación de la estrategia indica salir.

5. Si decide cerrar, actualiza el balance de tu portfolio automáticamente.

## Parámetros de riesgo

Configuras los niveles en la apertura de la orden:

- **Stop Loss** — porcentaje de pérdida máxima aceptada.
- **Take Profit** — porcentaje de ganancia objetivo.
- **Trailing stop** (opcional) — sigue el precio en tu favor para proteger beneficios.

> Una vez abierta la orden, se evalúa con sus propios parámetros guardados, no con los del día de apertura.

## Razones de cierre

| Razón | Descripción |
|-------|-------------|
| `STOP_LOSS` | El precio cayó por debajo del umbral de pérdida máxima |
| `TAKE_PROFIT` | El precio alcanzó el objetivo de ganancia |
| `STRATEGY_SIGNAL` | La estrategia indica cerrar la posición |
| `FORCE_CLOSE` | Cierre manual forzado |

## Gestión de riesgo de los agentes

Cuando un agente autónomo opera por ti, aplica además reglas de gestión de riesgo adicionales para proteger tu capital:

- Máximo **25 %** por posición.
- **10 %** de reserva de caja.
- Cierre ante pérdida de **−5 %** en la cartera (por posición).
- Cierre de la mitad de la posición con **+10 %** de beneficio.
- Distancia de stop-loss de **15 %** por defecto.

Gracias a esta capa, TredOps automatiza y profesionaliza la gestión de riesgo: sin decisiones impulsivas, sin stops mal calculados por volatilidad.