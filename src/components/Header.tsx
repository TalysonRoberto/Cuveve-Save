import { Link, NavLink } from 'react-router-dom';

/**
 * Navegação global: "Página Inicial" e "Ver Setup" como links,
 * "Novo Setup" como botão fixo no canto superior direito.
 */
export default function Header() {
  return (
    <header className="topnav">
      <Link to="/" className="topnav-brand" aria-label="Cuvave-Save — Página Inicial">
        <span className="brand-cuvave">PresetVault</span>
        <span className="brand-save">save</span>
      </Link>

      <nav className="topnav-links" aria-label="Navegação principal">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'nav-ativo' : ''}`}>
          Página Inicial
        </NavLink>
        <NavLink to="/setups" className={({ isActive }) => `nav-link ${isActive ? 'nav-ativo' : ''}`}>
          Ver Setup
        </NavLink>
      </nav>

      <Link to="/setups/novo" className="btn btn-primary btn-novo">
        <span className="btn-novo-plus" aria-hidden="true">+</span>
        <span className="btn-novo-texto">Novo Setup</span>
      </Link>
    </header>
  );
}
