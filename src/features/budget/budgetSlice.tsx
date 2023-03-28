import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  compareBudget,
  createBudget,
  getBudget,
  updateBudget,
} from "services/firebase/ferestore/firestore";
import { Budget, Error, IBudget, Status, UserID } from "types/types";

interface IState {
  budget: IBudget | {};
  error: Error;
  status: Status;
  budgetCompare: {a: any, b: any};
  budgetCompareStatus: Status;
}

const initialState: IState = {
  budget: {},
  budgetCompare: {a: {year: '', month: '', budget: ''}, b: {year: '', month: '', budget: ''}},
  budgetCompareStatus: 'idle',
  error: null,
  status: "idle",
};

export const initBudget = createAsyncThunk(
  "budget/init",
  async (
    data: { userId: UserID; date: Date; budget: Budget },
    { rejectWithValue }
  ) => {
    try {
      const { userId, date, budget } = data;
      const res = await createBudget(userId, date, budget);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editBudget = createAsyncThunk(
  "budget/edit",
  async (
    data: { userId: UserID; date: Date; budget: Budget },
    { rejectWithValue }
  ) => {
    
    try {
      const { userId, date, budget } = data;
      const res = await updateBudget(userId, date, budget);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const budgetFetch = createAsyncThunk(
  "budget/fetch",
  async ({userId, date}: {userId: UserID, date: Date}, { rejectWithValue }) => {
    try {
      const budget = await getBudget(userId, date);
      return budget;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const budgetCompare = createAsyncThunk(
  "budget/compare",
  async ({userId, date}: {userId: UserID, date: {a: Date, b: Date}}, { rejectWithValue }) => {
    try {
      const budget = await compareBudget(userId, date);
      return budget;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    clearBudget: (state) => {
      state.budget = {}
      state.budgetCompare = {a: {year: '', month: '', budget: ''}, b: {year: '', month: '', budget: ''}}
      state.status = "idle"
      state.budgetCompareStatus = "idle"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(budgetFetch.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(budgetFetch.fulfilled, (state, action) => {
        state.budget = action.payload;
        state.status = "succeeded";
      })
      .addCase(budgetFetch.rejected, (state, action) => {
        state.error = `${action.payload}`;
        state.status = "failed";
      })
      .addCase(editBudget.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(editBudget.fulfilled, (state, action) => {
        state.budget = action.payload
        state.status = "succeeded";
      })
      .addCase(editBudget.rejected, (state, action) => {
        state.error = `${action.payload}`;
        state.status = "failed";
      })
      .addCase(initBudget.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(initBudget.fulfilled, (state, action) => {
        state.budget = action.payload
        state.status = "succeeded";
      })
      .addCase(initBudget.rejected, (state, action) => {
        state.error = `${action.payload}`;
        state.status = "failed";
      })
      .addCase(budgetCompare.pending, (state) => {
        state.error = null;
        state.budgetCompareStatus = "loading";
      })
      .addCase(budgetCompare.fulfilled, (state, action) => {
        state.budgetCompare = action.payload
        state.budgetCompareStatus = "succeeded";
      })
      .addCase(budgetCompare.rejected, (state, action) => {
        state.error = `${action.payload}`;
        state.budgetCompareStatus = "failed";
      });
  },
});

export default budgetSlice.reducer;
export const { clearBudget } = budgetSlice.actions

export const budgetStatus = state => state.budget.status
export const budget = state => state.budget.budget

export const budgetCompareList = state => state.budget.budgetCompare
export const budgetCompareStatus =  state => state.budget.budgetCompareStatus
