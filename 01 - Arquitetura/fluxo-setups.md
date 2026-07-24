---
tipo: arquitetura
area: setups
camada: frontend
status: ativo
tokens: medio
fonte:
  - src/App.tsx
  - src/pages/Home.tsx
  - src/pages/SetupEdit.tsx
  - src/pages/SetupList.tsx
  - src/pages/TagManager.tsx
  - src/components/TagInput.tsx
  - src/components/Toast.tsx
atualizado: 2026-07-24
tags: [telas, rotas, fluxo]
---

> [!tldr] TL;DR
> SPA com HashRouter: `/` Home, `/setups` listagem, `/setups/novo` e `/setups/:id` mesma tela (criar/editar — visualização **editável** por decisão), `/tags` gerenciador. Toast pós-salvar viaja por `location.state` para a listagem. Sem backend: tudo lê/grava via `storage.ts`.

# Fluxo de Setups & Telas

## Rotas (HashRouter + `base: './'`)

| Rota | Página | Notas |
|---|---|---|
| `/` | Home | Só 2 ações: Ver Setups / Salvar Novo Setup, sem scroll |
| `/setups` | SetupList | Cards clicáveis + filtro chips ("Todas" + tags, instantâneo) + toast pós-ação |
| `/setups/novo` | SetupEdit | Modo criar: params default 0/ativo |
| `/setups/:id` | SetupEdit | Modo editar: carrega estado salvo; Salvar/Duplicar/Excluir |
| `/tags` | TagManager | Criar/renomear inline/excluir com contagem de uso |

## Decisões de fluxo

- **Visualização = edição**: `/setups/:id` abre fiel ao salvo e já permite alterar/ressalvar (sem modo travado) — decisão do solicitante.
- **Toast pós-salvar**: salvar redireciona para `/setups` com `location.state.toast`; a listagem exibe e limpa via `history.replaceState`.
- **Validação de nome**: bloqueia salvar com erro inline (`erroNome`), some ao digitar.
- **Excluir setup/tag**: `window.confirm`; excluir tag avisa quantos setups serão desvinculados (setups preservados).

## TagInput (múltiplas tags por setup)

Chips removíveis (×, ou Backspace com campo vazio) + dropdown: filtra existentes enquanto digita (exclui já selecionadas), oferece `Criar tag "[nome]"` quando não há match exato **normalizado** — "som pesado" reutiliza "Som Pesado" (ver [[modelo-de-dados]]). Enter = adiciona match ou cria.

Relacionado: [[pedaleira-knobs]], [[modelo-de-dados]]
