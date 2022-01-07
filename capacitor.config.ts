import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agenda.v1',
  appName: 'agendaApp',
  webDir: 'www',
  bundledWebRuntime: false,
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    },
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
};

export default config;
