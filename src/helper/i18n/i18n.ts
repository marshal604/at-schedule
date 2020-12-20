import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextBrowserLangDetector from 'i18next-browser-languagedetector';

import zhTw from 'src/assets/i18n/zh-TW.json';
import en from 'src/assets/i18n/en.json';
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  'zh-TW': {
    translation: zhTw
  },
  en: {
    translation: en
  }
};

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage']
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(i18nextBrowserLangDetector)
  .init({
    resources,
    detection: DETECTION_OPTIONS,
    fallbackLng: 'zh-TW',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
