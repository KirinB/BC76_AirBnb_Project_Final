import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).user
    : null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleUpdateUser: (state, action) => {
      state.user = action.payload;
    },
    handleDeleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { handleUpdateUser, handleDeleteUser } = UserSlice.actions;

export default UserSlice.reducer;
