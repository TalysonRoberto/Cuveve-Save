import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.presetvault.save',
  appName: 'Preset Vault',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
