import { Link, useNavigate } from "react-router-dom";

import { Add } from "common/buttons";
import { ListExpenses } from "features/expenses/ListExpenses/ListExpenses";
import { Slider } from "common/media";

import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { expenses, status } from "features/expenses/expensesSlice";
import { Skeleton } from "./common/Skeleton/Skeleton";
import { budgetStatus } from "features/budget/budgetSlice";

export const Home = () => {
  const navigate = useNavigate();

  const stateExpenses = useSelector(status);
  const expensesList = useSelector(expenses);
  const budgetStat = useSelector(budgetStatus);

  const onAddExpensePageGoTo = () => {
    navigate("addexpense");
  };

  let content;

  if (stateExpenses === "succeeded" && budgetStat === "succeeded") {
    let list = false;
    let button = false;

    if (!!expensesList.length) {
      list = (
        <>
          <div className={styles.seeAll}>
            <div>Lost Expenses</div>
            <Link to="stats/log">See all</Link>
          </div>
          <ListExpenses />
        </>
      );
    } else {
      button = (
        <div className={styles.add}>
          <Add onClick={onAddExpensePageGoTo} />
          <h5>Add Expense</h5>
        </div>
      );
    }

    content = (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Slider />
        </header>
        <main className={styles.main}>
          {list}
          {button}
        </main>
      </div>
    );
  } else if (stateExpenses === "idle" || stateExpenses === "loading") {
    content = <Skeleton />;
  }

  return content;
};
