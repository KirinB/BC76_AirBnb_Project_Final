import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExchangeRates = createAsyncThunk(
  "exchangeRate/fetchRates",
  async () => {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    return response.data.rates; // Trả về toàn bộ rates
  }
);

const currencySymbols = {
  USD: "$",
  VND: "₫",
  JPY: "¥",
  THB: "฿",
  KRW: "₩",
  SGD: "$",
};

const exchangeRateSlice = createSlice({
  name: "exchangeRate",
  initialState: {
    rates: {}, // Chứa tất cả các rates
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    currentCurrency: "VND", // Loại tiền hiện tại
    currentSymbol: "₫", // Ký hiệu của loại tiền hiện tại
  },
  reducers: {
    setCurrency: (state, action) => {
      const currency = action.payload;
      state.currentCurrency = currency;
      state.currentSymbol = currencySymbols[currency] || ""; // Lấy ký hiệu tương ứng
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rates = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrency } = exchangeRateSlice.actions;
export default exchangeRateSlice.reducer;
