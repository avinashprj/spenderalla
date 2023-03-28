import { Route, Routes } from "react-router-dom";

import { ScrollToTop } from "app/ScrollToTop/ScrollToTop";
import { Layout } from "app/Layout/Layout";
import {
  AboutUnit,
  AddExpense,
  Compare,
  CompareSelectDate,
  EditBudget,
  Filter,
  ForgotPass,
  Home,
  LogIn,
  NotFound,
  Register,
  Settings,
  Stats,
} from "pages";
import { General } from "pages/Stats/common/General/General";
import { ExpensesLog } from "pages/Stats/common/ExpensesLog/ExpensesLog";
import { FetchData } from "./FetchData/FetchData";
import { SetBudget } from "pages/SetBudget/SetBudget";
import { Welcome } from "pages/Welcome/Welcome";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <FetchData />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="editbudget" element={<EditBudget />} />
          <Route path="setbudget" element={<SetBudget />} />
          <Route path="addexpense" element={<AddExpense />} />
          <Route path="item/:expenseId" element={<AboutUnit />} />
          <Route path="stats" element={<Stats />}>
            <Route index element={<General />} />
            <Route path="log" element={<ExpensesLog />} />
          </Route>
          <Route path="filter" element={<Filter />} />
          <Route path="compare" element={<CompareSelectDate />} />
          <Route path="/compare/result" element={<Compare />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpass" element={<ForgotPass />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
