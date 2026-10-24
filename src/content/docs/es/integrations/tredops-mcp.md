---
title: TredOps MCP
description: Conecta Claude Code, Claude Desktop, Cursor, OpenCode o cualquier cliente MCP a tus carteras, con un token que controlas y las mismas reglas que siguen tus agentes.
---

TredOps MCP permite que un agente de IA que ya usas trabaje sobre tu cuenta de TredOps. Claude Code, Claude Desktop, Cursor, OpenCode o cualquier cliente que hable el Model Context Protocol se conecta a `https://m.tredops.com/mcp` con un token que creas en el dashboard y, desde ahí, puede leer tus carteras, juzgar señales, abrir y cerrar órdenes y gestionar tus bots y tareas de agente, con los mismos límites que los agentes que corren dentro de TredOps.

La conexión es tuya: un token por cliente, mostrado una sola vez, revocable en cualquier momento. Lo que ve el agente lo decide el servidor según tu plan y los permisos del token, nunca el agente.

:::note
TredOps MCP es una función **Premium**. El número de conexiones que puedes mantener abiertas depende de tu plan; el dashboard te avisa al llegar al límite.
:::

## Conectarlo

1. **Dashboard → Integraciones → ⊕ → TredOps MCP.** Dale a la conexión un nombre que diga dónde vivirá el token (por ejemplo *Claude Code en mi portátil*) y pulsa **Create connection**.
2. **Copia el token ahora.** Se muestra solo esta vez; después solo podrás rotarlo. Tiene la forma `tredops_<id>@<secret>` y lleva los permisos `read`, `write` y `delete`.
3. Abre **Connection instructions** y elige tu cliente. Cada pestaña trae el fragmento exacto con tu endpoint y el nombre del servidor ya rellenos.

### Claude Code

Ejecuta una vez en un terminal, reinicia Claude Code y comprueba `/mcp`:

```bash
claude mcp add --transport http --scope user tredops https://m.tredops.com/mcp --header "Authorization: Bearer tredops_<id>@<secret>"
```

### Claude Desktop / Cursor

Añade esto a `claude_desktop_config.json` (Claude Desktop) o a `.cursor/mcp.json` (Cursor) y reinicia la aplicación:

```json
{
  "mcpServers": {
    "tredops": {
      "url": "https://m.tredops.com/mcp",
      "headers": {
        "Authorization": "Bearer tredops_<id>@<secret>"
      }
    }
  }
}
```

### OpenCode

Añade esto a `opencode.json` en tu proyecto o en tu carpeta de usuario:

```json
{
  "mcp": {
    "tredops": {
      "type": "remote",
      "url": "https://m.tredops.com/mcp",
      "headers": {
        "Authorization": "Bearer tredops_<id>@<secret>"
      }
    }
  }
}
```

### Cualquier otro cliente

El servidor habla MCP sobre Streamable HTTP. Autentica cada petición con `Authorization: Bearer <token>`, inicializa una sesión y conserva la cabecera de respuesta `mcp-session-id` para las llamadas siguientes:

```bash
curl -sS -i -X POST 'https://m.tredops.com/mcp' \
  -H 'Authorization: Bearer tredops_<id>@<secret>' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-agent","version":"1.0.0"}}}'
```

## Qué puede hacer tu agente

El agente recibe un conjunto de **tools** (acciones) y de **skills** (playbooks de experto). Ambos vienen filtrados para ti: las herramientas de administración y de research nunca se exponen por esta conexión, y las que exigen un plan superior simplemente no aparecen.

| Área | Tools (ejemplos) |
|------|------------------|
| **Carteras** | estado de todas las carteras, el contexto completo de una (saldo, órdenes abiertas, historial, pool de señales, foto de mercado), crear o ajustar una cartera y su perfil de riesgo |
| **Señales** | el pool de señales con el historial y el riesgo de cada bot, datos de mercado por señal en el timeframe del propio bot, noticias, guardar el análisis de una señal |
| **Órdenes** | abrir una posición desde una señal, cerrar una posición, rebalancear, leer una orden completa |
| **Bots** | tus BotConfigs y bots con calibración, veredicto del replay y P&L, crear versiones mejoradas, lanzar calibraciones y performance tests, mover bots entre staging y producción |
| **Agentes** | crear y programar tareas de agente, ejecutar un sub-agente sobre una cartera, memoria de decisiones de la cartera |
| **Soporte** | abrir una incidencia al equipo de TredOps |

Al expandir la fila de la conexión en el dashboard verás **Tools available to your agents**: cuántas herramientas de la plataforma desbloquea tu plan, agrupadas por área, con una etiqueta `read-only`, `writes` o `destructive` en cada una.

### Skills

Las skills son los playbooks que siguen los agentes de TredOps: cómo juzgar una señal con la lógica de la estrategia que la generó, cómo leer el contexto de una cartera o un bloque de datos de mercado, cómo mejorar un bot con una hipótesis por versión, cómo revisar una operación cerrada, cómo configurar el riesgo de una cartera. Tu cliente MCP las ve como prompts (en Claude Code, `/mcp__tredops__signal-judge`), como recursos y a través de las tools `listSkills` y `getSkill`. Carga una antes de trabajar en su dominio; el agente seguirá entonces las mismas reglas que los agentes internos.

| Skill | Úsala cuando |
|-------|--------------|
| `context-reader` | quieres un análisis de una cartera o de un símbolo que cite los números correctos |
| `signal-judge` | el agente tiene que decidir si seguir una señal |
| `trade-review` | una posición cerró y quieres saber por qué y qué cambiar |
| `portfolio-risk-setup` | estás creando o ajustando una cartera: perfil de riesgo, tamaño de orden, filtros y fuentes de señal |
| `bots-builder-expert` | quieres diagnosticar, versionar, calibrar o promover bots |

## Guardarraíles

Las mismas reglas que gobiernan a los agentes de TredOps se aplican a los tuyos:

- Una orden solo se abre dentro de los límites de riesgo de la cartera (tamaño de posición, reserva de caja, saldo del bróker). Si el contexto de la cartera no se puede leer, la orden se rechaza en vez de adivinar.
- Un bot solo llega a producción con un performance test aprobado; una promoción sin evidencia se rechaza.
- **Wait before to Open**: si una cartera lo tiene activado, una orden abierta por el agente espera tu aprobación; al agente se le dice que está pendiente, no abierta.
- Un token actúa solo sobre tu cuenta. Las carteras, órdenes y bots de otros usuarios no existen para él.

## Rotar o revocar

- **Rotate token** (expande la fila): emite un token nuevo y lo muestra una vez. El anterior queda revocado de inmediato y todo agente que lo use deja de funcionar hasta que lo reconfigures.
- **Revoke access…** (menú ⋯ de la fila): elimina la conexión y revoca su token. Nada más cambia: tus carteras, órdenes e historial se conservan.

Esta integración no tiene acción **Verify connection**: el token se comprueba en cada llamada, así que en el momento en que deje de funcionar tu agente te lo dirá.

## Seguridad

- Solo se guarda el identificador del token; el secreto se muestra al crearlo o rotarlo y nunca más.
- El cliente envía el token en la cabecera `Authorization` sobre HTTPS. Mantenlo fuera de repositorios y de ficheros de configuración compartidos.
- Cada llamada corre con tu identidad y tu plan, decididos en el servidor. Un cliente no puede reclamar otro plan ni otro rol.
- Las capacidades de administración y de research no son alcanzables por conexiones MCP, pida lo que pida el cliente.

## Conviene saber

- Una conexión por cliente es la forma más fácil de saber qué agente hizo qué: la línea del token muestra **Created** y **Last used**.
- Los agentes trabajan mejor si cargan primero una skill. Si tu cliente admite prompts MCP, empieza la tarea con la skill de su dominio.
- Rotar el token invalida las sesiones abiertas con el anterior; reconecta el cliente después de rotar.
