import { PARAM_DEFS, Parametro, ParametroKey, Parametros } from '../types';
import ParamField from './ParamField';

interface PedalboardProps {
  parametros: Parametros;
  onChange: (key: ParametroKey, param: Parametro) => void;
}

/** Footswitches A/B/C do corpo físico do pedal — apenas decorativos (decisão do projeto). */
const FOOTSWITCHES = [
  { letra: 'A', rotulo: 'IR CAB / REVERB' },
  { letra: 'B', rotulo: 'DELAY / MOD' },
  { letra: 'C', rotulo: 'TONE / AMP' },
];

export default function Pedalboard({ parametros, onChange }: PedalboardProps) {
  return (
    <section className="pedal" aria-label="Pedaleira Cuvave">
      <div className="pedal-top">
        <span className="pedal-brand">CUVAVE</span>
      </div>

      <div className="pedal-knobs" role="group" aria-label="Parâmetros">
        {PARAM_DEFS.map((def) => (
          <ParamField
            key={def.key}
            def={def}
            param={parametros[def.key]}
            onChange={(p) => onChange(def.key, p)}
          />
        ))}
      </div>

      <div className="pedal-foots" aria-hidden="true">
        {FOOTSWITCHES.map((f) => (
          <div key={f.letra} className="footswitch">
            <span className="footswitch-label">{f.rotulo}</span>
            <span className="footswitch-btn" />
            <span className="footswitch-letter">{f.letra}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
