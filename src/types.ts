// Modelo de dados do Cuvave-Save.
// Fonte da verdade dos 10 parâmetros da pedaleira: ordem física, rótulos, faixas e cores por grupo.

export type ParametroKey =
  | 'volume'
  | 'ir_cab'
  | 'reverb'
  | 'mix'
  | 'fb'
  | 'time'
  | 'mod'
  | 'tone'
  | 'gain'
  | 'type';

export type GrupoCor = 'branco' | 'verde' | 'azul' | 'vermelho';

export interface ParametroDef {
  key: ParametroKey;
  label: string;
  grupo: GrupoCor;
  min: number;
  max: number;
  /** true = giro livre (VOLUME); false = snap em posições fixas (0–8) */
  continuo: boolean;
}

/** Ordem física do pedal Cuvave, da esquerda para a direita. */
export const PARAM_DEFS: readonly ParametroDef[] = [
  { key: 'volume', label: 'VOLUME', grupo: 'branco', min: 0, max: 100, continuo: true },
  { key: 'ir_cab', label: 'IR CAB', grupo: 'verde', min: 0, max: 8, continuo: false },
  { key: 'reverb', label: 'REVERB', grupo: 'verde', min: 0, max: 8, continuo: false },
  { key: 'mix', label: 'MIX', grupo: 'azul', min: 0, max: 8, continuo: false },
  { key: 'fb', label: 'FB', grupo: 'azul', min: 0, max: 8, continuo: false },
  { key: 'time', label: 'TIME', grupo: 'azul', min: 0, max: 8, continuo: false },
  { key: 'mod', label: 'MOD', grupo: 'azul', min: 0, max: 8, continuo: false },
  { key: 'tone', label: 'TONE', grupo: 'vermelho', min: 0, max: 8, continuo: false },
  { key: 'gain', label: 'GAIN', grupo: 'vermelho', min: 0, max: 8, continuo: false },
  { key: 'type', label: 'TYPE', grupo: 'vermelho', min: 0, max: 8, continuo: false },
] as const;

export const PARAM_DEF_MAP: ReadonlyMap<ParametroKey, ParametroDef> = new Map(
  PARAM_DEFS.map((d) => [d.key, d]),
);

export interface Parametro {
  valor: number;
  ativo: boolean;
}

export type Parametros = Record<ParametroKey, Parametro>;

export interface Setup {
  id: string;
  nome: string;
  tagIds: string[];
  parametros: Parametros;
  criadoEm: string; // ISO
  atualizadoEm: string; // ISO
}

export interface Tag {
  id: string;
  nome: string;
  criadoEm: string; // ISO
}

/** Default de criação: todos os parâmetros em 0 e ativos (decisão do projeto). */
export function createDefaultParametros(): Parametros {
  const out = {} as Parametros;
  for (const def of PARAM_DEFS) {
    out[def.key] = { valor: def.min, ativo: true };
  }
  return out;
}

/** Corrige valor para dentro da faixa do parâmetro (arredonda e clampa). */
export function clampValor(def: ParametroDef, valor: number): number {
  if (Number.isNaN(valor)) return def.min;
  const inteiro = Math.round(valor);
  return Math.min(def.max, Math.max(def.min, inteiro));
}

/** Normaliza nome de tag para comparar grafias (" som  Pesado " ≡ "Som Pesado"). */
export function normalizeTagKey(nome: string): string {
  return nome.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

/** Normaliza nome de tag para exibição (trim + espaços simples, preserva caixa). */
export function normalizeTagDisplay(nome: string): string {
  return nome.trim().replace(/\s+/g, ' ');
}
