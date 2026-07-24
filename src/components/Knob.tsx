import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { JSAnimation } from 'animejs';
import { ParametroDef } from '../types';
import { knobSpring } from '../animations';
import { ANG_MAX, ANG_MIN, pointerAngle, snapAngle, stepAngles, valueToAngle, angleToValue } from './knobMath';

interface KnobProps {
  def: ParametroDef;
  valor: number;
  ativo: boolean;
  onChange: (valor: number) => void;
}

const GRUPO_COR: Record<ParametroDef['grupo'], string> = {
  branco: 'var(--grupo-branco)',
  verde: 'var(--grupo-verde)',
  azul: 'var(--grupo-azul)',
  vermelho: 'var(--grupo-vermelho)',
};

/** Posições polares → coordenadas SVG (centro 50,50, 12h = topo). */
function polar(ang: number, raio: number): { x: number; y: number } {
  const rad = (ang * Math.PI) / 180;
  return { x: 50 + raio * Math.sin(rad), y: 50 - raio * Math.cos(rad) };
}

export default function Knob({ def, valor, ativo, onChange }: KnobProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const animacao = useRef<JSAnimation | undefined>(undefined);
  const gradId = useId();
  const glowId = useId();

  const steps = def.max - def.min + 1;
  const anguloAlvo = valueToAngle(valor, def.min, def.max);

  // Ângulo exibido: segue o valor com mola (input/clique/teclado) e
  // responde direto durante o arraste.
  const [anguloExibido, setAnguloExibido] = useState(anguloAlvo);

  useEffect(() => {
    animacao.current?.cancel();
    if (dragging.current) {
      setAnguloExibido(anguloAlvo);
      return;
    }
    setAnguloExibido((atual) => {
      animacao.current = knobSpring(atual, anguloAlvo, setAnguloExibido);
      return atual;
    });
    return () => {
      animacao.current?.cancel();
    };
  }, [anguloAlvo]);

  const cor = ativo ? GRUPO_COR[def.grupo] : 'var(--desativado)';

  const emitirAngulo = useCallback(
    (ang: number) => {
      // Zona morta no fundo do knob (|ângulo| > 135°): ignora para não pular de extremo.
      if (ang > ANG_MAX || ang < ANG_MIN) return;
      const final = def.continuo ? ang : snapAngle(ang, steps);
      const novo = angleToValue(final, def.min, def.max);
      if (novo !== valor) onChange(novo);
    },
    [def, steps, valor, onChange],
  );

  const centroPagina = () => {
    const rect = svgRef.current!.getBoundingClientRect();
    return { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 };
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const { cx, cy } = centroPagina();
    emitirAngulo(pointerAngle(cx, cy, e.clientX, e.clientY));
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return;
    const { cx, cy } = centroPagina();
    emitirAngulo(pointerAngle(cx, cy, e.clientX, e.clientY));
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const delta = e.key === 'ArrowUp' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? -1 : 0;
    if (delta !== 0) {
      e.preventDefault();
      onChange(Math.min(def.max, Math.max(def.min, valor + delta)));
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(def.min);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(def.max);
    }
  };

  const onWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1 : -1;
    onChange(Math.min(def.max, Math.max(def.min, valor + delta)));
  };

  const positions = def.continuo ? [] : stepAngles(steps);
  const posicaoAtual = valor - def.min;

  return (
    <svg
      ref={svgRef}
      className={`knob ${ativo ? '' : 'knob-off'}`}
      viewBox="0 0 100 100"
      role="slider"
      tabIndex={0}
      aria-label={def.label}
      aria-valuemin={def.min}
      aria-valuemax={def.max}
      aria-valuenow={valor}
      aria-disabled={!ativo}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      <defs>
        <radialGradient id={gradId} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#454650" />
          <stop offset="70%" stopColor="#1e1f26" />
          <stop offset="100%" stopColor="#12131a" />
        </radialGradient>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Anel de posições (somente knobs 0–8) — pontos clicáveis */}
      {positions.map((ang, i) => {
        const p = polar(ang, 45);
        const ativoPonto = i <= posicaoAtual;
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === posicaoAtual ? 3.2 : 2.2}
            className="knob-dot"
            fill={ativoPonto ? cor : 'var(--border)'}
            onPointerDown={(e) => {
              e.stopPropagation();
              onChange(def.min + i);
            }}
          >
            <title>{`${def.label}: ${def.min + i}`}</title>
          </circle>
        );
      })}

      {/* Corpo do knob (dome) */}
      <circle cx="50" cy="50" r="33" fill={`url(#${gradId})`} stroke="var(--border)" strokeWidth="1.5" />

      {/* LED interno na cor do grupo */}
      <circle
        cx="50"
        cy="50"
        r="26"
        className="knob-led"
        fill="none"
        stroke={cor}
        strokeWidth="2.4"
        opacity={ativo ? 1 : 0.55}
        filter={ativo ? `url(#${glowId})` : undefined}
      />

      {/* Indicador de posição (ângulo animado) */}
      <g transform={`rotate(${anguloExibido} 50 50)`}>
        <line x1="50" y1="50" x2="50" y2="22" stroke={cor} strokeWidth="3.4" strokeLinecap="round" />
        <circle cx="50" cy="20" r="2.6" fill={cor} />
      </g>
    </svg>
  );
}
