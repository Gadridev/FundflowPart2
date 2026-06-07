import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { topUpWallet, getWallet } from "../api/investorApi";

export const fetchWallet = createAsyncThunk(
  "wallet/fetchWallet",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getWallet();
      return res.data?.wallet ?? res.data ?? { balance: 0, transactions: [] };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const topUp = createAsyncThunk(
  "wallet/topUp",
  async (amount, { rejectWithValue }) => {
    try {
      const res = await topUpWallet(amount);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0,
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    
    setWallet(state, action) {
      if (action.payload.balance !== undefined) {
        state.balance = action.payload.balance;
      }
      if (action.payload.transactions !== undefined) {
        state.history = action.payload.transactions;
      }
    },
    
    deductBalance(state, action) {
      state.balance = Math.max(0, state.balance - action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance ?? 0;
        state.history = action.payload.transactions ?? [];
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(topUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUp.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.balance !== undefined) {
          state.balance = action.payload.balance;
        }
        if (action.payload?.transaction) {
          state.history = [action.payload.transaction, ...state.history];
        }
      })
      .addCase(topUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setWallet, deductBalance } = walletSlice.actions;
export default walletSlice.reducer;
