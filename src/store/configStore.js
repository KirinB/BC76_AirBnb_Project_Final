import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user.slice.js";
import exchangeRateReducer from "./slice/exchangeRateSlice.js";

export const store = configureStore({
  reducer: {
    userSlice,
    exchangeRate: exchangeRateReducer,
  },
});
