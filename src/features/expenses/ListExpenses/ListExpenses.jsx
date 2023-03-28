import { Link } from "react-router-dom";

import "./ListExpenses.css";
import { Icon } from "common/media";

import { prepareListExpenses } from "./helpers/prepareListExpenses";
import { useSelector } from "react-redux";
import { expenses } from "../expensesSlice";
import { getDay, getDayOfWeek } from "services/dates/format.helpers";
import { filterListExpense } from "./helpers/filterListExpense";
import { CurrentCurrency } from "features/user/CurrentCurrency";

export const ListExpenses = ({ searchParams }) => {
  const expensesList = useSelector(expenses);
  const resultExpenses = searchParams
    ? filterListExpense(expensesList, searchParams)
    : expensesList;
  const { listDates, listExpenses } = prepareListExpenses(resultExpenses);
  
  let content; 

  content = listDates.reverse().map((date) => {
    const [year, month, day] = date.split("-");

    return (
      <div className="one-day-expenses" key={date}>
        <div className="day-of-the-week">
          <h4 className="number">{getDay(new Date(year, month, day))}</h4>
          <h4 className="date">{getDayOfWeek(new Date(year, month, day))}</h4>
        </div>
        {listExpenses[date].map(({ category, amount, id }) => (
          <Link to={`/item/${id}`} key={id}>
            <div className="list">
              <span className="category-icon material-icons">
                <Icon variant="category-icon">{category}</Icon>
              </span>
              <div className="category-and-price">
                <h4 className="category">{category}</h4>
                <h3 className="price">
                  {amount} <CurrentCurrency />
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  });

  return <div className="list-expenses">{content}</div>;
};
