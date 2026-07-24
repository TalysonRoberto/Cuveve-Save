---
tipo: banco
area: dados
status: ativo
tokens: baixo
fonte:
  - src/types.ts
  - src/storage.ts
atualizado: 2026-07-24
tags: [localstorage, schema]
---

> [!tldr] TL;DR
> "Banco" = 2 coleções em localStorage: `cuvave-save:v1:setups` e `cuvave-save:v1:tags` (arrays JSON). Setup referencia tags por `tagIds[]` (N:N). Tags têm unicidade **normalizada** (trim + espaços simples + case-insensitive). Em testes, cai num Map em memória — sem jsdom.

# Modelo de Dados (localStorage)

## Coleções

**`cuvave-save:v1:setups`** → `Setup[]`
```
Setup { id, nome, tagIds: string[], parametros: Parametros, criadoEm, atualizadoEm }
Parametros = Record<ParametroKey, { valor: number, ativo: boolean }>  // 10 chaves fixas
```

**`cuvave-save:v1:tags`** → `Tag[]`
```
Tag { id, nome, criadoEm }
```

## Regras

- **10 parâmetros fixos** (`PARAM_DEFS`): volume(0–100, contínuo), ir_cab/reverb(verde), mix/fb/time/mod(azul), tone/gain/type(vermelho) — todos 0–8 com snap. Default de criação: 0 + ativo.
- **Normalização de tag**: `normalizeTagKey` (trim, colapsa espaços, lowercase) para comparar; `normalizeTagDisplay` preserva caixa para exibição. `createOrGetTag` nunca duplica.
- **deleteTag** desvincula de todos os setups (setups não são apagados). **duplicateSetup** gera "X (cópia)", "X (cópia 2)"… sem colisão.
- **Resiliência**: JSON corrompido → retorna `[]` (não derruba o app); `localStorage` indisponível → Map em memória.
- **IDs**: `crypto.randomUUID()` com fallback.
- Sem migração ainda — chaves já versionadas (`v1`) para futura migração.

Relacionado: [[pedaleira-knobs]], [[fluxo-setups]], [[ADR-002-localstorage-sem-backend]]
