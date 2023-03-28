import styles from "./howBudgetExpenses.module.css";
import { Link } from "react-router-dom";

export const howBudgetExpenses = (budgetCurrent, expensesList) => {
  const bud = !!budgetCurrent.budget;
  const exp = !!expensesList.length;

  let res;

  if (!bud && !exp) {
    res = (
      <>
        <Link to="/addexpense">expenses</Link>
        {" "} and {" "}
        <Link to="/setbudget">budget</Link>
      </>
    );
  } else if (!bud) {
    res = <Link to="/setbudget">budget</Link>;
  } else if (!exp) {
    res = <Link to="/addexpense">expense</Link>;
  }

  return (
    <h4 className={styles.description}>
      enter your {res} for the current month to use all the features of the
      application
    </h4>
  );
};