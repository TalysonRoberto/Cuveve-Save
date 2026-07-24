// Camada de persistência em localStorage (com fallback em memória para testes).
// Chaves versionadas: cuvave-save:v1:setups / cuvave-save:v1:tags.

import {
  Parametros,
  Setup,
  Tag,
  createDefaultParametros,
  normalizeTagDisplay,
  normalizeTagKey,
} from './types';

const KEY_SETUPS = 'cuvave-save:v1:setups';
const KEY_TAGS = 'cuvave-save:v1:tags';

// ---------------------------------------------------------------------------
// Backend de storage (localStorage real ou Map em memória em ambiente de teste)
// ---------------------------------------------------------------------------

const memoria = new Map<string, string>();

function getBackend(): Pick<Storage, 'getItem' | 'setItem'> {
  try {
    if (typeof globalThis.localStorage !== 'undefined') {
      return globalThis.localStorage;
    }
  } catch {
    // acesso negado (modo privado etc.) — cai no fallback
  }
  return {
    getItem: (k) => memoria.get(k) ?? null,
    setItem: (k, v) => void memoria.set(k, v),
  };
}

function lerJson<T>(key: string, fallback: T): T {
  const bruto = getBackend().getItem(key);
  if (!bruto) return fallback;
  try {
    const parsed = JSON.parse(bruto);
    return Array.isArray(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback; // JSON corrompido não derruba o app
  }
}

function gravarJson(key: string, valor: unknown): void {
  getBackend().setItem(key, JSON.stringify(valor));
}

function newId(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// ---------------------------------------------------------------------------
// Setups
// ---------------------------------------------------------------------------

export function listSetups(): Setup[] {
  return lerJson<Setup[]>(KEY_SETUPS, []);
}

export function getSetup(id: string): Setup | undefined {
  return listSetups().find((s) => s.id === id);
}

export interface NovoSetup {
  nome: string;
  tagIds: string[];
  parametros?: Parametros;
}

export function createSetup(input: NovoSetup): Setup {
  const agora = new Date().toISOString();
  const setup: Setup = {
    id: newId(),
    nome: input.nome.trim(),
    tagIds: [...input.tagIds],
    parametros: input.parametros ?? createDefaultParametros(),
    criadoEm: agora,
    atualizadoEm: agora,
  };
  const setups = listSetups();
  setups.push(setup);
  gravarJson(KEY_SETUPS, setups);
  return setup;
}

export function updateSetup(
  id: string,
  patch: Partial<Pick<Setup, 'nome' | 'tagIds' | 'parametros'>>,
): Setup | undefined {
  const setups = listSetups();
  const idx = setups.findIndex((s) => s.id === id);
  if (idx === -1) return undefined;
  const atual = setups[idx];
  const atualizado: Setup = {
    ...atual,
    ...(patch.nome !== undefined ? { nome: patch.nome.trim() } : {}),
    ...(patch.tagIds !== undefined ? { tagIds: [...patch.tagIds] } : {}),
    ...(patch.parametros !== undefined ? { parametros: patch.parametros } : {}),
    atualizadoEm: new Date().toISOString(),
  };
  setups[idx] = atualizado;
  gravarJson(KEY_SETUPS, setups);
  return atualizado;
}

export function deleteSetup(id: string): boolean {
  const setups = listSetups();
  const filtrados = setups.filter((s) => s.id !== id);
  if (filtrados.length === setups.length) return false;
  gravarJson(KEY_SETUPS, filtrados);
  return true;
}

/** Duplica um setup com nome derivado "X (cópia)", sem colisão de nome. */
export function duplicateSetup(id: string): Setup | undefined {
  const orig = getSetup(id);
  if (!orig) return undefined;
  const nomes = new Set(listSetups().map((s) => s.nome));
  let candidato = `${orig.nome} (cópia)`;
  let n = 2;
  while (nomes.has(candidato)) {
    candidato = `${orig.nome} (cópia ${n})`;
    n += 1;
  }
  const agora = new Date().toISOString();
  const copia: Setup = {
    ...orig,
    id: newId(),
    nome: candidato,
    tagIds: [...orig.tagIds],
    parametros: structuredClone(orig.parametros),
    criadoEm: agora,
    atualizadoEm: agora,
  };
  const setups = listSetups();
  setups.push(copia);
  gravarJson(KEY_SETUPS, setups);
  return copia;
}

// ---------------------------------------------------------------------------
// Tags
// ---------------------------------------------------------------------------

export function listTags(): Tag[] {
  return lerJson<Tag[]>(KEY_TAGS, []);
}

/**
 * Cria ou reutiliza tag pelo nome.
 * "som pesado" e "Som Pesado" são a mesma tag (normalização trim + case-insensitive).
 */
export function createOrGetTag(nome: string): Tag | undefined {
  const display = normalizeTagDisplay(nome);
  if (!display) return undefined;
  const alvo = normalizeTagKey(display);
  const tags = listTags();
  const existente = tags.find((t) => normalizeTagKey(t.nome) === alvo);
  if (existente) return existente;
  const tag: Tag = { id: newId(), nome: display, criadoEm: new Date().toISOString() };
  tags.push(tag);
  gravarJson(KEY_TAGS, tags);
  return tag;
}

export function findTagByNome(nome: string): Tag | undefined {
  const alvo = normalizeTagKey(nome);
  return listTags().find((t) => normalizeTagKey(t.nome) === alvo);
}

/** Renomeia mantendo a unicidade normalizada; retorna a tag atualizada ou a existente em conflito. */
export function renameTag(id: string, novoNome: string): Tag | undefined {
  const display = normalizeTagDisplay(novoNome);
  if (!display) return undefined;
  const tags = listTags();
  const tag = tags.find((t) => t.id === id);
  if (!tag) return undefined;
  const conflito = tags.find((t) => t.id !== id && normalizeTagKey(t.nome) === normalizeTagKey(display));
  if (conflito) return conflito;
  tag.nome = display;
  gravarJson(KEY_TAGS, tags);
  return tag;
}

/** Exclui a tag e a desvincula de todos os setups. */
export function deleteTag(id: string): boolean {
  const tags = listTags();
  const filtradas = tags.filter((t) => t.id !== id);
  if (filtradas.length === tags.length) return false;
  gravarJson(KEY_TAGS, filtradas);
  const setups = listSetups().map((s) =>
    s.tagIds.includes(id) ? { ...s, tagIds: s.tagIds.filter((t) => t !== id) } : s,
  );
  gravarJson(KEY_SETUPS, setups);
  return true;
}

/** Quantos setups usam cada tag: { tagId: contagem }. */
export function countSetupsByTag(): Record<string, number> {
  const contagem: Record<string, number> = {};
  for (const s of listSetups()) {
    for (const id of s.tagIds) {
      contagem[id] = (contagem[id] ?? 0) + 1;
    }
  }
  return contagem;
}
