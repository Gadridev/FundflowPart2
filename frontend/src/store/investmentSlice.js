import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInvestorPortfolio, investInProject } from "../api/investorApi";

export const fetchPortfolio = createAsyncThunk(
  "investments/fetchPortfolio",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchInvestorPortfolio();
      return res.data ?? { investments: [], totalInvested: 0 };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const invest = createAsyncThunk(
  "investments/invest",
  async ({ projectId, amount }, { rejectWithValue }) => {
    try {
      const res = await investInProject(projectId, { amount });
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const investmentSlice = createSlice({
  name: "investments",
  initialState: {
    portfolio: [],
    totalInvested: 0,
    loading: false,
    error: null,
    investLoading: false,
    investError: null,
  },
  reducers: {
    clearInvestError(state) {
      state.investError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolio = action.payload.investments ?? action.payload ?? [];
        state.totalInvested = action.payload.totalInvested ?? state.portfolio.reduce(
          (sum, inv) => sum + Number(inv.amountInvested ?? inv.amount ?? inv.investedAmount ?? 0),
          0
        );
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(invest.pending, (state) => {
        state.investLoading = true;
        state.investError = null;
      })
      .addCase(invest.fulfilled, (state) => {
        state.investLoading = false;
      })
      .addCase(invest.rejected, (state, action) => {
        state.investLoading = false;
        state.investError = action.payload;
      });
  },
});

export const { clearInvestError } = investmentSlice.actions;
export default investmentSlice.reducer;
