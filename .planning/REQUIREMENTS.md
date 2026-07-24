# Requisitos: Cuvave-Save

**Definidos:** 2026-07-24
**Valor Central:** O músico salva e recupera fielmente o estado completo da pedaleira (10 parâmetros: valores + ativo/desativado) em segundos, sem tocar no hardware.

## Requisitos v1

### Tela Inicial

- [x] **HOME-01**: Usuário vê "Ver Setups" e "Salvar Novo Setup" na tela inicial, sem rolagem em telas padrão
- [x] **HOME-02**: Tela inicial funciona em desktop e mobile

### Pedaleira / Knobs

- [x] **KNOB-01**: Knob VOLUME varia continuamente de 0 a 100, sem marcações de posição (giro livre por arraste)
- [x] **KNOB-02**: Os 9 knobs de posição encaixam (snap) em 9 posições fixas 0–8, com anel de marcação ao redor
- [x] **KNOB-03**: Knobs exibem cor do grupo e ordem física do pedal: VOLUME branco; IR CAB/REVERB verde; MIX/FB/TIME/MOD azul; TONE/GAIN/TYPE vermelho, em fileira única da esquerda para a direita
- [x] **KNOB-04**: Arrastar o knob atualiza o campo numérico; digitar no campo atualiza o knob (sincronização bidirecional instantânea)
- [x] **KNOB-05**: Campo numérico bloqueia/corrige valores fora da faixa (0–100 no Volume; 0–8 nos demais)
- [x] **KNOB-06**: Usuário ativa/desativa cada parâmetro; desativado fica cinza de forma imediata e reversível
- [x] **KNOB-07**: Valor numérico é preservado ao desativar (não zera) e restaurado ao reativar
- [x] **KNOB-08**: Estado desativado usa também indicador não-cromático (opacidade reduzida + ícone/label), não só cor

### Setups (CRUD)

- [x] **SET-01**: Sistema bloqueia salvar setup sem nome (validação obrigatória)
- [x] **SET-02**: Tela de criação abre com os 10 parâmetros em valor padrão (0, ativo)
- [x] **SET-03**: Ao salvar, usuário é redirecionado à listagem e o novo setup aparece imediatamente, sem refresh
- [x] **SET-04**: Setups e tags persistem em localStorage (sobrevivem a reload do navegador)
- [x] **SET-05**: Usuário recebe feedback visual de sucesso ao salvar (toast "Setup salvo com sucesso")
- [x] **SET-06**: Usuário pode editar um setup salvo (alterar valores/estados/tags/nome) e ressalvar
- [x] **SET-07**: Usuário pode excluir um setup, com confirmação antes de apagar
- [x] **SET-08**: Usuário pode duplicar um setup existente para criar variação rápida

### Tags

- [x] **TAG-01**: Usuário associa zero ou múltiplas tags a um setup
- [x] **TAG-02**: Ao digitar tag inexistente, sistema oferece "criar tag [nome digitado]"
- [x] **TAG-03**: Tag digitada com grafia diferente (ex: "som pesado" vs "Som Pesado") reutiliza a existente — sem duplicar
- [x] **TAG-04**: Usuário gerencia tags: renomear, excluir e ver quantos setups usam cada tag

### Listagem

- [x] **LIST-01**: Listagem exibe nome de cada setup com chips de tag destacados no item
- [x] **LIST-02**: Filtro por tag (chips/dropdown no topo) atualiza a lista instantaneamente; opção "Todas" remove o filtro
- [x] **LIST-03**: Setups sem tag aparecem normalmente com filtro em "Todas"
- [x] **LIST-04**: Clicar num setup da lista abre a tela de visualização

### Visualização

- [x] **VIEW-01**: Visualização reutiliza o layout da pedaleira e reflete fielmente os 10 valores e estados salvos
- [x] **VIEW-02**: Parâmetros desativados aparecem em cinza na visualização, como no salvamento

### Não-Funcionais

- [x] **NFR-01**: Layout responsivo (desktop e mobile) em todas as telas
- [x] **NFR-02**: Interação dos knobs fluida, com feedback visual em tempo real (sem travamentos perceptíveis)

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
| HOME-01 | Fase 1 | Complete |
| HOME-02 | Fase 1 | Complete |
| SET-04 | Fase 1 | Complete |
| NFR-01 | Fase 1 | Complete |
| KNOB-01 | Fase 2 | Complete |
| KNOB-02 | Fase 2 | Complete |
| KNOB-03 | Fase 2 | Complete |
| KNOB-04 | Fase 2 | Complete |
| KNOB-05 | Fase 2 | Complete |
| KNOB-06 | Fase 2 | Complete |
| KNOB-07 | Fase 2 | Complete |
| KNOB-08 | Fase 2 | Complete |
| NFR-02 | Fase 2 | Complete |
| SET-01 | Fase 3 | Complete |
| SET-02 | Fase 3 | Complete |
| SET-03 | Fase 3 | Complete |
| SET-05 | Fase 3 | Complete |
| SET-06 | Fase 3 | Complete |
| SET-07 | Fase 3 | Complete |
| SET-08 | Fase 3 | Complete |
| TAG-01 | Fase 3 | Complete |
| TAG-02 | Fase 3 | Complete |
| TAG-03 | Fase 3 | Complete |
| TAG-04 | Fase 3 | Complete |
| LIST-01 | Fase 3 | Complete |
| LIST-02 | Fase 3 | Complete |
| LIST-03 | Fase 3 | Complete |
| LIST-04 | Fase 3 | Complete |
| VIEW-01 | Fase 3 | Complete |
| VIEW-02 | Fase 3 | Complete |

**Cobertura:**
- Requisitos v1: 30 total
- Mapeados para fases: 30
- Não mapeados: 0 ✓

---
*Requisitos definidos: 2026-07-24*
*Última atualização: 2026-07-24 após definição inicial*
