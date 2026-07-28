import { useRef } from 'react';
import { Parametro, ParametroDef, clampValor, labelMod } from '../types';
import { bounce } from '../animations';
import { hapticImpact } from '../hooks/haptics';
import Knob from './Knob';

interface ParamFieldProps {
  def: ParametroDef;
  param: Parametro;
  onChange: (param: Parametro) => void;
  readOnly?: boolean;
}

/**
 * Um parâmetro completo: label + knob + input numérico + toggle ativo.
 * Sincronização bidirecional knob ↔ input, com clamp na faixa.
 */
export default function ParamField({ def, param, onChange, readOnly }: ParamFieldProps) {
  const knobWrapRef = useRef<HTMLDivElement>(null);

  const setValor = (valor: number) => {
    if (readOnly) return;
    onChange({ ...param, valor: clampValor(def, valor) });
  };

  const setAtivo = (ativo: boolean) => {
    if (readOnly) return;
    // Valor é preservado ao desativar (KNOB-07)
    bounce(knobWrapRef.current);
    hapticImpact('light');
    onChange({ ...param, ativo });
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bruto = e.target.value;
    if (bruto === '') return; // permite apagar para redigitar; clamp ocorre no blur
    const n = Number(bruto);
    if (!Number.isNaN(n)) setValor(n);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const n = Number(e.target.value);
    setValor(Number.isNaN(n) ? def.min : n);
  };

  return (
    <div className={`param param-${def.grupo} ${param.ativo ? '' : 'param-off'}`} data-param={def.key}>
      <span className="param-label">{def.label}</span>
      <div className="param-knob" ref={knobWrapRef}>
        <Knob def={def} valor={param.valor} ativo={param.ativo} onChange={setValor} readOnly={readOnly} />
      </div>
      {def.key === 'mod' ? (
        <span className="param-input param-input-readonly" aria-label={`${def.label} valor`} title={labelMod(param.valor)}>
          {labelMod(param.valor)}
        </span>
      ) : (
        <input
          className="param-input"
          type="number"
          inputMode="numeric"
          min={def.min}
          max={def.max}
          step={1}
          value={param.valor}
          aria-label={`${def.label} valor`}
          onChange={onInput}
          onBlur={onBlur}
          disabled={readOnly}
        />
      )}
      <button
        type="button"
        className={`param-toggle ${param.ativo ? 'toggle-on' : 'toggle-off'}`}
        aria-pressed={param.ativo}
        aria-label={`${def.label} ${param.ativo ? 'ativo' : 'desativado'}`}
        title={param.ativo ? 'Desativar' : 'Ativar'}
        onClick={() => setAtivo(!param.ativo)}
        disabled={readOnly}
      >
        {param.ativo ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}
