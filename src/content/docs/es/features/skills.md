---
title: Skills de agente
description: Los manuales de experto que sigue tu agente. Para qué sirve cada uno, cómo darle a tu agente los que necesita y cómo invocarlos desde el chat.
---

Una **skill** es un manual de experto: un procedimiento escrito que el agente lee
antes de actuar sobre un tema. No es una herramienta ni un prompt que tengas que
mantener tú — es el método que TredOps ha destilado para un trabajo concreto, con
sus reglas, su orden de pasos y los errores que hay que evitar.

La diferencia se ve enseguida. Pregunta a un agente *«¿sigo esta señal?»* sin
skill y razonará como al modelo le parezca, distinto cada vez. Pregunta lo mismo
con la skill de señales cargada y lee primero la dirección, comprueba la
evidencia en el orden que importa, y rechaza la señal cuando esa evidencia no
está.

## Qué skills existen

Están disponibles en todos los planes que incluyen agentes. Son los mismos
manuales que usan los agentes de la propia plataforma.

| Skill | Para qué sirve |
|-------|----------------|
| **Trade setup** | Dejar una estrategia completa armada sobre un símbolo por niveles de precio, y seguirla. Ver [Trade setups](/es/features/trade-setups/) |
| **Signal judge** | Decidir si seguir una señal del pool, con la lógica de la estrategia que la produjo |
| **Trade review** | Autopsia de una posición cerrada: por qué cerró, si la tesis se cumplió, qué cambiar |
| **Portfolio risk setup** | Configurar un portfolio: perfil de riesgo, tamaño de orden, filtros y fuentes de señales |
| **Context reader** | Leer el contexto de un portfolio y un bloque de market data y convertirlos en un análisis que cita números reales |
| **Bots builder expert** | Diagnosticar, versionar, calibrar y promover bots, de una hipótesis en una |
| **Agent task designer** | Diseñar y auditar tareas programadas o por evento |

Algunas skills llevan además **ficheros de apoyo** — recetas, tablas de niveles,
listas de comprobación — que el agente abre solo cuando el manual se lo indica,
para que un procedimiento largo no se coma la conversación.

## Tu agente solo tiene las skills que tú le das

Una skill se **ancla** a un agente. Un agente usa las skills que tiene ancladas y
ninguna más: no puede echar mano de otro manual por su cuenta, ni anunciará
skills que no son suyas. Es deliberado — un agente que montaste para juzgar
señales no debería empezar a reconfigurar bots por iniciativa propia.

Dónde se anclan:

1. Abre el **Playground** y elige el agente que quieres cambiar.
2. En el panel del modelo, abre la sección **Skills**. Lista las skills que te da
   tu plan.
3. Marca las que ese agente necesita, y guarda o publica.

Desde ese momento el agente empieza cada ejecución con esos manuales ya
cargados — no gasta un turno en buscarlos — y puede releerlos o abrir sus
ficheros de apoyo cuando lo necesite.

:::note
Un agente sin nada anclado no tiene skills. Si notas que un agente razona de
forma más suelta que antes, o que el menú `/` del chat sale vacío, mira primero su
sección Skills en el Playground.
:::

## Invocar una skill desde el chat

En el **chat** del dashboard, escribe `/` al principio del mensaje. Se abre una
lista con las skills del agente con el que estás hablando y un resumen de cada
una. Elige una, escribe tu pregunta detrás y envía:

```
/trade-setup Quiero comprar la ruptura de 103 en este símbolo, 300 USD, stop por debajo de 98
```

El agente carga ese manual y responde siguiéndolo. No hace falta recordar los
nombres: la lista filtra mientras escribes, y las flechas más Enter eligen la
fila marcada.

Lo mismo funciona en **Telegram**: el menú de comandos del bot lista las skills
disponibles, y `/skills` las imprime con su descripción. Escribir `/trade_setup
<tu pregunta>` es el equivalente del menú `/` del chat web.

## Skills en tu propio cliente MCP

Si conectas tu propio agente (Claude Code, Claude Desktop, Cursor…) a través de
[TredOps MCP](/es/integrations/tredops-mcp/), las mismas skills le llegan como
prompts, recursos y las tools `listSkills` / `getSkill`. Carga una antes de
trabajar en su dominio y tu cliente sigue el mismo procedimiento que los agentes
de dentro de la plataforma.

## Conviene saber

- **Las skills no sustituyen a los límites de riesgo.** Un manual cambia cómo
  decide un agente, nunca lo que tiene permitido hacer: los límites del portfolio,
  el paso de aprobación y los permisos de tu plan se aplican igual.
- **Una skill no es un system prompt.** Tu prompt dice quién es el agente; la
  skill dice cómo se hace bien un trabajo concreto. Deja el prompt para los
  criterios y que la skill lleve el procedimiento.
- **Ancla pocas.** Dos o tres manuales relevantes valen más que todos: un agente
  enfocado decide mejor, y cada skill con la que arranca es contexto que arrastra
  toda la ejecución.
- Algunas skills están reservadas al mantenimiento de la propia plataforma y nunca
  aparecen en tu lista.
