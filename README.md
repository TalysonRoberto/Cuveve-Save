# Cuvave-Save

Aplicação web/mobile para salvar e gerenciar presets da pedaleira Cuvave.

## O que faz

- **Criar setups** com nome, tags e valores dos 10 parâmetros da pedaleira
- **Visualizar e editar** rapidamente um setup salvo
- **Duplicar** setups existentes como ponto de partida
- **Filtrar por tags** na lista de setups
- **Gerenciar tags** (criar, renomear, excluir)

## Parâmetros suportados

| Param | Faixa | Grupo |
|-------|-------|-------|
| TYPE | 1–9 | Vermelho |
| GAIN | 1–9 | Vermelho |
| TONE | 1–15 | Vermelho |
| MOD | 1–15 | Azul |
| TIME | 1–30 | Azul |
| FB | 1–100 | Azul |
| MIX | 1–100 | Azul |
| REVERB | 1–15 | Verde |
| IR CAB | 1–9 | Verde |
| VOLUME | 0–100 | Branco |

## Stack

- React + TypeScript + Vite
- anime.js v4 (animações)
- CSS puro (responsivo mobile-first)
- localStorage (sem backend)

## Rodar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Os dados ficam salvos no navegador do dispositivo (localStorage).
