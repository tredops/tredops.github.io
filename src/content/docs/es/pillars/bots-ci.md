---
title: Bots (Integración Continua)
description: Crea, optimiza y gestiona bots de trading con calibración automática y Signal Pool.
---

El pilar de **Integración Continua de Bots** es la capa de creación, optimización y gestión continua de bots de trading.

TredOps permite crear bots a partir de cualquier activo disponible, usando algoritmos propietarios. Desde la plataforma puedes generar un bot completo con estas capacidades:

- **Datos de mercado** — Obtención de datos OHLCV en tiempo real e históricos del activo.
- **Optimización** — Ajuste de parámetros mediante algoritmos genéticos y optimización propietaria (experimentación y mejora continua).
- **Performance Testing** — Pruebas sobre periodos históricos y evaluación del rendimiento real bajo condiciones de mercado inesperadas.
- **Gestión de calidad** — Solo los bots que superan los umbrales mínimos de calidad pasan a producción; el resto permanece en **staging** ejecutándose en segundo plano.
- **Calibración automática** — Cada bot tiene su propio calendario de calibración y se ajusta de forma periódica y automatizada a las condiciones recientes del mercado.
- **Signal Pool** — Cada operación generada por un bot se incorpora a un pool de señales disponible para que otros agentes la analicen y determinen si es una oportunidad real.

## Calibración

La calibración determina los parámetros óptimos para un activo y una estrategia. Es la **fuente de verdad** para evaluar órdenes.

- Se encola automáticamente para procesamiento asíncrono.
- Se ejecuta contra datos históricos y guarda scores y resultados del experimento.
- Al abrir una nueva orden, el sistema busca la mejor calibración válida, evitando *look-ahead bias* (no se usan datos futuros en la evaluación).

## Crear bots por sector

Puedes crear bots **en masa por sectores económicos**:

1. Selecciona el sector económico.
2. Filtra por exchange y tipo de activo (ETFs, stocks, crypto).
3. Descarta los símbolos que ya cubres con bot propios o públicos.
4. Confirma el lote: TredOps genera, calibra y evalúa cada bot de forma independiente.

Solo se crean bots de activos con estado `active`.

## Búsqueda y gestión

El dashboard de bots permite visualizar, filtrar, crear y eliminar bots y sus configuraciones:

- Tabs por estado: All, Completed, Queued, Calibration, Failed, Public, Private.
- Filtros por status de calibración, stage (production/staging) y visibilidad.
- Búsqueda por símbolo o nombre.
- Configuración de **Stop Loss** y **Take Profit** por bot.

## Signal Pool

El **Signal Pool** es el conjunto de señales de trading (órdenes emitidas por los bots) disponibles para análisis. Es la capa compartida entre bots y agentes: cada señal puede ser consumida por los agentes para decidir si constituye una oportunidad real antes de actuar.

## Servicios que lo hacen posible

Este pilar se apoya en el motor de evaluación, el motor de trading y el dashboard. No necesitas interactuar con ninguno de ellos por separado: la plataforma lo coordina todo por ti.