import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="home">
      <header className="home-brand">
        <span className="home-logo">CUVAVE</span>
        <h1 className="home-title">Cuvave-Save</h1>
        <p className="home-sub">Seus setups de pedaleira, salvos e sempre à mão.</p>
      </header>
      <nav className="home-actions" aria-label="Ações principais">
        <Link to="/setups" className="btn btn-primary btn-big">
          Ver Setups
        </Link>
        <Link to="/setups/novo" className="btn btn-outline btn-big">
          Salvar Novo Setup
        </Link>
      </nav>
    </main>
  );
}
