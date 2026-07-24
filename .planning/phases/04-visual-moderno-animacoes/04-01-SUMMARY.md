# Summary 04-01: Visual Moderno & Animações

**Fase:** 4 — Visual Moderno & Mobile (INSERIDA)
**Concluído:** 2026-07-24

## O que foi entregue

- `src/animations.ts` — helpers anime.js v4 (`pageIn`, `staggerIn`, `bounce`, `elasticIn`, `knobSpring` com `createSpring`), todos com guarda de `prefers-reduced-motion`
- `src/components/Header.tsx` — nav global sticky com blur: links **Página Inicial** e **Ver Setup** (NavLink com sublinhado ativo), botão **Novo Setup** no canto superior direito (compacto "+" no mobile); cobre a "volta ao menu inicial" em qualquer tela
- `Knob.tsx` — indicador com física de mola ao mudar valor por input/clique/teclado (`anguloExibido` animado; direto durante drag); LED escala ao arrastar (CSS); bounce no toggle ON/OFF (`ParamField`)
- Entradas animadas: stagger nos knobs da pedaleira e nos cards da listagem (repete ao trocar filtro), entrada de página em todas as telas, toast com mola elástica, hero da Home
- CSS moderno mobile-first: blobs de gradiente animados no fundo, painéis glass (backdrop-blur), gradiente no título da Home, botões com glow, pedaleira em **grade 5×2 no mobile** com knobs maiores, safe-area, `@media (prefers-reduced-motion: reduce)` desliga animações CSS
- Botões "Voltar" removidos das páginas (nav global cobre); "Gerenciar Tags" virou link sutil na listagem

## Verificação

- `npm test` → 14/14 verde
- `npm run build` → sem erros (bundle 226 kB / 76 kB gzip com anime.js)
- `npm run preview` → 200

## Requisitos/decisões

- Atende ao pedido do solicitante: visual atual, anime.js, mobile-first, nav com Página Inicial/Ver Setup, Novo Setup como botão no topo direito, volta ao menu na listagem

## Aprendizados

- Cleanup de `useEffect` não pode retornar `animation.cancel()` (tipo); envolver em bloco.
- anime.js v4: `createSpring({stiffness, damping, mass})` como `ease` para molas; animar objeto JS `{angulo}` + `onUpdate` integra bem com estado React (ângulo exibido separado do valor).
