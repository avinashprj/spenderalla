import { ListExpenses } from "features/expenses/ListExpenses/ListExpenses";
import { MonthAndYear } from "common/text";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ExpensesLog.module.css";
import { useSelector } from "react-redux";
import {
  currentActivity,
  statusActivity,
} from "features/activity/activitySlice";
import { useMemo } from "react";

export const ExpensesLog = () => {
  const activity = useSelector(currentActivity);
  const status = useSelector(statusActivity);
  const navigate = useNavigate();
  const location = useLocation();

  const onCallFilterClcik = () => {
    navigate("/filter");
  };

  const { search } = location;

  const searchParams = useMemo(() => {
    return search
      ? JSON.parse(search.replaceAll("%22", '"').match(/\{.+/))
      : "";
  }, [search]);

  return (
    <>
      <div className={styles.date}>
        {status === "succeeded" ? (
          <MonthAndYear>{new Date(activity.year, activity.month)}</MonthAndYear>
        ) : (
          <div>loading...</div>
        )}

        <button
          onClick={onCallFilterClcik}
          className={searchParams ? styles.filter : styles.nofilter}
        >
          Filter
        </button>
      </div>
      <ListExpenses searchParams={searchParams} />
    </>
  );
};
