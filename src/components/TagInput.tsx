import { useMemo, useRef, useState } from 'react';
import { createOrGetTag, listTags } from '../storage';
import { Tag, normalizeTagDisplay, normalizeTagKey } from '../types';

interface TagInputProps {
  tagIds: string[];
  onChange: (tagIds: string[]) => void;
}

/**
 * Seletor de tags com múltiplas tags por setup:
 * chips removíveis + autocomplete de existentes + "Criar tag [nome]".
 * Grafia diferente reutiliza a tag existente (normalização no storage).
 */
export default function TagInput({ tagIds, onChange }: TagInputProps) {
  const [texto, setTexto] = useState('');
  const [aberto, setAberto] = useState(false);
  const [versao, setVersao] = useState(0); // força releitura das tags após criar
  const inputRef = useRef<HTMLInputElement>(null);

  const tags = useMemo(() => listTags(), [versao]); // eslint-disable-line react-hooks/exhaustive-deps
  const selecionadas = tags.filter((t) => tagIds.includes(t.id));

  const chave = normalizeTagKey(texto);
  const sugestoes = chave
    ? tags.filter((t) => !tagIds.includes(t.id) && normalizeTagKey(t.nome).includes(chave))
    : tags.filter((t) => !tagIds.includes(t.id));
  const matchExato = tags.find((t) => normalizeTagKey(t.nome) === chave);
  const podeCriar = normalizeTagDisplay(texto).length > 0 && !matchExato;

  const adicionar = (tag: Tag) => {
    if (!tagIds.includes(tag.id)) onChange([...tagIds, tag.id]);
    setTexto('');
    inputRef.current?.focus();
  };

  const criar = () => {
    const tag = createOrGetTag(texto);
    if (tag) {
      setVersao((v) => v + 1);
      adicionar(tag);
    }
  };

  const remover = (id: string) => {
    onChange(tagIds.filter((t) => t !== id));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (matchExato && !tagIds.includes(matchExato.id)) adicionar(matchExato);
      else if (podeCriar) criar();
    } else if (e.key === 'Backspace' && texto === '' && tagIds.length > 0) {
      remover(tagIds[tagIds.length - 1]);
    }
  };

  return (
    <div className="tag-input" onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setAberto(false)}>
      <div className="tag-input-chips">
        {selecionadas.map((t) => (
          <span key={t.id} className="chip">
            {t.nome}
            <button type="button" className="chip-x" aria-label={`Remover tag ${t.nome}`} onClick={() => remover(t.id)}>
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          className="tag-input-field"
          type="text"
          placeholder={selecionadas.length === 0 ? 'Ex: Som Pesado' : ''}
          value={texto}
          aria-label="Adicionar tag"
          onChange={(e) => {
            setTexto(e.target.value);
            setAberto(true);
          }}
          onFocus={() => setAberto(true)}
          onKeyDown={onKeyDown}
        />
      </div>

      {aberto && (sugestoes.length > 0 || podeCriar) && (
        <ul className="tag-sugestoes" role="listbox">
          {sugestoes.map((t) => (
            <li key={t.id}>
              <button type="button" role="option" aria-selected="false" onMouseDown={(e) => e.preventDefault()} onClick={() => adicionar(t)}>
                {t.nome}
              </button>
            </li>
          ))}
          {podeCriar && (
            <li>
              <button type="button" role="option" aria-selected="false" className="tag-criar" onMouseDown={(e) => e.preventDefault()} onClick={criar}>
                Criar tag “{normalizeTagDisplay(texto)}”
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
