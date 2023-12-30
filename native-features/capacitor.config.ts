import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Memories',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.154.24:8100',
  },
};

export default config;
