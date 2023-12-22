import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.academind.first_ionic_app',
  appName: 'BMI Calculator',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
