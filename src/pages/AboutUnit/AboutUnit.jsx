import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./AboutUnit.module.css";

import { Close } from "common/buttons";
import { Expense } from "features/expenses/Expense/Expense";
import {
  getDay,
  getDayOfWeek,
  getMonthString,
} from "services/dates/format.helpers";
import { status } from "features/expenses/expensesSlice";
import { expensesForId } from "features/expenses/expensesSlice";
import { Skeleton } from "./common/Skeleton/Skeleton";
import { user } from "features/user/userSlice";
import { useLayoutEffect, useState } from "react";
import { readFile } from "services/firebase/storage/storage";

export const AboutUnit = () => {
  const navigate = useNavigate();

  const { expenseId } = useParams();
  const onCloseClick = () => {
    navigate(-1);
  };

  const statusExpenses = useSelector(status);
  const expense = useSelector((state) => expensesForId(state, expenseId));
  const { userId } = useSelector(user);

  const [{ url, statusUrl }, setUrl] = useState({ url: "", statusUrl: "idle" });

  useLayoutEffect(() => {
    if (statusExpenses === "succeeded" && expense) {
      readFile({ userId, postId: expense.id, filename: expense.file }).then(
        (e) => setUrl({ url: e, statusUrl: "succeeded" })
      );
    } else if (statusExpenses === "succeeded" && !expense) {
      setUrl({ url: "", statusUrl: "succeeded" });
    }
  }, [statusExpenses, expense, userId]);

  let content;

  content =
    statusExpenses === "succeeded" && statusUrl === "succeeded" && expense ? (
      <>
        <header>
          <div className={styles.date}>
            <h2>{getDayOfWeek(new Date(expense.date))}, </h2>
            <span className={styles.twoLevel}>
              {getDay(new Date(expense.date)) +
                " " +
                getMonthString(new Date(expense.date))}
            </span>
          </div>
          <Close onClick={onCloseClick} variant="black" />
        </header>
        <Expense expense={expense} url={url} />
      </>
    ) : statusExpenses === "succeeded" &&
      statusUrl === "succeeded" &&
      !expense ? (
      "Такого нет"
    ) : (
      <Skeleton />
    );

  return <div className={styles.wrapper}>{content}</div>;
};
