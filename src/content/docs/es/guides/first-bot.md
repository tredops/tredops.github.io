---
title: Tu primer bot
description: Crea, optimiza y pon en producción un bot de trading en TredOps, paso a paso.
---

Un bot de TredOps es una estrategia algorítmica aplicada a uno o varios activos,
con sus parámetros optimizados sobre datos históricos. Esta guía te lleva de la
pantalla en blanco a un bot generando señales.

:::tip[Antes de empezar]
Si aún no has conectado tu broker, pasa primero por la
[guía rápida](../../getting-started/). Un bot puede crearse y evaluarse sin broker,
pero no podrá ejecutar nada.
:::

## 1. Elige el activo

Desde el dashboard, entra en **Bots → Crear bot** y elige qué quieres operar:

- **ETFs** — El punto de partida recomendado: menos ruido, más histórico, spreads
  estrechos. Es lo que se usa en la mayoría de ediciones del Benchmark.
- **Acciones** — Más movimiento y más riesgo específico de compañía.
- **Cripto** — Mercado 24/7 y volatilidad alta. Exige stops más anchos.

Puedes crear un bot por activo o un bot por **sector** (tecnología, energía,
defensivos…), que agrupa varios símbolos bajo la misma estrategia.

## 2. Deja que se optimice

Con el activo elegido, TredOps descarga su histórico y busca los parámetros de la
estrategia que mejor se comportan sobre él. La optimización usa **algoritmos
genéticos**: en lugar de probar todas las combinaciones, va cruzando y mutando
las que mejor puntúan.

Tienes dos caminos:

- **Configuración por defecto** — Recomendada para empezar. TredOps elige el
  espacio de búsqueda y los criterios de puntuación.
- **Configuración propia** (Premium) — Fijas tú los rangos de cada parámetro, la
  ventana de datos y la métrica objetivo.

La optimización se encola y corre en segundo plano. Puedes cerrar la pestaña.

## 3. Revisa el Performance Testing

Optimizar sobre un histórico es fácil; sobrevivir a lo que no estaba en ese
histórico, no. Por eso, antes de dejar operar a un bot, TredOps lo somete a
**Performance Testing**:

- Se ejecuta sobre periodos que no se usaron en la optimización.
- Se le enfrenta a condiciones de mercado inesperadas (huecos, picos de
  volatilidad, cambios de régimen).
- Se compara su resultado con **Buy & Hold** del mismo activo.

Mira tres cosas en el informe:

| Qué mirar | Qué buscar |
|-----------|-----------|
| Resultado fuera de muestra | Que no se desplome respecto a la optimización |
| Máxima caída (drawdown) | Que puedas convivir con ella sin cerrar el bot en pánico |
| Número de operaciones | Muy pocas → resultado poco fiable; demasiadas → costes |

## 4. Producción o staging

TredOps aplica un **umbral de calidad** automático:

- Si el bot lo supera, pasa a **producción** y sus señales entran en el Signal
  Pool.
- Si no lo supera, se queda en **staging**: sigue ejecutándose en segundo plano,
  acumulando resultados, pero sin que sus señales lleguen a tu cartera.

Un bot en staging no es un bot fallido; es un bot que todavía no ha demostrado
nada. Revísalo pasadas unas semanas.

## 5. La calibración se encarga del resto

Una vez en producción, cada bot tiene su **calendario de calibración**. De forma
periódica vuelve a ajustar sus parámetros a las condiciones recientes del
mercado, sin que tengas que hacer nada.

La calibración usa siempre datos anteriores al momento evaluado, para evitar el
*look-ahead bias* (decidir con información que en su momento no existía).

## 6. Del bot a la operación

A partir de aquí, el bot **propone**; no ejecuta:

1. El bot genera una señal.
2. La señal entra en el [Signal Pool](../../pillars/bots-ci/).
3. Los filtros de tu portfolio descartan las que no encajan.
4. Un [agente](../first-agent/) decide si la ejecuta.
5. Si se ejecuta, la orden se abre con Take Profit y Stop Loss y entra en
   [Monitoring](../../pillars/monitoring/).

## Errores habituales

- **Crear diez bots el primer día.** Empieza con uno o dos y entiende cómo se
  comportan antes de ampliar.
- **Descartar un bot por una mala semana.** La ventana de evaluación relevante es
  de meses, no de días.
- **Optimizar hasta que el histórico quede perfecto.** Un resultado histórico
  impecable suele ser sobreajuste; lo que importa es el resultado fuera de
  muestra.

## Siguiente paso

- [Trabajar con agentes](../first-agent/) — quién decide qué señales se ejecutan.
- [Gestionar el riesgo](../risk/) — cómo se fijan Take Profit y Stop Loss.
