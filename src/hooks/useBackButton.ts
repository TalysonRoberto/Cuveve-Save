import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

/**
 * Intercepta o botão voltar nativo (Android).
 * Ordem de fechamento: modais → view inicial → minimizeApp().
 */
export function useBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const handler = App.addListener('backButton', ({ canGoBack }) => {
      // Se há modais abertos (via query param ou state), fecha primeiro
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.has('modal') || searchParams.has('dialog')) {
        navigate(-1);
        return;
      }

      // Se não está na home, volta para home
      if (location.pathname !== '/') {
        navigate('/');
        return;
      }

      // Na home: minimize app em vez de fechar
      if (canGoBack) {
        App.minimizeApp();
      }
    });

    return () => {
      handler.then((h) => h.remove());
    };
  }, [navigate, location]);
}
