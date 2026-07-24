# Cuvave-Save

## O Que É

Sistema web local para músicos salvarem, visualizarem e gerenciarem configurações ("setups") da pedaleira Cuvave. Reproduz visualmente a fileira de 10 knobs do pedal físico e permite ajustar cada parâmetro por knob giratório interativo ou digitação direta, funcionando como um "catálogo digital de setups".

## Valor Central

O músico consegue salvar e recuperar fielmente o estado completo da pedaleira (10 parâmetros, com valores e estados ativo/desativado) em segundos — sem tocar no hardware.

## Requisitos

### Validados

(Nenhum ainda — lançar para validar)

### Ativos

- [ ] Tela inicial com duas ações visíveis sem scroll: "Ver Setups" e "Salvar Novo Setup"
- [ ] Criação de setup com nome obrigatório, tags opcionais (criar nova ou reutilizar existente, múltiplas tags por setup)
- [ ] Pedaleira visual fiel ao pedal Cuvave: 10 knobs em fileira (VOLUME→IR CAB→REVERB→MIX→FB→TIME→MOD→TONE→GAIN→TYPE) com cores por grupo (branco, verde ×2, azul ×4, vermelho ×3)
- [ ] Knob contínuo 0–100 (VOLUME) e knobs com snap em 9 posições 0–8 (demais), com anel de marcação de posição
- [ ] Sincronização bidirecional knob ↔ campo numérico digitável, com clamp na faixa
- [ ] Estado ativo/desativado por parâmetro (cinza quando desativado, valor preservado) com indicador não apenas por cor (acessibilidade)
- [ ] Persistência durável em localStorage (setup salvo aparece na listagem sem refresh)
- [ ] Listagem com chips de tag, filtro instantâneo por tag (inclui "Todas") e normalização de grafia de tag
- [ ] Tela de visualização editável: abre fiel ao estado salvo e permite alterar e ressalvar
- [ ] Excluir setup (com confirmação) e duplicar setup
- [ ] Gerenciamento de tags: renomear, excluir, ver contagem de setups por tag
- [ ] Feedback visual de sucesso ao salvar (toast)
- [ ] Layout responsivo desktop e mobile

### Fora do Escopo

- Integração MIDI/USB com o hardware da pedaleira — versão futura, exige bridge de hardware
- Letras de banco do pedal físico (E, A, D, G, B, ▶, ■, ◄) — solicitante removeu do visual
- Footswitches funcionais (troca de banco/preset) — aparecem só como elemento visual decorativo; não fazem parte dos dados salvos
- Multi-usuário/login/backend em nuvem — ferramenta local/individual na v1 (localStorage)
- Exportar/importar setups em JSON — backup manual não solicitado na v1

## Contexto

- PRD completo fornecido pelo solicitante, com imagem de referência do pedal Cuvave (layout confirmado: 10 knobs em fileira única, cores por grupo, 3 footswitches A/B/C abaixo).
- Pontos em aberto da seção 6 do PRD foram fechados com o solicitante em 2026-07-24: visualização **editável**; v1 inclui **excluir + duplicar setup, múltiplas tags por setup e gerenciamento de tags**; letras de banco fora do visual; footswitches apenas decorativos.
- Ferramenta individual do músico: sem login, sem servidor. Uso comum em tablet/celular → mobile-first importa.
- Valores default de criação: todos os parâmetros em 0 e ativos (PRD permite definir; adotado o mais simples).

## Restrições

- **Stack**: React + Vite + TypeScript, persistência em localStorage — decisão do solicitante (ferramenta local, zero backend)
- **Fidelidade visual**: layout deve seguir a imagem de referência do pedal Cuvave (cores e ordem dos knobs confirmadas)
- **Acessibilidade**: estado desativado não pode depender só de cor (usar também opacidade/ícone)
- **Performance**: interação dos knobs fluida, feedback visual em tempo real

## Decisões Chave

| Decisão | Justificativa | Resultado |
|---------|---------------|-----------|
| localStorage em vez de backend/Supabase | Ferramenta individual, zero infra, funciona offline | — Pendente |
| Visualização de setup é editável | Músico ajusta e ressalva sem recriar o setup | — Pendente |
| Múltiplas tags por setup | Um setup pode ser "Som Pesado" e "Som com Efeito" ao mesmo tempo | — Pendente |
| Footswitches A/B/C só decorativos | Fazem parte do corpo físico, não dos dados salváveis | — Pendente |
| Letras de banco (E,A,D,G,B…) fora do visual | Decisão explícita do solicitante | — Pendente |
| Default de criação: tudo 0 e ativo | Simples e previsível; PRD deixava em aberto | — Pendente |

## Evolução

Este documento evolui nas transições de fase e fronteiras de milestone.

**Após cada transição de fase** (via `/transicao`):
1. Requisitos invalidados? → Mover para Fora do Escopo com motivo
2. Requisitos validados? → Mover para Validados com referência de fase
3. Novos requisitos emergiram? → Adicionar em Ativos
4. Decisões a registrar? → Adicionar em Decisões Chave
5. "O Que É" ainda está preciso? → Atualizar se divergiu

**Após cada milestone** (via `/concluir-marco`):
1. Revisão completa de todas as seções
2. Verificação do Valor Central — ainda é a prioridade certa?
3. Auditoria de Fora do Escopo — os motivos ainda são válidos?
4. Atualizar Contexto com estado atual

---
*Última atualização: 2026-07-24 após inicialização*
