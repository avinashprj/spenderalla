import "./Doughnut.css";

import { Chart } from "./Chart";
import { budgetPercentage, totalAmount } from "services/calculation/calculation";
import { CurrentCurrency } from "features/user/CurrentCurrency";

export const Doughnut = ({expensesList, budget}) => {
  const percentage = budgetPercentage(expensesList, budget.budget)
  const total = totalAmount(expensesList)
  const budgetCurrent = budget.budget
  
  return (
    <div className="doughnut">
      <div className="chart-container">
        <Chart budgetCurrent={budgetCurrent} totalAmount={total} />
        <h5 className="progress">{percentage} %</h5>
      </div>
      <h5 className="expenses">
        <span>{total} <CurrentCurrency /> </span>
        <span className="slash">/</span> <span className="limit">{budgetCurrent} <CurrentCurrency /></span>
      </h5>
    </div>
  );
};
