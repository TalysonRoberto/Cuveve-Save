# Summary 01-01: Fundação & Dados

**Fase:** 1 — Fundação & Dados
**Concluído:** 2026-07-24

## O que foi entregue

- Scaffold Vite + React 18 + TS + react-router-dom (HashRouter, `base: './'` para uso local/mobile) + vitest
- `src/types.ts` — modelo completo: `PARAM_DEFS` (10 parâmetros na ordem física do pedal, com grupo/cor, faixa, contínuo vs snap), `Setup`, `Tag`, `createDefaultParametros()` (0/ativo), `clampValor()`, normalização de tag
- `src/storage.ts` — camada localStorage versionada (`cuvave-save:v1:*`) com fallback em memória; CRUD de setups, duplicate com nome sem colisão, createOrGetTag com unicidade normalizada, rename/delete tag com desvínculo, countSetupsByTag
- App shell com rotas `/`, `/setups`, `/setups/novo`, `/setups/:id`, `/tags`; Home com as duas ações principais; placeholders das fases 2–3
- `src/styles.css` — tema escuro do pedal, variáveis de cor por grupo, botões/inputs/chips/cards responsivos
- `src/storage.test.ts` — 7 testes cobrindo CRUD, duplicata, normalização e desvínculo de tags

## Verificação

- `npm test` → 7/7 verde
- `npm run build` → compila sem erros de TS

## Requisitos cobertos

HOME-01, HOME-02, SET-04, NFR-01

## Decisões

- HashRouter + `base: './'`: app funciona em qualquer servidor estático e até via `file://`, sem config
- Storage com fallback em memória: testes rodam em node puro, sem jsdom

## Prontidão para próxima fase

Modelo e storage prontos para o Pedalboard consumir (`PARAM_DEFS`, `clampValor`, `Parametros`).
