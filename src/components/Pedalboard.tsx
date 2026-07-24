import { useEffect, useRef } from 'react';
import { PARAM_DEFS, Parametro, ParametroKey, Parametros } from '../types';
import { staggerIn } from '../animations';
import ParamField from './ParamField';

interface PedalboardProps {
  parametros: Parametros;
  onChange: (key: ParametroKey, param: Parametro) => void;
  readOnly?: boolean;
}

export default function Pedalboard({ parametros, onChange, readOnly }: PedalboardProps) {
  const knobsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const itens = knobsRef.current?.querySelectorAll<HTMLElement>('.param');
    if (itens) staggerIn(Array.from(itens), { delayStep: 45, y: 16 });
  }, []);

  return (
    <section className="pedal" aria-label="Pedaleira Cuvave">
      <div className="pedal-top">
        <span className="pedal-brand pedal-brand-top">CUVAVE</span>
      </div>

      <div className="pedal-knobs" role="group" aria-label="Parâmetros" ref={knobsRef}>
        {PARAM_DEFS.map((def) => (
          <ParamField
            key={def.key}
            def={def}
            param={parametros[def.key]}
            onChange={(p) => onChange(def.key, p)}
            readOnly={readOnly}
          />
        ))}
      </div>

      <div className="pedal-bottom" aria-hidden="true">
        <span className="pedal-brand pedal-brand-bottom">CUVAVE</span>
      </div>
    </section>
  );
}
