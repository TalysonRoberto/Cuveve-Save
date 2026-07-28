import { useEffect } from 'react';

/**
 * Solicita persistência de storage no boot.
 * No Android: previne que Auto Backup corrompa localStorage/IndexedDB.
 * Na web: sem efeito colateral (melhora durabilidade se suportado).
 */
export function useStoragePersist() {
  useEffect(() => {
    if (navigator.storage?.persist) {
      navigator.storage.persist().then((granted) => {
        if (granted) {
          console.log('[PresetVault] Storage persistente concedido');
        }
      });
    }
  }, []);
}
