import "./DoughnutXS.css";

import { Chart } from "./Chart";
import { CurrentCurrency } from "features/user/CurrentCurrency";

export const DoughnutXS = ({ budget, expenseOfCategory }) => {
  const result =
    expenseOfCategory > budget
      ? [100, 0]
      : [
          (expenseOfCategory * 100) / budget,
          100 - (expenseOfCategory * 100) / budget,
        ];

  return (
    <div className="doughnutXS">
      <div className="money">
        <h4 className="expenses">{expenseOfCategory} <CurrentCurrency /></h4>
        <h5 className="total">/ {budget} <CurrentCurrency /></h5>
      </div>
      <div className="chart-container-doughnutXS">
        <Chart result={result} />
      </div>
      <h4 className="percentage">
        {Math.floor((expenseOfCategory * 100) / budget) === 0
          ? "< 1"
          : Math.ceil((expenseOfCategory * 100) / budget)}{" "}
        %
      </h4>
    </div>
  );
};
