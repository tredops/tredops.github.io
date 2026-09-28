---
title: Integraciones
description: Conecta tu bróker, tus proveedores de IA y tus fuentes de señales a TredOps sin perder el control de ninguna credencial.
---

Una integración es una conexión entre TredOps y un servicio que ya usas. Se añade una vez desde **Dashboard → Integraciones** y, a partir de ahí, la plataforma puede ejecutar, leer o recibir en tu nombre con las reglas que tú fijes.

## Los cuatro tipos

| Tipo | Qué aporta | Ejemplos |
|------|------------|----------|
| **Bróker** | Ejecución de órdenes y datos de mercado en una cuenta real | Alpaca (paper y real) |
| **IA · LLM** | Los modelos con los que piensan tus agentes, facturados a tu cuenta | OpenRouter, DeepSeek, OpenAI, NVIDIA |
| **Señales** | Entradas y salidas decididas fuera de TredOps | [TradingView](/es/integrations/tradingview/) |
| **Notificaciones** | Tus notificaciones, aprobaciones y chat con el agente fuera del dashboard | [Telegram](/es/integrations/telegram/) |

La integración de bróker es donde está tu dinero. La de IA es donde razonan tus agentes. La de señales es de donde vienen las decisiones. Se combinan: una alerta de TradingView puede abrir una posición que ejecuta el bróker, supervisa un agente y apruebas tú desde Telegram.

## Conectar, verificar, desconectar

1. **Conectar.** Abre Integraciones, pulsa el botón ⊕ y elige el servicio. Cada uno pide lo suyo: una autorización OAuth para un bróker, una API key para un proveedor de modelos, un formulario corto para una fuente de señales.
2. **Verificar.** La lista ofrece **Verify connection** en toda integración que admita comprobación. Responde si la credencial sigue funcionando, no si alguna vez fue correcta.
3. **Desconectar.** El menú ⋯ de la fila elimina la integración y revoca el token que usaba TredOps. El historial se conserva: las posiciones cerradas, las señales pasadas y los informes no se borran al desconectar.

Al expandir una fila se abre su panel, que es donde viven los detalles de ese servicio concreto.

## Cómo se guardan tus credenciales

- Todo secreto de una integración se **cifra en reposo** y no vuelve al navegador una vez guardado. El dashboard muestra una pista enmascarada, nunca el valor.
- Los tokens que TredOps se acuña a sí mismo tienen **alcance limitado**: un token de webhook autentica en su webhook y en ningún otro sitio, y lleva solo el permiso que necesita.
- Rotar un secreto revoca el anterior de inmediato. Nada más de la integración cambia.
- **No custodiamos fondos**: tu capital sigue en la cuenta de tu bróker. TredOps ejecuta y monitoriza, nunca tiene el dinero.

## Límites por plan

Algunas integraciones están limitadas por plan, por ejemplo cuántos webhooks de TradingView puede tener un usuario o cuántos bots puede correr cada uno. Al llegar al límite el dashboard lo dice en el momento de conectar y la mejora de plan está a un clic. Los límites nunca afectan a integraciones ya conectadas.
