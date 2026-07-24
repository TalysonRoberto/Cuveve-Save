# Requisitos: Cuvave-Save

**Definidos:** 2026-07-24
**Valor Central:** O músico salva e recupera fielmente o estado completo da pedaleira (10 parâmetros: valores + ativo/desativado) em segundos, sem tocar no hardware.

## Requisitos v1

### Tela Inicial

- [ ] **HOME-01**: Usuário vê "Ver Setups" e "Salvar Novo Setup" na tela inicial, sem rolagem em telas padrão
- [ ] **HOME-02**: Tela inicial funciona em desktop e mobile

### Pedaleira / Knobs

- [ ] **KNOB-01**: Knob VOLUME varia continuamente de 0 a 100, sem marcações de posição (giro livre por arraste)
- [ ] **KNOB-02**: Os 9 knobs de posição encaixam (snap) em 9 posições fixas 0–8, com anel de marcação ao redor
- [ ] **KNOB-03**: Knobs exibem cor do grupo e ordem física do pedal: VOLUME branco; IR CAB/REVERB verde; MIX/FB/TIME/MOD azul; TONE/GAIN/TYPE vermelho, em fileira única da esquerda para a direita
- [ ] **KNOB-04**: Arrastar o knob atualiza o campo numérico; digitar no campo atualiza o knob (sincronização bidirecional instantânea)
- [ ] **KNOB-05**: Campo numérico bloqueia/corrige valores fora da faixa (0–100 no Volume; 0–8 nos demais)
- [ ] **KNOB-06**: Usuário ativa/desativa cada parâmetro; desativado fica cinza de forma imediata e reversível
- [ ] **KNOB-07**: Valor numérico é preservado ao desativar (não zera) e restaurado ao reativar
- [ ] **KNOB-08**: Estado desativado usa também indicador não-cromático (opacidade reduzida + ícone/label), não só cor

### Setups (CRUD)

- [ ] **SET-01**: Sistema bloqueia salvar setup sem nome (validação obrigatória)
- [ ] **SET-02**: Tela de criação abre com os 10 parâmetros em valor padrão (0, ativo)
- [ ] **SET-03**: Ao salvar, usuário é redirecionado à listagem e o novo setup aparece imediatamente, sem refresh
- [ ] **SET-04**: Setups e tags persistem em localStorage (sobrevivem a reload do navegador)
- [ ] **SET-05**: Usuário recebe feedback visual de sucesso ao salvar (toast "Setup salvo com sucesso")
- [ ] **SET-06**: Usuário pode editar um setup salvo (alterar valores/estados/tags/nome) e ressalvar
- [ ] **SET-07**: Usuário pode excluir um setup, com confirmação antes de apagar
- [ ] **SET-08**: Usuário pode duplicar um setup existente para criar variação rápida

### Tags

- [ ] **TAG-01**: Usuário associa zero ou múltiplas tags a um setup
- [ ] **TAG-02**: Ao digitar tag inexistente, sistema oferece "criar tag [nome digitado]"
- [ ] **TAG-03**: Tag digitada com grafia diferente (ex: "som pesado" vs "Som Pesado") reutiliza a existente — sem duplicar
- [ ] **TAG-04**: Usuário gerencia tags: renomear, excluir e ver quantos setups usam cada tag

### Listagem

- [ ] **LIST-01**: Listagem exibe nome de cada setup com chips de tag destacados no item
- [ ] **LIST-02**: Filtro por tag (chips/dropdown no topo) atualiza a lista instantaneamente; opção "Todas" remove o filtro
- [ ] **LIST-03**: Setups sem tag aparecem normalmente com filtro em "Todas"
- [ ] **LIST-04**: Clicar num setup da lista abre a tela de visualização

### Visualização

- [ ] **VIEW-01**: Visualização reutiliza o layout da pedaleira e reflete fielmente os 10 valores e estados salvos
- [ ] **VIEW-02**: Parâmetros desativados aparecem em cinza na visualização, como no salvamento

### Não-Funcionais

- [ ] **NFR-01**: Layout responsivo (desktop e mobile) em todas as telas
- [ ] **NFR-02**: Interação dos knobs fluida, com feedback visual em tempo real (sem travamentos perceptíveis)

## Requisitos v2

Diferidos para lançamento futuro. Rastreados mas não no roadmap atual.

### Integração & Dados

- **INT-01**: Exportar/importar setups em arquivo JSON (backup, troca entre dispositivos)
- **INT-02**: Integração MIDI/USB com a pedaleira física
- **INT-03**: Multi-usuário com login e sincronização em nuvem

### Usabilidade

- **USAB-01**: Busca por nome na listagem de setups
- **USAB-02**: Footswitches A/B/C funcionais (bancos/presets como parte do setup)
- **USAB-03**: Cor de identificação própria por tag (chip colorido)

## Fora do Escopo

| Funcionalidade | Motivo |
|----------------|--------|
| Integração MIDI/USB na v1 | Exige bridge de hardware; PRD marca como versão futura |
| Letras de banco (E, A, D, G, B, ▶, ■, ◄) | Removidas do visual por decisão do solicitante |
| Footswitches funcionais | Não fazem parte dos dados salváveis; v1 os mostra só decorativos |
| Login / backend em nuvem | Ferramenta local/individual; localStorage suficiente na v1 |
| App nativo mobile | Web responsivo atende o caso de uso (PRD: web/mobile) |

## Rastreabilidade

| Requisito | Fase | Status |
|-----------|------|--------|
| HOME-01 | Fase 1 | Pending |
| HOME-02 | Fase 1 | Pending |
| SET-04 | Fase 1 | Pending |
| NFR-01 | Fase 1 | Pending |
| KNOB-01 | Fase 2 | Pending |
| KNOB-02 | Fase 2 | Pending |
| KNOB-03 | Fase 2 | Pending |
| KNOB-04 | Fase 2 | Pending |
| KNOB-05 | Fase 2 | Pending |
| KNOB-06 | Fase 2 | Pending |
| KNOB-07 | Fase 2 | Pending |
| KNOB-08 | Fase 2 | Pending |
| NFR-02 | Fase 2 | Pending |
| SET-01 | Fase 3 | Pending |
| SET-02 | Fase 3 | Pending |
| SET-03 | Fase 3 | Pending |
| SET-05 | Fase 3 | Pending |
| SET-06 | Fase 3 | Pending |
| SET-07 | Fase 3 | Pending |
| SET-08 | Fase 3 | Pending |
| TAG-01 | Fase 3 | Pending |
| TAG-02 | Fase 3 | Pending |
| TAG-03 | Fase 3 | Pending |
| TAG-04 | Fase 3 | Pending |
| LIST-01 | Fase 3 | Pending |
| LIST-02 | Fase 3 | Pending |
| LIST-03 | Fase 3 | Pending |
| LIST-04 | Fase 3 | Pending |
| VIEW-01 | Fase 3 | Pending |
| VIEW-02 | Fase 3 | Pending |

**Cobertura:**
- Requisitos v1: 30 total
- Mapeados para fases: 30
- Não mapeados: 0 ✓

---
*Requisitos definidos: 2026-07-24*
*Última atualização: 2026-07-24 após definição inicial*
