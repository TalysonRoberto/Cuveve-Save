import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Toast, { useToast } from '../components/Toast';
import { pageIn, staggerIn } from '../animations';
import { listSetups, listTags } from '../storage';
import { Setup, Tag } from '../types';

const TODAS = '__todas__';

const CORES_TAGS = [
  '#34e06a', // verde
  '#3b82f6', // azul
  '#f59e0b', // laranja
  '#ef4444', // vermelho
  '#a855f7', // roxo
  '#ec4899', // rosa
  '#06b6d4', // ciano
  '#facc15', // amarelo
];

function corTag(nome: string): string {
  let hash = 0;
  for (let i = 0; i < nome.length; i++) {
    hash = nome.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CORES_TAGS.length;
  return CORES_TAGS[index];
}

export default function SetupList() {
  const location = useLocation();
  const { toast, showToast } = useToast();
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [setups, setSetups] = useState<Setup[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filtro, setFiltro] = useState<string>(TODAS);

  useEffect(() => {
    setSetups(listSetups());
    setTags(listTags());
    pageIn(rootRef.current);
  }, []);

  // Toast vindo de ações (salvar/duplicar/excluir) na tela de setup
  useEffect(() => {
    const msg = (location.state as { toast?: string } | null)?.toast;
    if (msg) {
      showToast(msg);
      window.history.replaceState({}, '');
    }
  }, [location.state, showToast]);

  const tagsPorId = useMemo(() => new Map(tags.map((t) => [t.id, t])), [tags]);

  const filtrados = filtro === TODAS ? setups : setups.filter((s) => s.tagIds.includes(filtro));

  // Cascata de entrada dos cards (montagem e troca de filtro)
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.setup-card');
    if (cards && cards.length > 0) staggerIn(Array.from(cards), { delayStep: 60, y: 20 });
  }, [filtro, setups.length]);

  return (
    <main className="page" ref={rootRef}>
      <div className="page-header">
        <h1>Setups</h1>
        <Link to="/tags" className="link-sutil">
          Gerenciar Tags
        </Link>
      </div>

      <div className="filtro-tags" role="group" aria-label="Filtrar por tag">
        <button
          type="button"
          className={`chip chip-button ${filtro === TODAS ? 'chip-ativo' : ''}`}
          onClick={() => setFiltro(TODAS)}
        >
          Todas
        </button>
        {tags.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`chip chip-button ${filtro === t.id ? 'chip-ativo' : ''}`}
            onClick={() => setFiltro(t.id)}
          >
            {t.nome}
          </button>
        ))}
      </div>

      {filtrados.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icone" aria-hidden="true">🎛️</span>
          <p className="muted">
            {setups.length === 0
              ? 'Nenhum setup salvo ainda. Toque em “Novo Setup” para criar o primeiro!'
              : 'Nenhum setup com essa tag.'}
          </p>
        </div>
      ) : (
        <div className="setup-grid" ref={gridRef}>
          {filtrados.map((s) => (
            <Link key={s.id} to={`/setups/${s.id}`} className="card setup-card">
              <div className="setup-card-header">
                <h2 className="setup-nome">{s.nome}</h2>
                {s.tagIds.length > 0 && (
                  <div className="setup-badges" aria-label="Tags do setup">
                    {s.tagIds.map((id) => {
                      const t = tagsPorId.get(id);
                      return t ? (
                        <span key={id} className="badge" style={{ '--tag-color': corTag(t.nome) } as React.CSSProperties}>
                          {t.nome}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
              <span className="muted setup-data">
                Atualizado em {new Date(s.atualizadoEm).toLocaleDateString('pt-BR')}
              </span>
            </Link>
          ))}
        </div>
      )}

      <Toast msg={toast} />
    </main>
  );
}
