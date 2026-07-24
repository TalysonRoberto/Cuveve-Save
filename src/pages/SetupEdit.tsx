import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pedalboard from '../components/Pedalboard';
import { Parametro, ParametroKey, createDefaultParametros } from '../types';

// Fase 2: pedaleira interativa com estado local.
// Fase 3 completa: nome, tags, salvar/carregar, modos criar/editar/visualizar.
export default function SetupEdit() {
  const [parametros, setParametros] = useState(createDefaultParametros);

  const onChangeParam = (key: ParametroKey, param: Parametro) => {
    setParametros((atual) => ({ ...atual, [key]: param }));
  };

  return (
    <main className="page">
      <div className="page-header">
        <h1>Novo Setup</h1>
        <Link to="/" className="btn btn-outline">
          Voltar
        </Link>
      </div>
      <Pedalboard parametros={parametros} onChange={onChangeParam} />
    </main>
  );
}
