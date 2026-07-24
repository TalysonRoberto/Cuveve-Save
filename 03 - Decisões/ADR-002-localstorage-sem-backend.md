---
tipo: decisao
area: dados
status: ativo
tokens: baixo
decisao: aceita
data: 2026-07-24
fonte:
  - src/storage.ts
atualizado: 2026-07-24
tags: [adr, storage, stack]
---

> [!tldr] TL;DR
> v1 usa **localStorage** como única persistência — sem backend, sem login. Aceito porque a ferramenta é individual e offline; o custo (dados presos ao navegador/dispositivo) é assumido e mitigável depois por export/import JSON (v2).

# ADR-002: localStorage sem backend

## Contexto

O PRD deixava aberto: ferramenta local/individual ou multi-usuário com login? O solicitante decidiu: **web local, single-user**.

## Decisão

Persistir setups e tags em `localStorage` (chaves versionadas `cuvave-save:v1:*`), atrás de uma camada (`src/storage.ts`) que isola o resto do app do mecanismo.

## Alternativas consideradas

- **Supabase/Postgres + auth** — rejeitada: infra, conta e complexidade para uma ferramenta de um músico só.
- **IndexedDB** — rejeitada: volumes pequenos (dezenas de setups), localStorage síncrono é mais simples.
- **Arquivo JSON manual (export/import)** — adiada para v2 como complemento de backup, não como store primário.

## Consequências

- ✓ Zero infra, funciona offline, build estático.
- ✓ Troca futura de backend só toca `storage.ts`.
- ⚠️ Dados ficam presos ao navegador/dispositivo; limpar dados do site apaga tudo → export/import (v2) mitiga.
- ⚠️ localStorage síncrono — ok neste volume; se crescer, migrar camada para IndexedDB sem mudar a API (hoje síncrona).

Relacionado: [[modelo-de-dados]]
