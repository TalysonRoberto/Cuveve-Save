---
tipo: arquitetura
area: pedaleira
camada: frontend
status: ativo
tokens: medio
fonte:
  - src/components/Knob.tsx
  - src/components/knobMath.ts
  - src/components/ParamField.tsx
  - src/components/Pedalboard.tsx
  - src/animations.ts
  - src/types.ts
atualizado: 2026-07-24
tags: [knob, pedalboard, svg, animacao]
---

> [!tldr] TL;DR
> A pedaleira é 3 componentes aninhados: `Pedalboard` → `ParamField` → `Knob` (SVG). Toda a física do giro está em `knobMath.ts` (pura, testada); as animações (mola do indicador, stagger de entrada) vêm de `animations.ts` (anime.js v4). `PARAM_DEFS` em `types.ts` é a fonte única de ordem, rótulos, faixas e cores. No mobile retrato os parâmetros viram uma coluna vertical (knob + controles por linha); na paisagem mantém a fileira horizontal. Footswitches A/B/C removidos na v1.2.

# Pedaleira & Knobs

## Hierarquia

- **`Pedalboard`** — painel do pedal: marca CUVAVE, fileira dos 10 `ParamField`. Desktop: fileira única (scroll horizontal). Mobile retrato: **pedal totalmente vertical igual ao print** — painel estreito/alto, ordem invertida (`column-reverse`, TYPE no topo, VOLUME embaixo), labels girados 90° à esquerda de cada knob, valor e toggle à direita, logo CUVAVE girado na parte inferior. Mobile paisagem: fileira horizontal (como desktop). Aceita prop `readOnly`.
- **`ParamField`** — um parâmetro completo: label colorida por grupo + `Knob` + `<input type="number">` + toggle ON/OFF. Sync bidirecional com `clampValor`; input permite apagar/redigitar e clampa no blur; desativar preserva `valor`. Suporta `readOnly` (input/toggle disabled, knob sem interação).
- **`Knob`** — SVG 100×100: dome com gradiente (`useId` por instância!), LED interno na cor do grupo (cinza OFF), indicador rotacionado, anel com 9 pontos **clicáveis** só nos knobs 0–8. Interações: drag rotativo (pointer capture), teclado (setas/Home/End, `role="slider"`), roda do mouse.

## knobMath.ts (pura)

Faixa angular −135°..+135° (12h = 0°, horário). `valueToAngle`/`angleToValue` (clamp+round), `stepAngles(9)`/`snapAngle`, `pointerAngle` (atan2).
⚠️ **Zona morta**: ângulos |a| > 135° (fundo do knob) são **ignorados** no drag — ver [[2026-07-24-knob-zona-morta]].

## Animação do indicador (anime.js)

O Knob separa **valor** (prop) de **ângulo exibido** (state): mudança externa (input/clique/teclado) dispara `knobSpring` (`createSpring`) animando um objeto `{angulo}` com `onUpdate` → state; durante o drag o ângulo segue direto (cancela a mola). Guarda de `prefers-reduced-motion` em todos os helpers. LED escala via CSS no `:active`; toggle ON/OFF dispara `bounce` no wrapper. Cleanup de effect não pode retornar `animation.cancel()` (TS) — usar bloco.

## Layout responsivo

Desktop e mobile paisagem: fileira única com scroll horizontal (`display: flex; overflow-x: auto`). **Mobile retrato (≤720px, orientation: portrait): pedal totalmente vertical, sem scroll** — painel estreito/alto (`width: min(92vw, 300px)`), `.pedal-knobs` usa `column-reverse` para inverter a ordem (TYPE no topo, VOLUME embaixo); cada `.param` vira uma linha (`display: grid`, 4 colunas: label girado + knob + valor + toggle), divisores entre parâmetros; labels usam `writing-mode: vertical-rl` + `rotate(180deg)`. Logo CUVAVE girado na parte inferior. Knob reduzido (~42-58px) para caber todos os 10 visíveis. Entrada em cascata (`staggerIn` nos `.param`) na montagem.

## Estado desativado (acessibilidade)

Cinza via `grayscale(1)` + `opacity 0.45` + toggle mostrando texto "OFF" — nunca só cor. `aria-disabled` no knob, `aria-pressed` no toggle.

## Cores por grupo

CSS vars `--grupo-{branco,verde,azul,vermelho}`; o Knob recebe a cor resolvida e cai para `--desativado` quando OFF.

Relacionado: [[modelo-de-dados]], [[fluxo-setups]]
