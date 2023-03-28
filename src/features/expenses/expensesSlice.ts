import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addExpense,
  getExpenses,
  compareExpenses,
} from "services/firebase/ferestore/firestore";
import {
  Error,
  IExpense,
  INewExpense,
  listDatesCompare,
  Status,
  UserID,
} from "types/types";

interface IState {
  expenses: IExpense[];
  error: Error;
  status: Status;
  expensesCompare: { a: IExpense[]; b: IExpense[] } | {a: [], b: []};
  expensesCompareStatus: Status;
}

const initialState: IState = {
  expenses: [],
  expensesCompare: {a: [], b: []},
  error: null,
  status: "idle",
  expensesCompareStatus: "idle"
};

interface IFetchExpenses {
  userId: UserID;
  date: Date;
}

interface IAddExpenses {
  userId: UserID;
  expense: INewExpense;
}

export const expensesFetch = createAsyncThunk(
  "expenses/fetch",
  async ({ userId, date }: IFetchExpenses, { rejectWithValue }) => {
    try {
      const expenses = await getExpenses(userId, date);
      return expenses;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createExpense = createAsyncThunk(
  "expense/create",
  async (data: IAddExpenses, { rejectWithValue }) => {
    try {
      const { userId, expense } = data;
      const res = await addExpense(userId, expense);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const compareExpensesDate = createAsyncThunk(
  "expense/compare",
  async (
    data: { userId: string; date: listDatesCompare },
    { rejectWithValue }
  ) => {
    try {
      const { userId, date } = data;
      const res = await compareExpenses(userId, date);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    clearExpenses: (state) => {
      state.expenses = []
      state.expensesCompare = {a: [], b: []}
      state.status = "idle"
      state.expensesCompareStatus = "idle"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(expensesFetch.pending, (state, action) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(expensesFetch.fulfilled, (state, action) => {
        state.expenses = action.payload!;
        state.status = "succeeded";
      })
      .addCase(expensesFetch.rejected, (state, action) => {
        state.error = `${action.payload}`;
        state.status = "failed";
      })
      .addCase(createExpense.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.error = `${action.payload}`;
        state.status = "failed";
      })
      .addCase(compareExpensesDate.pending, (state) => {
        state.error = null;
        state.expensesCompareStatus = "loading";
      })
      .addCase(compareExpensesDate.fulfilled, (state, action) => {
        state.expensesCompare = action.payload;
        state.expensesCompareStatus = "succeeded";
      })
      .addCase(compareExpensesDate.rejected, (state, action) => {
        state.error = `${action.payload}`;
        state.expensesCompareStatus = "failed";
      });
  },
});

export default expensesSlice.reducer;
export const { clearExpenses } = expensesSlice.actions

export const status = (state) => state.expenses.status;
export const expenses = (state) => state.expenses.expenses;
export const expensesForId = (state, expenseId) => {
  return state.expenses.expenses.find((exp) => exp.id === expenseId);
};

export const expensesCompare = (state) => state.expenses.expensesCompare;
export const expensesCompareStatus = (state) => state.expenses.expensesCompareStatus;