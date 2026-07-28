import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pedalboard from '../components/Pedalboard';
import TagInput from '../components/TagInput';
import { bounce, pageIn } from '../animations';
import { createSetup, deleteSetup, duplicateSetup, getSetup, listTags, updateSetup } from '../storage';
import { Parametro, ParametroKey, Parametros, Setup, Tag, createDefaultParametros } from '../types';
import { hapticSuccess, hapticError } from '../hooks/haptics';

export default function SetupEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement>(null);
  const ehCriacao = !id;

  const [nome, setNome] = useState('');
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [parametros, setParametros] = useState<Parametros>(createDefaultParametros);
  const [erroNome, setErroNome] = useState('');
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const [carregado, setCarregado] = useState(ehCriacao);
  const [modoEdicao, setModoEdicao] = useState(ehCriacao);
  const [tags, setTags] = useState<Tag[]>([]);
  const [setupOriginal, setSetupOriginal] = useState<Setup | null>(null);

  useEffect(() => {
    setTags(listTags());
    if (ehCriacao) {
      setCarregado(true);
      setModoEdicao(true);
      return;
    }
    const setup = getSetup(id);
    if (!setup) {
      setNaoEncontrado(true);
      return;
    }
    setSetupOriginal(setup);
    setNome(setup.nome);
    setTagIds(setup.tagIds);
    setParametros(setup.parametros);
    setCarregado(true);
    setModoEdicao(false);
  }, [id, ehCriacao]);

  useEffect(() => {
    if (carregado) pageIn(rootRef.current);
  }, [carregado]);

  const onChangeParam = (key: ParametroKey, param: Parametro) => {
    setParametros((atual) => ({ ...atual, [key]: param }));
  };

  const salvar = () => {
    if (!nome.trim()) {
      setErroNome('Dê um nome ao setup para salvar.');
      hapticError();
      return;
    }
    if (ehCriacao) {
      createSetup({ nome, tagIds, parametros });
    } else {
      updateSetup(id, { nome, tagIds, parametros });
    }
    hapticSuccess();
    navigate('/setups', { state: { toast: ehCriacao ? 'Setup salvo com sucesso' : 'Setup atualizado com sucesso' } });
  };

  const cancelar = () => {
    if (ehCriacao) {
      navigate('/setups');
      return;
    }
    if (setupOriginal) {
      setNome(setupOriginal.nome);
      setTagIds(setupOriginal.tagIds);
      setParametros(setupOriginal.parametros);
    }
    setModoEdicao(false);
  };

  const duplicar = () => {
    if (ehCriacao) return;
    duplicateSetup(id);
    navigate('/setups', { state: { toast: 'Setup duplicado com sucesso' } });
  };

  const excluir = () => {
    if (ehCriacao) return;
    if (window.confirm(`Excluir o setup "${nome}"? Esta ação não pode ser desfeita.`)) {
      deleteSetup(id);
      hapticSuccess();
      navigate('/setups', { state: { toast: 'Setup excluído' } });
    }
  };

  const habilitarEdicao = (e: React.MouseEvent) => {
    e.preventDefault();
    bounce(e.currentTarget as HTMLElement);
    setModoEdicao(true);
  };

  const tagPorId = (tid: string) => tags.find((t) => t.id === tid);

  if (naoEncontrado) {
    return (
      <main className="page">
        <h1>Setup não encontrado</h1>
        <p className="muted">Ele pode ter sido excluído.</p>
        <Link to="/setups" className="btn btn-outline">
          Ver Setups
        </Link>
      </main>
    );
  }

  if (!carregado) return null;

  return (
    <main className={`page setup-page ${modoEdicao ? 'setup-edit' : 'setup-view'}`} ref={rootRef}>
      <div className="setup-top">
        {modoEdicao ? (
          <div className="setup-form setup-form-compact">
            <div className="field">
              <label htmlFor="setup-nome">Nome do setup *</label>
              <input
                id="setup-nome"
                className={`input ${erroNome ? 'input-error' : ''}`}
                type="text"
                placeholder="Ex: Solo Rock, Clean Jazz"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  if (erroNome) setErroNome('');
                }}
              />
              {erroNome && <p className="form-error">{erroNome}</p>}
            </div>
            <div className="field">
              <label>Tags (opcional)</label>
              <TagInput tagIds={tagIds} onChange={setTagIds} />
            </div>
          </div>
        ) : (
          <div className="setup-header">
            <h1 className="setup-view-nome">{nome}</h1>
            {tagIds.length > 0 && (
              <div className="setup-view-tags">
                {tagIds.map((tid) => {
                  const t = tagPorId(tid);
                  return t ? (
                    <span key={tid} className="setup-tag-pill">
                      {t.nome}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="setup-pedal">
        <Pedalboard parametros={parametros} onChange={onChangeParam} readOnly={!modoEdicao} />
      </div>

      <div className="setup-actions">
        {modoEdicao ? (
          <>
            <button type="button" className="btn btn-primary btn-big" onClick={salvar}>
              {ehCriacao ? 'Salvar' : 'Salvar alterações'}
            </button>
            <button type="button" className="btn btn-outline" onClick={cancelar}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-primary" onClick={habilitarEdicao}>
              Editar
            </button>
            <button type="button" className="btn btn-outline" onClick={duplicar}>
              Duplicar
            </button>
            <button type="button" className="btn btn-danger" onClick={excluir}>
              Excluir
            </button>
          </>
        )}
      </div>
    </main>
  );
}
