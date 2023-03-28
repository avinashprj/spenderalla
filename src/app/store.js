import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/user/userSlice";
import activityReducer from "features/activity/activitySlice";
import budgetReducer from 'features/budget/budgetSlice'
import expensesReducer from 'features/expenses/expensesSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    activity: activityReducer,
    budget: budgetReducer,
    expenses: expensesReducer,
  },
});
