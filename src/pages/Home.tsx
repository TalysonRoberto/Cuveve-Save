import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { pageIn, staggerIn } from '../animations';

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const acoesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    pageIn(rootRef.current);
    const itens = acoesRef.current?.querySelectorAll<HTMLElement>('.home-anim');
    if (itens) staggerIn(Array.from(itens), { delayStep: 110, y: 22, duration: 600 });
  }, []);

  return (
    <main className="home" ref={rootRef}>
      <header className="home-brand">
        <span className="home-logo home-anim">CUVAVE</span>
        <h1 className="home-title home-anim">Seu som, salvo.</h1>
        <p className="home-sub home-anim">
          Monte o setup da sua pedaleira, salve e recupere em segundos — direto do celular.
        </p>
      </header>
      <nav className="home-actions" aria-label="Ações principais" ref={acoesRef}>
        <Link to="/setups" className="btn btn-primary btn-big home-anim">
          Ver Setups
        </Link>
        <Link to="/setups/novo" className="btn btn-outline btn-big home-anim">
          Salvar Novo Setup
        </Link>
      </nav>
    </main>
  );
}
