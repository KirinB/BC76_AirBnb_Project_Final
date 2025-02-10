import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungSerivce } from "../../services/nguoiDung.service";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async ({ currentPage, keyword }) => {
    const response = await nguoiDungSerivce.getUserFind(currentPage, keyword);
    return response.data.content;
  }
);
const initialState = { listUsers: [], totalRow: [] };
const managerUserSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.listUsers = action.payload.data.map((user) => ({
        ...user,
        key: user.id,
      }));
      state.totalRow = action.payload.totalRow;
    });
  },
});

export default managerUserSlice.reducer;
