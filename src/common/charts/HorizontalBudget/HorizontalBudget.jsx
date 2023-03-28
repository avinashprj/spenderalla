import "./HorizontalBudget.css";

import { Chart } from "./Chart";
import { getMonthStringShort } from "services/dates/format.helpers";
import { CurrentCurrency } from "features/user/CurrentCurrency";

export const HorizontalBudget = ({ budgetCompare }) => {
  const {
    date: { a, b },
  } = budgetCompare;

  return (
    <>
      <div className="chart-container-horizontal">
        {(budgetCompare.a.budget || budgetCompare.b.budget) && (
          <Chart budgetCompare={budgetCompare} />
        )}
      </div>
      <div className="stats">
        <div className="two">
          <div className="circle"></div>
          <h6 className="text">
            {getMonthStringShort(new Date(a.year, a.month))} {a.year}
          </h6>
          <h4 className="price">
            {!!budgetCompare.a.budget && budgetCompare.a.budget}{" "}
            {!!budgetCompare.a.budget && <CurrentCurrency />}
            {!!!budgetCompare.a.budget && "no budget set"}
          </h4>
        </div>
        <div className="one">
          <div className="circle"></div>
          <h6 className="text">
            {getMonthStringShort(new Date(b.year, b.month))} {b.year}
          </h6>
          <h4 className="price">
            {!!budgetCompare.b.budget && budgetCompare.b.budget}{" "}
            {!!budgetCompare.b.budget && <CurrentCurrency />}
            {!!!budgetCompare.b.budget && "no budget set"}
          </h4>
        </div>
      </div>
    </>
  );
};
