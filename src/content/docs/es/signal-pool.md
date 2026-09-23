---
title: Signal Pool
description: El lugar compartido donde aterrizan las señales de los bots en producción, y cómo los agentes las convierten en oportunidades para tu cartera.
---
El **Signal Pool** es el lugar compartido donde aterriza cada señal generada por
un bot en producción.

![Signal Pool](/signal-pool/TredOpsSingalPool.jpg)

Está entre "el bot ha visto algo" y "un agente decide
actuar", y es lo que mantiene separados esos dos mundos: un bot propone, no
ejecuta. Una señal por sí sola nunca abre órdenes en tu cuenta.
## Cómo llega una señal al pool

Seis pasos llevan una estrategia desde tu selección de activos hasta una señal
sobre la que un agente puede actuar:

1. **Tú eliges los activos.** Toda estrategia empieza por los activos que decides
   operar.
2. **La plataforma busca lo que funciona.** La automatización ejecuta la
   experimentación y busca los parámetros y estrategias óptimos, en lugar de
   dejarlo en manos de la intuición.
3. **Performance testing.** Cada candidata se evalúa **vela a vela** con datos
   de mercado reales, y la calibración cada N días la mantiene al día con las
   condiciones recientes.
4. **Los bots se clasifican.** El resultado es un bot en **staging** o en
   **production**. Solo los que superan el umbral de calidad llegan a
   producción; el resto sigue acumulando resultados donde no pueden tocar
   dinero.
5. **Las señales de producción llegan al pool.** Las señales de los bots en
   producción son las que aparecen en el Signal Pool.
6. **Los agentes eligen oportunidades.** Los agentes leen el pool, lo filtran
   con las preferencias de tu portfolio y deciden cuáles merece la pena ejecutar.

## Qué ves en el pool

Cada señal se presenta como una **card** con:

- Un gráfico de velas del activo.
- Los niveles de **Stop Loss** y **Take Profit** de la operación.
- El **win rate** del bot y su beneficio en tiempo real.

Desde una card puedes **marcar** la señal (saltarla o seguirla) o **abrir una
orden** en uno de tus portfolios directamente desde ella, respetando las reglas
de riesgo de ese portfolio.

## El mismo pool, para tus agentes

Los agentes consumen el **mismo pool**, pero nunca lo ven entero: lo que un
agente puede operar es el pool **filtrado por las preferencias de tu portfolio**.
Si tu portfolio solo permite ETF y nada de crypto, o limita el nivel de riesgo
por operación, el agente solo ve las señales que respetan esas reglas.

Así, si tu portfolio está configurado como **ETF y sin crypto**, el agente nunca
propone una operación de crypto — no porque no la haya considerado, sino porque
esa señal no se le mostró en primer lugar.

Cuando un agente propone una operación, la ha elegido del mismo panel de señales
que ves tú, filtrado por tus reglas — no de una fuente distinta.

## Acceso y límites

Cualquier plan puede ver el pool. Abrir una orden desde una señal pasa por los
mismos guards que cualquier otra operación de la plataforma (tamaño de la
posición, cooldown, liquidez) y, si la abre un agente, también por las reglas de
riesgo de tu portfolio y por los créditos del agente.

## Sigue leyendo

- [El ciclo de TredOps](../lifecycle/) — dónde encaja el Signal Pool en el
  pipeline.
- [Tu primer agente](../guides/first-agent/) — cómo un agente lee el pool y
  decide.
- [Gestionar el riesgo](../guides/risk/) — los límites que siguen aplicando
  cuando una señal se convierte en orden.