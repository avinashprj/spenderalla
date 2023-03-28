import "./VerticalSingle.css";

import { Chart } from "./Chart";

export const VerticalSingle = ({prepareCalculations, setExpenseOfCategory}) => {
  return (
    <div className="chart-container-vertical-single">
      <Chart prepareCalculations={prepareCalculations} setExpenseOfCategory={setExpenseOfCategory} />
    </div>
  );
};
