import { Button } from "common/buttons"
import { ChartWrapper } from "common/charts"
import { MonthAndYear } from "common/text"
import { Doughnut } from "common/charts"
import { useNavigate } from "react-router-dom"
import styles from './OneMonthSlide.module.css'
import { useSelector } from "react-redux"
import { Skeleton } from "./common/Skeleton/Skeleton"
import { expenses } from "features/expenses/expensesSlice"

export const OneMonthSlide = ({ month, year }) => {

  const budget = useSelector(state => state.budget.budget)
  const status = useSelector(state => state.budget.status)
  const expensesList = useSelector(expenses)

  const navigate = useNavigate();

  const onOpenEditBudgetClick = () => {
    navigate(budget.budget ? 'editbudget' : 'setbudget');
  };

  let content;

  if (status === 'loading') {
    content = <Skeleton />
  } else if (status === 'succeeded' && !budget.budget) {
    content = (
      <ChartWrapper swiper={true}>
        <MonthAndYear>{new Date(year, month)}</MonthAndYear>
        <div className={styles.centerButton}>
          <Button onClick={onOpenEditBudgetClick} variant="primary_blue" wa={true}>
            {budget.budget ? 'Edit Budget' : 'Set Budget'}
          </Button>
        </div>
        <h4 className={styles.description}> of the current month to use all the features of the app</h4>
      </ChartWrapper>
    )
  } else if (status === 'succeeded' && budget.budget) {
    content = (
      <ChartWrapper swiper={true}>
        <MonthAndYear>{new Date(year, month)}</MonthAndYear>
        <Doughnut expensesList={expensesList} budget={budget}/>
        <div className={styles.centerButton}>
          <Button onClick={onOpenEditBudgetClick} variant="secondary_blue">
            Edit Budget
          </Button>
        </div>
      </ChartWrapper>
    )
  }

  return (
    <>
      {content}
    </>
  )
}