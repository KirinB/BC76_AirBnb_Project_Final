import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice/User.Slice.js";

export const store = configureStore({
  reducer: { UserSlice },
});
