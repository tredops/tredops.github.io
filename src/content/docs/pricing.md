---
title: Planes y precios
description: Free Trial, prueba Premium y plan Premium de TredOps, con lo que incluye cada uno y cómo funcionan los créditos de LLM.
---

TredOps tiene un plan gratuito para probar, una prueba de pago corta y un plan
Premium. Todo se gestiona desde **Ajustes → Facturación**.

:::note
Los precios de esta página son la referencia pública. La página de
[tredops.com](https://tredops.com) manda en caso de discrepancia, y las ofertas
de lanzamiento pueden cambiar.
:::

## Comparativa

| | **Free Trial** | **Prueba Premium** | **Premium** |
|---|---|---|---|
| Precio | Gratis, 14 días | $4,99 / 7 días | $24,99 / mes |
| Bots y agentes mantenidos por TredOps | ✅ | ✅ | ✅ |
| Monitoring (Take Profit / Stop Loss) | Básico | Básico | Avanzado |
| Bots activos | 2 | 2 + 1 propio | 10 |
| Activos por bot | — | — | 30 |
| Portfolios | 1 | 1 | Ilimitados |
| Playground / ExpertMode | ❌ | Temporal | ✅ |
| Bots propios (optimización y calibración) | ❌ | 1 | ✅ |
| Multi-agentes, sub-agentes y AgentTask | ❌ | ❌ | ✅ |
| Signal Pool | Parcial | Parcial | Completo |
| Benchmark | Visualización | Visualización | Completo + histórico |
| Créditos de LLM | Limitados | Ampliados | Extendidos |
| Integraciones de broker | ✅ | ✅ | ✅ |
| Soporte | Estándar | Estándar | Prioritario |

## Free Trial (14 días)

Acceso completo a los bots y agentes **mantenidos por el equipo de TredOps**, con
créditos de LLM limitados pero suficientes para usarlos de verdad, no para mirar.

No hace falta tarjeta. Al terminar los 14 días —o al agotar los créditos— puedes
pasar a Premium o quedarte en modo limitado, con los bots y agentes mantenidos
por TredOps y algunas restricciones.

## Prueba Premium ($4,99 · 7 días)

Todo lo del Free Trial más créditos ampliados, acceso temporal al **Playground**
y la posibilidad de crear **un bot propio**.

Al contratarla se guarda la tarjeta y se programa el paso automático a Premium al
cabo de los 7 días. Puedes cancelar antes desde Facturación y no se cobra nada
más.

## Premium

**$24,99 / mes**, o **$19,99 / mes** pagando anualmente (ahorras un 20 %).

Incluye todo lo de la tabla: Playground completo, creación y optimización de bots
propios con calibración automática, multi-agentes y sub-agentes, AgentTask,
Signal Pool completo, Monitoring avanzado, portfolios ilimitados, hasta 10 bots
activos con hasta 30 activos cada uno, y el histórico completo del Benchmark.

**Oferta de lanzamiento:** $14,99 / mes durante los tres primeros meses. Después
pasa a $24,99 / mes, o a $19,99 si elegiste el plan anual.

## Créditos de LLM

Cada mensaje del chat, cada ejecución de una AgentTask y cada decisión de un
agente autónomo consumen **créditos**, porque detrás hay un modelo de lenguaje
trabajando.

Tu plan incluye una bolsa de créditos. Cuando se agota tienes dos opciones:

1. **Comprar un pack de créditos adicional** dentro de TredOps.
2. **Conectar tu propio proveedor** (OpenRouter, DeepSeek…) en
   [Integraciones](../pillars/integrations/) y consumir de tu cuenta.

La segunda opción es la más razonable si usas agentes de forma intensiva: pagas
el coste real del modelo, sin intermediación.

### Cómo gastar menos

- Baja la frecuencia de las AgentTask. Una revisión cada hora suele bastar; una
  cada cinco minutos multiplica el gasto sin mejorar las decisiones.
- Usa modelos económicos para tareas rutinarias y reserva los caros para el
  análisis.
- Escribe instrucciones concretas: un prompt ambiguo hace que el agente dé más
  vueltas, y cada vuelta cuesta.

La barra de consumo del dashboard mide el gasto **desde tu última recarga**, para
que sepas cuánto te queda del ciclo en curso.

## Facturación

- Pagos con tarjeta a través de Stripe. TredOps no almacena los datos de tu
  tarjeta.
- Puedes cambiar de plan, pasar a anual o cancelar desde **Ajustes →
  Facturación**.
- Al cancelar mantienes el acceso hasta el final del periodo ya pagado.
- Las facturas se descargan desde el portal de facturación.

## Preguntas frecuentes

**¿Qué pasa con mis bots si bajo de plan?**
Siguen existiendo, pero los que excedan el límite del plan nuevo quedan
desactivados. No se borra nada; los reactivas si vuelves a subir.

**¿Los créditos no usados se acumulan?**
No. Los créditos incluidos en el plan corresponden al ciclo y no se arrastran al
siguiente. Los packs adicionales que compres sí permanecen hasta que los gastes.

**¿Necesito Premium para usar el Benchmark?**
No. Cualquier plan —y cualquier visitante de esta documentación— puede ver las
[ediciones publicadas](../benchmark/). Premium añade el histórico completo dentro del
dashboard.
