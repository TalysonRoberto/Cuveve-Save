---
tipo: aprendizado
area: pedaleira
status: ativo
tokens: baixo
fonte:
  - src/components/Knob.tsx
  - src/components/knobMath.ts
atualizado: 2026-07-24
tags: [knob, drag, svg, gotcha]
---

> [!tldr] TL;DR
> Num knob rotativo com faixa −135°..+135°, o ângulo do ponteiro **salta de +180° para −180°** ao cruzar as 6h. Se não tratar, o valor pula de mínimo a máximo no meio do drag. Solução: ignorar movimentos na zona morta (|ângulo| > 135°).

# Knob rotativo: a zona morta das 6h

## O problema

`pointerAngle` usa `atan2(dx, -dy)`, que devolve −180°..+180°. O knob usa só −135°..+135°; entre 135° e 225° (o fundo) o ângulo cruza a descontinuidade ±180°. Arrastando perto das 6h, o valor oscilava entre os extremos.

## A solução

No handler de drag (`Knob.tsx → emitirAngulo`): se o ângulo cair fora de [−135°, 135°], **ignorar o evento** (manter último valor). O knob simplesmente "trava" no extremo até o ponteiro voltar à faixa válida — comportamento padrão de knobs rotativos reais.

## Relacionado

- Outros gotchas do Knob: IDs de `<radialGradient>` SVG precisam ser únicos por instância (`useId`) — são 10 knobs na mesma página.
- Implementação: [[pedaleira-knobs]]
