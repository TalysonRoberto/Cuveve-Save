// Helpers de animação (anime.js v4) com respeito a prefers-reduced-motion.

import { JSAnimation, animate, createSpring, stagger } from 'animejs';

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Entrada de página: fade + subida leve. */
export function pageIn(el: HTMLElement | null): JSAnimation | undefined {
  if (!el || prefersReducedMotion()) return undefined;
  return animate(el, {
    opacity: [0, 1],
    translateY: [14, 0],
    duration: 420,
    ease: 'outExpo',
  });
}

/** Entrada em cascata (cards, knobs, chips). */
export function staggerIn(
  targets: string | HTMLElement | HTMLElement[] | NodeListOf<Element>,
  options?: { delayStep?: number; y?: number; duration?: number },
): JSAnimation | undefined {
  if (prefersReducedMotion()) return undefined;
  const { delayStep = 55, y = 18, duration = 520 } = options ?? {};
  return animate(targets as never, {
    opacity: [0, 1],
    translateY: [y, 0],
    delay: stagger(delayStep),
    duration,
    ease: 'outExpo',
  });
}

/** Quicada elástica curta (toggle, botões, badge). */
export function bounce(el: Element | null): JSAnimation | undefined {
  if (!el || prefersReducedMotion()) return undefined;
  return animate(el, {
    scale: [1, 0.82, 1.06, 1],
    duration: 520,
    ease: 'outElastic(1, .55)',
  });
}

/** Entrada elástica (toast, badges). */
export function elasticIn(el: Element | null): JSAnimation | undefined {
  if (!el || prefersReducedMotion()) return undefined;
  return animate(el, {
    translateY: [24, 0],
    opacity: [0, 1],
    scale: [0.9, 1],
    duration: 520,
    ease: 'outElastic(1, .6)',
  });
}

/** Mola reutilizável para o indicador do knob. */
export function knobSpring(
  from: number,
  to: number,
  onUpdate: (valor: number) => void,
): JSAnimation | undefined {
  if (prefersReducedMotion()) {
    onUpdate(to);
    return undefined;
  }
  const alvo = { angulo: from };
  return animate(alvo, {
    angulo: to,
    ease: createSpring({ stiffness: 180, damping: 17, mass: 0.9 }),
    onUpdate: () => onUpdate(alvo.angulo),
  });
}

export { animate, stagger };
