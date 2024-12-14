import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice/User.Slice";

export const store = configureStore({
  reducer: { UserSlice },
});
