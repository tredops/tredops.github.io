---
title: Guía rápida
description: De cero a tu primera operación en TredOps. Regístrate, conecta tu broker, elige una estrategia y deja que el monitoring haga su trabajo.
---

El objetivo de TredOps es que puedas entender y operar la plataforma en **menos
de 2 minutos**. Esta guía es el camino recomendado; cada paso enlaza a la guía
detallada si quieres profundizar.

:::tip[¿Primera vez?]
Si no tienes claro qué es un portfolio, un bot o una señal, empieza por
[Conceptos clave](../concepts/). Son cinco minutos y te ahorran confusión después.
:::

## 1. Crea tu cuenta

Entra en [tredops.com](https://tredops.com) y regístrate. Empiezas en
**Freemium** con **14 días de prueba completa**, sin tarjeta:

- Acceso a los bots y agentes mantenidos por el equipo de TredOps.
- Créditos de LLM limitados, suficientes para probar de verdad.
- Monitoring con Take Profit y Stop Loss.
- Hasta 2 bots activos.

Al acabar los 14 días sigues en Freemium sin coste: todo sigue visible, puedes
operar a mano y copiar los Copy Trader Agents marcados Free.

Ver [Planes y precios](../pricing/) para el detalle de cada plan.

## 2. Conecta tu broker

TredOps es **no custodial**: tus fondos permanecen en tu cuenta del broker y la
plataforma nunca los toca.

1. Ve a **Integraciones** en el dashboard.
2. Conecta **Alpaca** (o el broker soportado) autorizando la conexión.
3. Añade los activos que quieras operar: ETFs, acciones o cripto.

Tus credenciales se guardan cifradas y solo se usan para ejecutar y monitorizar
las operaciones que decidan tus bots y agentes, bajo las reglas de riesgo que
configures. Puedes revocar la integración en cualquier momento.

:::caution[Empieza en paper trading]
Si tu broker ofrece cuenta de prueba (*paper*), conéctala primero. Verás
exactamente el mismo comportamiento sin dinero real de por medio.
:::

## 3. Fija tus reglas de riesgo

Antes de que nada opere, entra en **Portfolios → Ajustes** y decide tres cosas:

- Cuánto capital puede ir como máximo a **una sola posición** (empieza por 15 %).
- Qué porcentaje quieres mantener siempre en **liquidez** (empieza por 20 %).
- Cuántas **posiciones simultáneas** admites (3 o 4 al principio).

Estas reglas mandan sobre cualquier agente y cualquier tarea. Ver
[Gestionar el riesgo](../guides/risk/).

## 4. Elige estrategia con el Benchmark

Antes de crear nada propio, mira qué funciona: el
[Benchmark público](../benchmark/) compara agentes y modelos LLM sobre la misma
ventana de mercado y el mismo capital, frente a **Buy & Hold**.

No lo uses como un ranking para copiar al primero, sino para ver **cómo se
comporta** cada perfil: cuántas operaciones abre, cuánto aguanta una posición en
pérdidas, cómo de concentrado opera.

## 5. Pon a funcionar un bot

Con los bots mantenidos por TredOps ya tienes señales desde el primer día. Si
quieres el tuyo:

1. **Bots → Crear bot** y elige el activo o el sector.
2. Acepta la configuración por defecto: TredOps optimiza los parámetros con
   algoritmos genéticos sobre el histórico del activo.
3. El bot pasa por **Performance Testing**. Solo si supera el umbral de calidad
   entra en producción; si no, se queda en staging ejecutándose en segundo plano.

Guía completa: [Tu primer bot](../guides/first-bot/).

## 6. Habla con tu agente

Abre el chat y empieza **en modo Plan**, que solo lee y propone:

- *"¿Cómo está mi portfolio hoy?"*
- *"¿Qué hay en el pool de señales que encaje con mis reglas?"*
- *"Si abriera la señal de TEST, ¿cuánto capital comprometería?"*

Cuando reconozcas el tipo de decisiones que toma, pásalo a **Trading** para que
ejecute contigo delante. Guía completa:
[Trabajar con agentes](../guides/first-agent/).

## 7. Deja que el Monitoring trabaje

Toda orden se abre con **Take Profit** y **Stop Loss**. A partir de ahí, el
sistema revisa tus posiciones de forma continua y las cierra cuando se alcanza un
nivel o cuando la propia estrategia indica salir.

Esta es la parte que no hay que tocar: está para evitar exactamente las
decisiones que se toman en caliente.

## 8. Automatiza lo que ya funcione

Cuando una rutina del chat te dé buenos resultados, conviértela en una
[AgentTask](../guides/agent-tasks/) y deja que se ejecute sola.

## Checklist de la primera semana

- [ ] Broker conectado (mejor en paper trading).
- [ ] Reglas de riesgo del portfolio fijadas.
- [ ] Una edición del Benchmark leída de principio a fin.
- [ ] Un bot en producción o en staging.
- [ ] Tres conversaciones con el agente en modo Plan.
- [ ] Ninguna AgentTask en modo autónomo todavía.

## Siguientes pasos

- [Conceptos clave](../concepts/) — el vocabulario de la plataforma.
- [Los cuatro pilares](../pillars/bots-ci/) — cómo funciona cada capa por dentro.
- [Seguridad](../security/) — qué protege TredOps y qué controlas tú.
- [FAQ](../faq/) — las dudas que más se repiten.
