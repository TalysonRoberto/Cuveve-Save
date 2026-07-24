// Matemática do knob: faixa angular de −135° (mínimo) a +135° (máximo),
// medida em sentido horário a partir das 12h. Pura e testável.

export const ANG_MIN = -135;
export const ANG_MAX = 135;
export const ANG_RANGE = ANG_MAX - ANG_MIN; // 270

/** Converte valor numérico para ângulo do indicador. */
export function valueToAngle(valor: number, min: number, max: number): number {
  if (max <= min) return ANG_MIN;
  const t = (valor - min) / (max - min);
  return ANG_MIN + Math.min(1, Math.max(0, t)) * ANG_RANGE;
}

/** Converte ângulo para valor, com clamp e arredondamento para inteiro. */
export function angleToValue(ang: number, min: number, max: number): number {
  const clamped = Math.min(ANG_MAX, Math.max(ANG_MIN, ang));
  const t = (clamped - ANG_MIN) / ANG_RANGE;
  return Math.round(min + t * (max - min));
}

/** Ângulos das `steps` posições fixas (ex.: 9 posições para 0–8). */
export function stepAngles(steps: number): number[] {
  if (steps <= 1) return [ANG_MIN];
  return Array.from({ length: steps }, (_, i) => ANG_MIN + (i * ANG_RANGE) / (steps - 1));
}

/** Encaixa o ângulo na posição fixa mais próxima (snap). */
export function snapAngle(ang: number, steps: number): number {
  const positions = stepAngles(steps);
  let melhor = positions[0];
  for (const p of positions) {
    if (Math.abs(p - ang) < Math.abs(melhor - ang)) melhor = p;
  }
  return melhor;
}

/**
 * Ângulo do ponteiro relativo ao centro do knob,
 * em graus, sentido horário a partir das 12h (12h = 0°, 3h = 90°).
 */
export function pointerAngle(cx: number, cy: number, x: number, y: number): number {
  return (Math.atan2(x - cx, -(y - cy)) * 180) / Math.PI;
}
