import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import de from "@/locales/de/translation.json";
import it from "@/locales/it/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      it: { translation: it },
    },
    fallbackLng: "de",
    supportedLngs: ["de", "it"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "quizzleLng",
    },
    returnNull: false,
  });

export default i18n;