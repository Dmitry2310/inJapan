import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationJA from "./locales/ja/translation.json";
import translationRU from "./locales/ru/translation.json";

const I18NEXT_LOCAL_STORAGE_KEY = "i18next_lng";

const resources = {
  en: {
    translation: translationEN,
  },
  ja: {
    translation: translationJA,
  },
  ru: {
    translation: translationRU,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getLocalStorage(),
  interpolation: {
    escapeValue: false,
  },
});

function getLocalStorage() {
  return localStorage.getItem(I18NEXT_LOCAL_STORAGE_KEY) || "en";
}

function setLocalStorage(nextLng) {
  localStorage.setItem(I18NEXT_LOCAL_STORAGE_KEY, nextLng);
}

i18n.on("languageChanged", setLocalStorage);

export default i18n;