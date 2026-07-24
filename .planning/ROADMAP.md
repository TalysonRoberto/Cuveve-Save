# Roadmap: Cuvave-Save

## Visão Geral

Do zero ao catálogo digital de setups da pedaleira Cuvave em 3 fases: primeiro a fundação (app React+TS com persistência local e navegação), depois o coração do produto (a pedaleira visual com knobs interativos fiéis ao pedal físico), e por fim as telas de fluxo completo (criar, listar, filtrar, visualizar, editar, duplicar, excluir setups e gerenciar tags).

## Fases

**Numeração de Fases:**
- Fases inteiras (1, 2, 3): Trabalho planejado do milestone
- Fases decimais (2.1, 2.2): Inserções urgentes (marcadas com INSERIDA)

- [x] **Fase 1: Fundação & Dados** — Scaffold Vite+React+TS, modelo de dados, persistência localStorage, rotas e Home
- [x] **Fase 2: Pedaleira Visual** — Componente Knob (contínuo e snap), anel de posições, cores do pedal, input sincronizado, ativo/desativado
- [x] **Fase 3: Fluxo de Setups & Tags** — Criar/editar/visualizar/excluir/duplicar setups, listagem com filtro, tags completas

## Detalhes das Fases

### Fase 1: Fundação & Dados
**Objetivo**: App React+Vite+TS rodando com modelo de dados tipado (Setup, Tag, Parametro), camada de persistência em localStorage, roteamento entre telas e tela Home com as duas ações principais.
**Depende de**: Nada (primeira fase)
**Requisitos**: [HOME-01, HOME-02, SET-04, NFR-01]
**Critérios de Sucesso** (o que deve ser VERDADEIRO):
  1. Usuário abre o app e vê "Ver Setups" e "Salvar Novo Setup" sem rolagem, em desktop e mobile
  2. Navegar entre as rotas (home, listagem, criação) funciona sem erro
  3. Dados salvos via camada de storage sobrevivem a reload do navegador
  4. Build de produção compila sem erros de TypeScript
**Planos**: 1 plano

Planos:
- [x] 01-01: Scaffold + modelo de dados + storage + rotas + Home

### Fase 2: Pedaleira Visual
**Objetivo**: Componente Knob reutilizável (contínuo 0–100 e snap 0–8 com anel de marcação), painel Pedalboard com os 10 knobs na ordem e cores do pedal Cuvave, input numérico sincronizado bidirecionalmente e toggle ativo/desativado com estado cinza acessível.
**Depende de**: Fase 1
**Requisitos**: [KNOB-01, KNOB-02, KNOB-03, KNOB-04, KNOB-05, KNOB-06, KNOB-07, KNOB-08, NFR-02]
**Critérios de Sucesso** (o que deve ser VERDADEIRO):
  1. Usuário arrasta qualquer knob e vê o valor mudar em tempo real no campo abaixo dele
  2. Usuário digita um valor no campo e vê o knob girar para a posição correspondente; valores fora da faixa são corrigidos ao limite
  3. Knobs de posição encaixam visualmente nas 9 marcações; VOLUME gira livre de 0 a 100
  4. Desativar um knob o deixa cinza (com opacidade/ícone, não só cor) preservando o valor ao reativar
  5. A fileira de knobs reproduz ordem e cores do pedal físico e se adapta a telas mobile
**Planos**: 1 plano

Planos:
- [x] 02-01: Componente Knob + Pedalboard + ParamField (input + toggle)

### Fase 3: Fluxo de Setups & Tags
**Objetivo**: Fluxo completo de uso — criar setup (nome obrigatório, tags com autocomplete/criação), salvar com toast e redirect, listar com chips e filtro instantâneo por tag, visualizar/editar/ressalvar, duplicar, excluir com confirmação, e tela de gerenciamento de tags (renomear/excluir/contagem).
**Depende de**: Fase 2
**Requisitos**: [SET-01, SET-02, SET-03, SET-05, SET-06, SET-07, SET-08, TAG-01, TAG-02, TAG-03, TAG-04, LIST-01, LIST-02, LIST-03, LIST-04, VIEW-01, VIEW-02]
**Critérios de Sucesso** (o que deve ser VERDADEIRO):
  1. Usuário cria setup com nome e tags, salva, vê toast e o setup na listagem sem refresh
  2. Não é possível salvar sem nome; tag nova digitada vira "criar tag [nome]"; grafia diferente reutiliza tag existente
  3. Filtro por tag atualiza a lista na hora; "Todas" mostra tudo, inclusive setups sem tag
  4. Abrir um setup mostra a pedaleira exatamente como salva (valores e cinzas), e editar/ressalvar atualiza o setup
  5. Usuário duplica e exclui setups (com confirmação) e gerencia tags (renomear/excluir/ver contagem)
**Planos**: 1 plano

Planos:
- [x] 03-01: Telas de Criar/Editar/Visualizar + Listagem com filtro + TagManager + Toast

## Progresso

**Ordem de Execução:**
As fases executam em ordem numérica: 1 → 2 → 3

| Fase | Planos Completos | Status | Concluída |
|------|------------------|--------|-----------|
| 1. Fundação & Dados | 1/1 | Complete | 2026-07-24 |
| 2. Pedaleira Visual | 1/1 | Complete | 2026-07-24 |
| 3. Fluxo de Setups & Tags | 1/1 | Complete | 2026-07-24 |
