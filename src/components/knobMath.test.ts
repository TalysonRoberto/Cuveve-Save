import { describe, expect, it } from 'vitest';
import { ANG_MAX, ANG_MIN, angleToValue, pointerAngle, snapAngle, stepAngles, valueToAngle } from './knobMath';

describe('knobMath', () => {
  it('extremos mapeiam para os extremos angulares', () => {
    expect(valueToAngle(0, 0, 100)).toBe(ANG_MIN);
    expect(valueToAngle(100, 0, 100)).toBe(ANG_MAX);
    expect(valueToAngle(0, 0, 8)).toBe(ANG_MIN);
    expect(valueToAngle(8, 0, 8)).toBe(ANG_MAX);
  });

  it('meio da faixa mapeia para 0° (12h)', () => {
    expect(valueToAngle(50, 0, 100)).toBe(0);
    expect(valueToAngle(4, 0, 8)).toBe(0);
  });

  it('angleToValue faz clamp fora da faixa angular', () => {
    expect(angleToValue(-200, 0, 100)).toBe(0);
    expect(angleToValue(200, 0, 100)).toBe(100);
    expect(angleToValue(-200, 0, 8)).toBe(0);
    expect(angleToValue(200, 0, 8)).toBe(8);
  });

  it('roundtrip valor → ângulo → valor', () => {
    for (const v of [0, 1, 4, 7, 8]) {
      expect(angleToValue(valueToAngle(v, 0, 8), 0, 8)).toBe(v);
    }
    for (const v of [0, 25, 50, 99, 100]) {
      expect(angleToValue(valueToAngle(v, 0, 100), 0, 100)).toBe(v);
    }
  });

  it('stepAngles gera 9 posições igualmente espaçadas', () => {
    const s = stepAngles(9);
    expect(s).toHaveLength(9);
    expect(s[0]).toBe(ANG_MIN);
    expect(s[8]).toBe(ANG_MAX);
    expect(s[4]).toBe(0);
  });

  it('snapAngle encaixa na posição mais próxima', () => {
    expect(snapAngle(-140, 9)).toBe(ANG_MIN);
    expect(snapAngle(3, 9)).toBe(0);
    expect(snapAngle(20, 9)).toBeCloseTo(33.75);
    expect(snapAngle(140, 9)).toBe(ANG_MAX);
  });

  it('pointerAngle: 12h=0, 3h=90, 6h=±180, 9h=−90', () => {
    expect(pointerAngle(50, 50, 50, 0)).toBeCloseTo(0);
    expect(pointerAngle(50, 50, 100, 50)).toBeCloseTo(90);
    expect(Math.abs(pointerAngle(50, 50, 50, 100))).toBeCloseTo(180);
    expect(pointerAngle(50, 50, 0, 50)).toBeCloseTo(-90);
  });
});
