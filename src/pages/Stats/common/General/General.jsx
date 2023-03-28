import { ChartWrapper, Doughnut, String } from "common/charts";
import { MonthAndYear, TitleChart } from "common/text";
import { currentActivity } from "features/activity/activitySlice";
import { budget } from "features/budget/budgetSlice";
import { expenses, status } from "features/expenses/expensesSlice";
import { useSelector } from "react-redux";
import { verticalChart } from "services/calculation/calculation";
import { ExpenseCategory } from "./ExpenseCategory";
import { howBudgetExpenses } from "./utils/howBudgetExpenses";

export const General = () => {
  const budgetCurrent = useSelector(budget);
  const expensesList = useSelector(expenses);
  const activity = useSelector(currentActivity);
  const expensesStatus = useSelector(status);
  const prepareCalculations = verticalChart({ expensesList: expensesList });
  const canBudgetExpenseLink =
    expensesStatus === "succeeded"
      ? howBudgetExpenses(budgetCurrent, expensesList)
      : null;

  const content =
    expensesStatus === "succeeded" ? (
      <>
        <ChartWrapper mb={true}>
          <MonthAndYear>{new Date(activity.year, activity.month)}</MonthAndYear>
          {expensesList.length && budgetCurrent.budget ? (
            <Doughnut budget={budgetCurrent} expensesList={expensesList} />
          ) : (
            canBudgetExpenseLink
          )}
        </ChartWrapper>
        <ChartWrapper mb={true}>
          <TitleChart align="center">Expenses / Category</TitleChart>
          {expensesList.length && budgetCurrent.budget ? (
            <ExpenseCategory
              prepareCalculations={prepareCalculations}
              budget={budgetCurrent.budget}
              total={prepareCalculations[1][0]}
            />
          ) : (
            canBudgetExpenseLink
          )}
        </ChartWrapper>
        <ChartWrapper mb={true}>
          <TitleChart align="center">Expenses / Day</TitleChart>
          {expensesList.length && budgetCurrent.budget ? (
            <String />
          ) : (
            canBudgetExpenseLink
          )}
        </ChartWrapper>
      </>
    ) : (
      <div>Loading...</div>
    );

  return content;
};
