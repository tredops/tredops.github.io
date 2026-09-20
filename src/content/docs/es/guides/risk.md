---
title: Gestionar el riesgo
description: Take Profit, Stop Loss, tamaño de posición y reserva de liquidez. Las reglas que hacen que una mala racha no se convierta en un problema.
---

La razón de ser de TredOps no es acertar más, es **perder menos por descuido**.
Esta página reúne las reglas de riesgo de la plataforma y cómo configurarlas.

## La regla que no se puede desactivar

**Toda orden abierta a través de TredOps lleva Take Profit y Stop Loss.** No hay
una casilla para quitarlo, ni para los agentes, ni para las tareas programadas,
ni para el modo autónomo.

El motivo es el que aparece en el origen del producto: la mayoría de pérdidas
evitables no vienen de elegir mal, sino de no tener decidido de antemano cuándo
salir.

## Los cuatro parámetros

### Take Profit

El precio al que se cierra la posición en ganancias. Se fija al abrir, a partir
de la calibración de la estrategia para ese activo.

Un Take Profit demasiado ajustado corta las operaciones buenas antes de tiempo;
uno demasiado lejano deja que una ganancia se evapore.

### Stop Loss

El precio al que se cierra la posición en pérdidas. Es el parámetro más delicado:
un stop demasiado estrecho lo barre el ruido normal del activo, y acabas saliendo
con pérdida de una operación que iba a funcionar.

Por eso TredOps lo calcula a partir de la **volatilidad reciente del activo**, no
con un porcentaje fijo igual para todo. Un ETF defensivo y una cripto no pueden
llevar el mismo stop.

### Tamaño máximo por posición

Cuánto capital del portfolio puede ir a una sola posición. El valor por defecto
es un **25 %**: aunque una posición se vaya a cero, el portfolio sobrevive.

Bájalo si operas activos correlacionados —tres posiciones en el mismo sector no
son tres apuestas distintas, son una apuesta triplicada—.

### Reserva de liquidez

El porcentaje del portfolio que nunca se invierte, por defecto un **10 %**. Sirve
para poder reaccionar: promediar, cubrir o entrar en una oportunidad sin tener
que cerrar antes otra posición a destiempo.

## Dónde se configuran

| Nivel | Qué fija | Dónde |
|-------|----------|-------|
| **Portfolio** | Tamaño máximo por posición, reserva de liquidez, filtros de señal | Dashboard → Portfolios → Ajustes |
| **Bot** | Niveles de Take Profit / Stop Loss por estrategia | Dashboard → Bots → Configuración |
| **Orden** | Ajuste puntual antes de abrir | Al confirmar la orden |

Las reglas del portfolio **mandan sobre todo lo demás**. Si un agente propone una
operación que se las salta, la operación no se abre — no es una advertencia, es
un bloqueo.

## Monitoring: lo que pasa después de abrir

Una vez abierta la posición, un proceso periódico la vigila:

1. Obtiene el precio actual del activo.
2. Vuelve a evaluar la posición con la misma estrategia con la que se abrió.
3. Cierra si se alcanza el Take Profit, si se toca el Stop Loss, o si la propia
   estrategia indica salir antes que ninguno de los dos.

Es decir: no esperas a que el precio toque un nivel si la estrategia ya dice que
la razón para estar dentro desapareció.

## Cómo empezar

Si no sabes qué valores poner, empieza por aquí y ajusta con datos, no con
intuición:

- **Máximo por posición**: 15 %
- **Reserva de liquidez**: 20 %
- **Posiciones simultáneas**: 3 o 4
- **Modo del agente**: Plan durante las dos primeras semanas

Cuando lleves un par de meses de historial propio, revisa cuál de estos límites
te ha estorbado de verdad y cuál te ha salvado.

## Errores habituales

- **Ensanchar el stop porque la posición va en pérdidas.** Es la forma más rápida
  de convertir una pérdida asumible en una que duele.
- **Concentrar en un sector.** Cinco posiciones tecnológicas en un mal día para
  la tecnología son una sola posición muy grande.
- **Confundir modo autónomo con desatendido.** Autónomo significa que ejecuta
  solo, no que no haya que mirarlo.

## Siguiente paso

- [Monitoring](../../pillars/monitoring/) — el detalle del pilar completo.
- [Seguridad](../../security/) — qué controla TredOps y qué controlas tú.
