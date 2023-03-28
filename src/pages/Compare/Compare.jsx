import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChartWrapper, HorizontalBudget, Vertical } from "common/charts";
import { HorizontalExpenses } from "common/charts/HorizontalExpenses/HorizontalExpenses";
import { Icon } from "common/media";
import { TitleChart } from "common/text";
import {
  budgetCompareList,
  budgetCompareStatus,
} from "features/budget/budgetSlice";
import {
  expensesCompare,
  expensesCompareStatus,
} from "features/expenses/expensesSlice";
import { getMonthString } from "services/dates/format.helpers";
import styles from "./Compare.module.css";

export const Compare = () => {
  const compareList = useSelector(expensesCompare);
  const compareStatus = useSelector(expensesCompareStatus);

  const budgetCompare = useSelector(budgetCompareList);
  const budgetStatus = useSelector(budgetCompareStatus);

  const navigate = useNavigate();

  const onComeBackClick = () => {
    navigate("/stats/", { replace: true });
  };

  let content;

  if (budgetStatus === "succeeded" && compareStatus === "succeeded") {
    content = (
      <>
        <div className={styles.compare}>
          <div className={styles.first}>
            <div className={styles.circle}></div>
            <div className={styles.month}>
              {getMonthString(
                new Date(budgetCompare.date.a.year, budgetCompare.date.a.month)
              )}
            </div>
            <div className={styles.year}>
              {new Date(
                budgetCompare.date.a.year,
                budgetCompare.date.a.month
              ).getFullYear()}
            </div>
          </div>
          <div className={styles.last}>
            <div className={styles.circle}></div>
            <div className={styles.month}>
              {getMonthString(
                new Date(budgetCompare.date.b.year, budgetCompare.date.b.month)
              )}
            </div>
            <div className={styles.year}>
              {new Date(
                budgetCompare.date.b.year,
                budgetCompare.date.b.month
              ).getFullYear()}
            </div>
          </div>
        </div>
        <main>
          <ChartWrapper mb={true}>
            <TitleChart align="left">Budget</TitleChart>
            <HorizontalBudget budgetCompare={budgetCompare} />
          </ChartWrapper>
          <ChartWrapper mb={true}>
            <TitleChart align="left">Expenses</TitleChart>
            <HorizontalExpenses
              budgetCompare={budgetCompare}
              compareList={compareList}
            />
          </ChartWrapper>
          <ChartWrapper mb={true}>
            <TitleChart align="center">Expenses / Category</TitleChart>
            <Vertical budgetCompare={budgetCompare} compareList={compareList} />
          </ChartWrapper>
        </main>
      </>
    );
  } else {
    content = <div>загрузка...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <button onClick={onComeBackClick}>
          <Icon>chevronLeft</Icon>
        </button>
        <h3>Compare</h3>
      </div>
      {content}
    </div>
  );
};
