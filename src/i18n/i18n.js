import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { adminEn } from "../locales/en/admin";
import { adminVi } from "../locales/vi/admin";
import { managerUserVI } from "../locales/vi/managerUser";
import { managerUserEN } from "../locales/en/managerUser";
import { LocationEN } from "../locales/en/managerLocation";
import { LocationVI } from "../locales/vi/managerLocation";
const resources = {
  en: {
    admin: adminEn,
    user: managerUserEN,
    location: LocationEN,
  },
  vi: {
    admin: adminVi,
    user: managerUserVI,
    location: LocationVI,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  ns: ["admin", "user", "location"],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
