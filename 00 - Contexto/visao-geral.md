---
tipo: contexto
area: projeto
status: ativo
tokens: baixo
fonte:
  - .planning/PROJECT.md
  - package.json
atualizado: 2026-07-24
tags: [overview, stack]
---

> [!tldr] TL;DR
> **Cuvave-Save** é um web app local (React + Vite + TS, localStorage — sem backend) para músicos salvarem e gerenciarem "setups" da pedaleira Cuvave. Reproduz visualmente a fileira de 10 knobs do pedal (cores e ordem fiéis) com ajuste por arraste ou digitação, e funciona como catálogo: criar, listar, filtrar por tags, visualizar, editar, duplicar e excluir setups.

# Visão Geral do Projeto

## O que é
Catálogo digital de setups da pedaleira Cuvave. O músico configura os 10 parâmetros (VOLUME, IR CAB, REVERB, MIX, FB, TIME, MOD, TONE, GAIN, TYPE) numa reprodução visual do pedal e salva nome + tags + valores + estados ativo/desativado de cada parâmetro. Ferramenta individual, offline-first.

## Stack
| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Roteamento | react-router-dom |
| Persistência | localStorage (sem backend) |
| Estilo | CSS próprio (tema escuro do pedal) |
| Testes | vitest (lógica de storage/modelo) |

## Como rodar (dev)
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção (checa TS)
npm test         # testes da camada de dados
```

## Estrutura do código (alto nível)
- `src/types.ts` → modelo de dados (Setup, Tag, Parametro, PARAM_DEFS)
- `src/storage.ts` → camada de persistência localStorage (CRUD setups/tags, normalização de tag)
- `src/components/Knob.tsx` → knob interativo (contínuo 0–100 e snap 0–8)
- `src/components/Pedalboard.tsx` → fileira dos 10 knobs com cores do pedal
- `src/pages/` → Home, SetupEdit (criar/editar/visualizar), SetupList, TagManager
- Ver notas de arquitetura em [[01 - Arquitetura]]

## Decisões e dívidas que moldam o projeto
- Decisões: [[03 - Decisões]] + tabela Decisões Chave em `.planning/PROJECT.md`
- PRD original com pontos fechados: `.planning/PROJECT.md` § Contexto
- Dívidas: ver painel em [[_INDICE]]
