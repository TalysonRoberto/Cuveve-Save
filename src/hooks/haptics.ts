import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

/**
 * Vibração leve (toque em knob, chip, toggle).
 * No WebView Android usa @capacitor/haptics; na web usa navigator.vibrate.
 */
export async function hapticImpact(style: 'light' | 'medium' | 'heavy' = 'light') {
  if (Capacitor.isNativePlatform()) {
    const map = {
      light: ImpactStyle.Light,
      medium: ImpactStyle.Medium,
      heavy: ImpactStyle.Heavy,
    };
    await Haptics.impact({ style: map[style] });
  } else if (navigator.vibrate) {
    const durations = { light: 10, medium: 20, heavy: 40 };
    navigator.vibrate(durations[style]);
  }
}

/**
 * Vibração de sucesso (salvar setup, duplicar).
 */
export async function hapticSuccess() {
  if (Capacitor.isNativePlatform()) {
    await Haptics.notification({ type: NotificationType.Success });
  } else if (navigator.vibrate) {
    navigator.vibrate([30, 50, 30]);
  }
}

/**
 * Vibração de erro (validação falhou).
 */
export async function hapticError() {
  if (Capacitor.isNativePlatform()) {
    await Haptics.notification({ type: NotificationType.Error });
  } else if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }
}

/**
 * Vibração de seleção (mudar filtro de tag).
 */
export async function hapticSelection() {
  if (Capacitor.isNativePlatform()) {
    await Haptics.selectionStart();
  } else if (navigator.vibrate) {
    navigator.vibrate(5);
  }
}
