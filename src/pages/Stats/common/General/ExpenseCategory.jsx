import { DoughnutXS, VerticalSingle } from "common/charts";
import { useState } from "react";

export const ExpenseCategory = ({ prepareCalculations, budget, total }) => {
  const [expenseOfCategory, setExpenseOfCategory] = useState(total);

  return (
    <>
      <VerticalSingle
        prepareCalculations={prepareCalculations}
        setExpenseOfCategory={setExpenseOfCategory}
      />
      <DoughnutXS budget={budget} expenseOfCategory={expenseOfCategory} />
    </>
  );
};
