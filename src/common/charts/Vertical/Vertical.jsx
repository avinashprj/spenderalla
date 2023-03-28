import "./Vertical.css";

import { Chart } from "./Chart";
import { totalAmount, verticalChart } from "services/calculation/calculation";
import { CurrentCurrency } from "features/user/CurrentCurrency";

export const Vertical = ({ compareList, budgetCompare }) => {
  const [totalA, totalB] = [
    totalAmount(compareList.a),
    totalAmount(compareList.b),
  ];

  const [monthA, monthB] = [
    verticalChart({ expensesList: compareList.a }),
    verticalChart({ expensesList: compareList.b }),
  ];

  return (
    <>
      {(!!compareList.a.length || !!compareList.b.length) && (
        <div className="chart-container-vertical">
          <Chart
            budgetCompare={budgetCompare}
            monthA={monthA}
            monthB={monthB}
          />
        </div>
      )}
      <div className="statspost">
        <div className="two">
          <div className="circle"></div>
          <h4 className="price">
            {!!totalA && totalA} {!!totalA && <CurrentCurrency />}
            {!!!totalA && "no expenses"}
          </h4>
        </div>
        <div className="one">
          <div className="circle"></div>
          <h4 className="price">
            {!!totalB && totalB} {!!totalB && <CurrentCurrency />}
            {!!!totalB && "no expenses"}
          </h4>
        </div>
      </div>
    </>
  );
};
