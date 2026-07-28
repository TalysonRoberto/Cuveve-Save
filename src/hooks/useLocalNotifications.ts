import { useCallback, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

/**
 * Hook para notificações locais.
 * No WebView Android: @capacitor/local-notifications (funciona com app fechado).
 * Na web: fallback para window.Notification (se disponível).
 */
export function useLocalNotifications() {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    LocalNotifications.requestPermissions().then((result) => {
      setHasPermission(result.display === 'granted');
    });
  }, []);

  const scheduleNotification = useCallback(
    async (title: string, body: string, hour: number, minute: number) => {
      if (Capacitor.isNativePlatform()) {
        if (!hasPermission) return false;

        await LocalNotifications.schedule({
          notifications: [
            {
              title,
              body,
              id: Date.now(),
              schedule: {
                on: { hour, minute },
                allowWhileIdle: true,
              },
              sound: undefined,
              attachments: undefined,
              actionTypeId: '',
              extra: null,
            },
          ],
        });
        return true;
      } else {
        // Web fallback
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(title, { body });
          return true;
        }
        return false;
      }
    },
    [hasPermission],
  );

  const cancelAll = useCallback(async () => {
    if (Capacitor.isNativePlatform()) {
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel(pending);
      }
    }
  }, []);

  return { hasPermission, scheduleNotification, cancelAll };
}
