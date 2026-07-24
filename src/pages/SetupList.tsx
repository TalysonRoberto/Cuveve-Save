import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Toast, { useToast } from '../components/Toast';
import { listSetups, listTags } from '../storage';
import { Setup, Tag } from '../types';

const TODAS = '__todas__';

export default function SetupList() {
  const location = useLocation();
  const { toast, showToast } = useToast();

  const [setups, setSetups] = useState<Setup[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filtro, setFiltro] = useState<string>(TODAS);

  useEffect(() => {
    setSetups(listSetups());
    setTags(listTags());
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

  return (
    <main className="page">
      <div className="page-header">
        <h1>Setups</h1>
        <div className="header-actions">
          <Link to="/tags" className="btn btn-outline">
            Gerenciar Tags
          </Link>
          <Link to="/setups/novo" className="btn btn-primary">
            Novo Setup
          </Link>
        </div>
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
        <p className="muted">
          {setups.length === 0
            ? 'Nenhum setup salvo ainda. Crie o primeiro!'
            : 'Nenhum setup com essa tag.'}
        </p>
      ) : (
        <div className="setup-grid">
          {filtrados.map((s) => (
            <Link key={s.id} to={`/setups/${s.id}`} className="card setup-card">
              <div className="setup-card-top">
                <h2 className="setup-nome">{s.nome}</h2>
                <div className="setup-chips">
                  {s.tagIds.map((id) => {
                    const t = tagsPorId.get(id);
                    return t ? (
                      <span key={id} className="chip">
                        {t.nome}
                      </span>
                    ) : null;
                  })}
                </div>
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
