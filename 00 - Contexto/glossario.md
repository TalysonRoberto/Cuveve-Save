---
tipo: contexto
area: projeto
status: ativo
tokens: baixo
fonte: []
atualizado: 2026-07-24
tags: [glossario, dominio]
---

> [!tldr] TL;DR
> Dicionário dos termos do domínio Cuvave-Save. Existe para não gastar token reexplicando o que cada palavra significa.

# Glossário

| Termo | Significado | Nota relacionada |
|---|---|---|
| Setup | Configuração nomeada e salvável dos 10 parâmetros da pedaleira (valores + ativo/desativado + tags) | [[01 - Arquitetura]] |
| Pedaleira / pedal | O hardware físico Cuvave que o app reproduz visualmente | [[visao-geral]] |
| Knob | Controle giratório circular do pedal; no app, componente interativo de ajuste | [[01 - Arquitetura]] |
| Parâmetro | Um dos 10 controles salváveis: VOLUME, IR CAB, REVERB, MIX, FB, TIME, MOD, TONE, GAIN, TYPE | [[01 - Arquitetura]] |
| Knob contínuo | Tipo do VOLUME: 0–100, giro livre, sem marcações | [[01 - Arquitetura]] |
| Knob de posição | Tipo dos outros 9: 9 posições fixas 0–8 com snap e anel de marcação | [[01 - Arquitetura]] |
| Grupo/cor | Agrupamento visual do pedal: branco (VOLUME), verde (IR CAB, REVERB), azul (MIX, FB, TIME, MOD), vermelho (TONE, GAIN, TYPE) | [[visao-geral]] |
| Ativo/desativado | Estado de cada parâmetro; desativado renderiza cinza e preserva o valor | [[01 - Arquitetura]] |
| Tag | Etiqueta livre associada a setups (ex: "Som Pesado"); normalizada case-insensitive para evitar duplicata | [[02 - Banco de Dados]] |
| Footswitch | Botões físicos A/B/C do pedal; removidos do visual na v1.2 (não salvos) | [[visao-geral]] |
| Badge | Etiqueta destacada em cada setup na listagem (canto da direita, com glow verde e ícone de ponto) | [[fluxo-setups]] |
| kit-mcp / framework | Kit de workflow em `.claude/` (fases, planning, roadmap) usado para construir o projeto | [[padrao-do-cofre]] |
