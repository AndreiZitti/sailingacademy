import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from './translations/en.json';
import roTranslations from './translations/ro.json';

const resources = {
  en: {
    translation: enTranslations
  },
  ro: {
    translation: roTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
