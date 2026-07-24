# Summary 02-01: Pedaleira Visual

**Fase:** 2 — Pedaleira Visual
**Concluído:** 2026-07-24

## O que foi entregue

- `src/components/knobMath.ts` — faixa angular −135°..+135°, `valueToAngle`/`angleToValue` (clamp+round), `stepAngles`/`snapAngle` (9 posições), `pointerAngle` (atan2, 12h=0° horário)
- `src/components/Knob.tsx` — SVG: dome com gradiente, LED interno na cor do grupo (cinza desativado), indicador rotacionado, anel com 9 pontos **clicáveis** (só knobs 0–8), drag rotativo com zona morta no fundo (evita salto de extremo), teclado (setas/Home/End) com `role="slider"`, roda do mouse
- `src/components/ParamField.tsx` — label + Knob + input numérico (sync bidirecional, clamp, permite redigitar com clamp no blur) + toggle ON/OFF que preserva valor
- `src/components/Pedalboard.tsx` — painel do pedal com marca CUVAVE, fileira dos 10 params (scroll horizontal no mobile), 3 footswitches A/B/C decorativos (aria-hidden, sem letras de banco)
- `SetupEdit` renderiza o Pedalboard com estado local (base da criação; Fase 3 completa o form)
- CSS do pedal: painel escuro, labels coloridas por grupo, estado OFF com opacidade + grayscale (não só cor)

## Verificação

- `npm test` → 14/14 verde (7 storage + 7 knobMath)
- `npm run build` → sem erros

## Requisitos cobertos

KNOB-01..08, NFR-02

## Aprendizados

- Zona morta angular (|ângulo|>135° no fundo) precisa ser ignorada no drag, senão o valor salta de extremo a extremo ao cruzar as 6h.
- IDs de gradiente SVG precisam de `useId` por instância (10 knobs na mesma página).

## Prontidão para próxima fase

Pedalboard controlado por `parametros` + `onChange` — a tela de criação/edição só precisa ligar nome, tags e storage.
