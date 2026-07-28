import { useCallback, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

interface ExportOptions {
  filename: string;
  data: string;
  mimeType?: string;
}

/**
 * Exporta dados como arquivo.
 * No WebView Android: writeFile + share sheet (blob+<a download> não funciona).
 * Na web: fallback com blob + <a download>.
 */
export function useExport() {
  const [exporting, setExporting] = useState(false);

  const exportFile = useCallback(async ({ filename, data, mimeType = 'application/json' }: ExportOptions) => {
    setExporting(true);
    try {
      if (Capacitor.isNativePlatform()) {
        // No Android: escreve no cache e abre share sheet
        const result = await Filesystem.writeFile({
          path: filename,
          data: data,
          directory: Directory.Cache,
        });

        await Share.share({
          title: filename,
          text: `Exportado de Preset Vault`,
          url: result.uri,
          dialogTitle: 'Salvar ou compartilhar',
        });
      } else {
        // Web fallback: blob + <a download>
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      return true;
    } catch (err) {
      console.error('Erro ao exportar:', err);
      return false;
    } finally {
      setExporting(false);
    }
  }, []);

  return { exportFile, exporting };
}
