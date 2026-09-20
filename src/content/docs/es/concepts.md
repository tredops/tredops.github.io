---
title: Conceptos clave
description: Portfolio, bot, agente, señal, orden y calibración explicados en una página. La base para entender el resto de la documentación.
---

Antes de tocar nada en la plataforma conviene tener claros seis conceptos. Con
ellos entenderás todo lo demás.

## Portfolio

Un **portfolio** es una cartera dentro de TredOps: tiene un capital asignado, una
liquidez disponible, unas posiciones abiertas y unas reglas propias (qué activos
puede operar, cuánto puede arriesgar por operación, qué filtros de señal acepta).

Puedes tener varios portfolios a la vez y usarlos para separar estrategias: uno
conservador de ETFs, otro agresivo de cripto, otro para probar un agente nuevo.
Cada uno lleva su propia contabilidad.

:::note
El portfolio es una unidad **contable y de reglas** dentro de TredOps. El dinero
real sigue en tu cuenta del broker: TredOps nunca lo custodia.
:::

## Bot

Un **bot** es una estrategia algorítmica aplicada a uno o varios activos. No usa
un LLM: usa reglas e indicadores cuyos parámetros se optimizan sobre datos
históricos.

Un bot no decide por su cuenta qué entra en tu cartera. Lo que hace es **generar
señales**.

## Señal y Signal Pool

Una **señal** es la propuesta de operación que emite un bot: "abrir largo en X a
este precio, con este stop y este objetivo".

Todas las señales van a un **Signal Pool** compartido. Los agentes leen ese pool,
lo filtran con los criterios de tu portfolio y deciden cuáles merece la pena
ejecutar. Una señal, por sí sola, nunca mueve dinero.

## Agente y sub-agente

Un **agente** es un modelo de lenguaje con un system prompt, un conjunto de
herramientas y unos permisos. Es quien **decide**: lee el contexto de tu cartera,
consulta el Signal Pool, analiza datos de mercado y abre o cierra operaciones.

Un **sub-agente** es un agente especializado al que el agente principal delega
una parte del trabajo (analizar un sector, revisar el riesgo, proponer un
rebalanceo). Puedes crear los tuyos en el Playground.

## Orden y posición

Una **orden** es la instrucción de compra o venta que se envía al broker. Una
**posición** es el resultado: lo que tienes abierto en el mercado.

En TredOps toda orden se abre con **Take Profit** y **Stop Loss**. No es opcional:
es la regla que hace que una operación no pueda quedarse abierta indefinidamente
por descuido.

## Calibración

La **calibración** es el proceso que encuentra los parámetros óptimos de una
estrategia para un activo concreto, sobre datos históricos. Es la fuente de
verdad para evaluar si una señal es buena.

Cada bot tiene su propio calendario de calibración y se reajusta de forma
periódica a las condiciones recientes del mercado, porque un parámetro que
funcionaba en un régimen de baja volatilidad deja de funcionar en uno alto.

## Cómo encajan

```
Bot ──genera──► Señal ──entra en──► Signal Pool
                                        │
                                        ▼
                         Agente (filtra, analiza, decide)
                                        │
                                        ▼
                     Orden ──en tu broker──► Posición
                                        │
                                        ▼
                    Monitoring (Take Profit / Stop Loss)
```

El bot propone, el agente decide, el monitoring protege. Tú fijas las reglas de
cada capa y puedes intervenir en cualquier momento.

## Siguiente paso

- [Guía rápida](../getting-started/) — de cero a tu primera operación.
- [Glosario](../glossary/) — el resto de términos que verás en la plataforma.
