import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user.slice.js";
import exchangeRateReducer from "./slice/exchangeRateSlice.js";
import favoriteRooms from "./slice/favoriteRooms.slice.js";
import managerUser from "../store/slice/managerUser.slice.js";
export const store = configureStore({
  reducer: {
    users: managerUser,
    userSlice,
    exchangeRate: exchangeRateReducer,
    favoriteRooms,
  },
});
