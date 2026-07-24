import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pedalboard from '../components/Pedalboard';
import TagInput from '../components/TagInput';
import { pageIn } from '../animations';
import { createSetup, deleteSetup, duplicateSetup, getSetup, updateSetup } from '../storage';
import { Parametro, ParametroKey, Parametros, createDefaultParametros } from '../types';

/**
 * Tela de criação/edição/visualização de setup.
 * Modo criar: /setups/novo (parâmetros no default 0/ativo).
 * Modo editar: /setups/:id (abre fiel ao estado salvo e permite alterar e ressalvar —
 * decisão do projeto: visualização é editável).
 */
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

  useEffect(() => {
    if (ehCriacao) return;
    const setup = getSetup(id);
    if (!setup) {
      setNaoEncontrado(true);
      return;
    }
    setNome(setup.nome);
    setTagIds(setup.tagIds);
    setParametros(setup.parametros);
    setCarregado(true);
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
      return;
    }
    if (ehCriacao) {
      createSetup({ nome, tagIds, parametros });
    } else {
      updateSetup(id, { nome, tagIds, parametros });
    }
    navigate('/setups', { state: { toast: ehCriacao ? 'Setup salvo com sucesso' : 'Setup atualizado com sucesso' } });
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
      navigate('/setups', { state: { toast: 'Setup excluído' } });
    }
  };

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
    <main className="page" ref={rootRef}>
      <div className="page-header">
        <h1>{ehCriacao ? 'Novo Setup' : nome || 'Setup'}</h1>
      </div>

      <div className="setup-form">
        <div className="field">
          <label htmlFor="setup-nome">Nome do setup *</label>
          <input
            id="setup-nome"
            className={`input ${erroNome ? 'input-error' : ''}`}
            type="text"
            placeholder='Ex: Solo Rock, Clean Jazz'
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

      <Pedalboard parametros={parametros} onChange={onChangeParam} />

      <div className="action-bar">
        <button type="button" className="btn btn-primary btn-big" onClick={salvar}>
          {ehCriacao ? 'Salvar' : 'Salvar alterações'}
        </button>
        {!ehCriacao && (
          <>
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
