import { beforeEach, describe, expect, it } from 'vitest';
import {
  countSetupsByTag,
  createOrGetTag,
  createSetup,
  deleteSetup,
  deleteTag,
  duplicateSetup,
  findTagByNome,
  getSetup,
  listSetups,
  listTags,
  renameTag,
  updateSetup,
} from './storage';
import { createDefaultParametros } from './types';

// Backend em memória (sem localStorage no ambiente node de teste).

beforeEach(() => {
  for (const s of listSetups()) deleteSetup(s.id);
  for (const t of listTags()) deleteTag(t.id);
});

describe('setups', () => {
  it('cria setup com default de 10 parâmetros em 0 e ativos', () => {
    const s = createSetup({ nome: 'Clean Jazz', tagIds: [] });
    expect(s.id).toBeTruthy();
    expect(Object.keys(s.parametros)).toHaveLength(10);
    expect(s.parametros.volume).toEqual({ valor: 0, ativo: true });
    expect(getSetup(s.id)?.nome).toBe('Clean Jazz');
  });

  it('atualiza nome/params e muda atualizadoEm', () => {
    const s = createSetup({ nome: 'Solo Rock', tagIds: [] });
    const params = createDefaultParametros();
    params.gain = { valor: 7, ativo: true };
    const up = updateSetup(s.id, { nome: 'Solo Rock 2', parametros: params });
    expect(up?.nome).toBe('Solo Rock 2');
    expect(up?.parametros.gain.valor).toBe(7);
    expect(up!.atualizadoEm >= s.criadoEm).toBe(true);
  });

  it('exclui setup', () => {
    const s = createSetup({ nome: 'X', tagIds: [] });
    expect(deleteSetup(s.id)).toBe(true);
    expect(getSetup(s.id)).toBeUndefined();
    expect(deleteSetup(s.id)).toBe(false);
  });

  it('duplica setup com nome derivado sem colisão', () => {
    const s = createSetup({ nome: 'Base', tagIds: [] });
    const c1 = duplicateSetup(s.id);
    const c2 = duplicateSetup(s.id);
    expect(c1?.nome).toBe('Base (cópia)');
    expect(c2?.nome).toBe('Base (cópia 2)');
    expect(c1?.id).not.toBe(s.id);
  });
});

describe('tags', () => {
  it('cria tag e reutiliza existente com grafia diferente', () => {
    const t1 = createOrGetTag('Som Pesado');
    const t2 = createOrGetTag('som pesado');
    const t3 = createOrGetTag('  Som   Pesado ');
    expect(t1).toBeTruthy();
    expect(t2?.id).toBe(t1!.id);
    expect(t3?.id).toBe(t1!.id);
    expect(listTags()).toHaveLength(1);
    expect(findTagByNome('SOM PESADO')?.id).toBe(t1!.id);
  });

  it('renomeia tag e impede duplicata normalizada', () => {
    const a = createOrGetTag('Leve')!;
    const b = createOrGetTag('Pesado')!;
    expect(renameTag(a.id, 'Clean')?.nome).toBe('Clean');
    expect(renameTag(a.id, ' pesado ')?.id).toBe(b.id); // conflito → retorna existente
  });

  it('excluir tag desvincula dos setups e zera contagem', () => {
    const t = createOrGetTag('Efeito')!;
    const s = createSetup({ nome: 'Com Efeito', tagIds: [t.id] });
    expect(countSetupsByTag()[t.id]).toBe(1);
    expect(deleteTag(t.id)).toBe(true);
    expect(getSetup(s.id)?.tagIds).toHaveLength(0);
    expect(countSetupsByTag()[t.id]).toBeUndefined();
  });
});
