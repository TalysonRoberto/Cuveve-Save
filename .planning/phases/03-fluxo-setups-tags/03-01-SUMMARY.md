# Summary 03-01: Fluxo de Setups & Tags

**Fase:** 3 — Fluxo de Setups & Tags
**Concluído:** 2026-07-24

## O que foi entregue

- `src/components/Toast.tsx` — `useToast()` com auto-hide + componente fixo `role="status"`
- `src/components/TagInput.tsx` — chips removíveis + autocomplete (filtra enquanto digita, exclui já selecionadas) + opção `Criar tag "[nome]"` quando não há match exato normalizado; Enter adiciona match ou cria; Backspace apaga última chip
- `src/pages/SetupEdit.tsx` — criar (`/setups/novo`) e editar (`/setups/:id`, editável por decisão); nome obrigatório com erro inline; salva e redireciona para `/setups` com toast via `location.state`; Duplicar e Excluir (confirm) no modo edição; trata setup não encontrado
- `src/pages/SetupList.tsx` — cards clicáveis (nome + chips + data), filtro instantâneo com chips "Todas" + tags (setups sem tag aparecem em "Todas"), links Novo Setup / Gerenciar Tags, toast pós-ação
- `src/pages/TagManager.tsx` — criar, renomear inline (Enter/Esc), excluir com confirm informando vínculos, contagem de setups por tag
- CSS: toast, dropdown de sugestões, grid de cards, filtro, linhas do gerenciador

## Verificação

- `npm test` → 14/14 verde
- `npm run build` → sem erros
- `npm run preview` → app servido (200 + bundle)

## Requisitos cobertos

SET-01,02,03,05,06,07,08 · TAG-01..04 · LIST-01..04 · VIEW-01,02

## Decisões

- Toast pós-salvar entregue via `location.state` na listagem (redirect + feedback sem refresh)
- Visualização editável: mesma tela para ver e editar, sem modo travado (decisão do solicitante)
- Excluir tag avisa quantos setups serão desvinculados (setups preservados)
