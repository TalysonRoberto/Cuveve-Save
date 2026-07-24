import { Link } from 'react-router-dom';

// Placeholder da Fase 1 — implementada na Fase 3.
export default function SetupList() {
  return (
    <main className="page">
      <h1>Setups</h1>
      <p className="muted">Em construção (Fase 3).</p>
      <Link to="/" className="btn btn-outline">
        Voltar
      </Link>
    </main>
  );
}
