import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { adminEn } from "../locales/en/admin";
import { adminVi } from "../locales/vi/admin";
import { managerUserVI } from "../locales/vi/managerUser";
import { managerUserEN } from "../locales/en/managerUser";
import { LocationEN } from "../locales/en/managerLocation";
import { LocationVI } from "../locales/vi/managerLocation";
import { RoomEN } from "../locales/en/managerRoom";
import { RoomVi } from "../locales/vi/managerRoom";
import { BookingEN } from "../locales/en/managerBooking";
import { BookingVI } from "../locales/vi/managerBooking";
import { dashBoardEN } from "../locales/en/dashBoard";
import { dashBoardVI } from "../locales/vi/dashBoard";
// Xử lý onload trang k hiện select
export const locales = {
  en: "ENG",
  vi: "VIE",
};
const saveLangue = localStorage.getItem("language" || "vi");
const resources = {
  en: {
    admin: adminEn,
    dashboard: dashBoardEN,
    user: managerUserEN,
    location: LocationEN,
    room: RoomEN,
    booking: BookingEN,
  },
  vi: {
    admin: adminVi,
    dashboard: dashBoardVI,
    user: managerUserVI,
    location: LocationVI,
    room: RoomVi,
    booking: BookingVI,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: saveLangue,
  ns: ["admin", "user", "dashboard", "location", "room", "booking"],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
