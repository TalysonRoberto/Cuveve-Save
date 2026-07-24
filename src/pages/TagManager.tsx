import { useEffect, useRef, useState } from 'react';
import Toast, { useToast } from '../components/Toast';
import { pageIn } from '../animations';
import { countSetupsByTag, createOrGetTag, deleteTag, listTags, renameTag } from '../storage';
import { Tag } from '../types';

export default function TagManager() {
  const { toast, showToast } = useToast();
  const rootRef = useRef<HTMLElement>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [contagem, setContagem] = useState<Record<string, number>>({});
  const [novaTag, setNovaTag] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [textoEdicao, setTextoEdicao] = useState('');

  const recarregar = () => {
    setTags(listTags());
    setContagem(countSetupsByTag());
  };

  useEffect(() => {
    recarregar();
    pageIn(rootRef.current);
  }, []);

  const criar = () => {
    const tag = createOrGetTag(novaTag);
    if (tag) {
      setNovaTag('');
      recarregar();
      showToast(`Tag "${tag.nome}" pronta`);
    }
  };

  const iniciarEdicao = (tag: Tag) => {
    setEditandoId(tag.id);
    setTextoEdicao(tag.nome);
  };

  const confirmarEdicao = () => {
    if (!editandoId) return;
    const resultado = renameTag(editandoId, textoEdicao);
    if (resultado) {
      recarregar();
      showToast(`Tag renomeada para "${resultado.nome}"`);
    }
    setEditandoId(null);
  };

  const excluir = (tag: Tag) => {
    const usos = contagem[tag.id] ?? 0;
    const aviso =
      usos > 0
        ? `Excluir a tag "${tag.nome}"? Ela será removida de ${usos} setup(s) (os setups não são apagados).`
        : `Excluir a tag "${tag.nome}"?`;
    if (window.confirm(aviso)) {
      deleteTag(tag.id);
      recarregar();
      showToast('Tag excluída');
    }
  };

  return (
    <main className="page" ref={rootRef}>
      <div className="page-header">
        <h1>Tags</h1>
      </div>

      <div className="tag-nova">
        <input
          className="input"
          type="text"
          placeholder='Nova tag (ex: "Som Pesado")'
          value={novaTag}
          aria-label="Nova tag"
          onChange={(e) => setNovaTag(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && criar()}
        />
        <button type="button" className="btn btn-primary" onClick={criar} disabled={!novaTag.trim()}>
          Criar
        </button>
      </div>

      {tags.length === 0 ? (
        <p className="muted">Nenhuma tag criada ainda.</p>
      ) : (
        <ul className="tag-lista">
          {tags.map((t) => (
            <li key={t.id} className="card tag-linha">
              {editandoId === t.id ? (
                <input
                  className="input"
                  type="text"
                  value={textoEdicao}
                  autoFocus
                  aria-label={`Renomear tag ${t.nome}`}
                  onChange={(e) => setTextoEdicao(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') confirmarEdicao();
                    if (e.key === 'Escape') setEditandoId(null);
                  }}
                />
              ) : (
                <span className="chip">{t.nome}</span>
              )}
              <span className="muted tag-usos">
                {contagem[t.id] ?? 0} setup(s)
              </span>
              <span className="tag-acoes">
                {editandoId === t.id ? (
                  <>
                    <button type="button" className="btn btn-primary" onClick={confirmarEdicao}>
                      OK
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setEditandoId(null)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className="btn btn-outline" onClick={() => iniciarEdicao(t)}>
                      Renomear
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => excluir(t)}>
                      Excluir
                    </button>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      <Toast msg={toast} />
    </main>
  );
}
