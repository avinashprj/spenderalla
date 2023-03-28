import { Button, Close } from "common/buttons";
import { activity } from "features/activity/activitySlice";
import { budgetCompare } from "features/budget/budgetSlice";
import { compareExpensesDate, status } from "features/expenses/expensesSlice";
import { user } from "features/user/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectDate } from "./common/DatePicker/SelectDate";
import { Skeleton } from "./common/Skeleton/Skeleton";
import styles from "./CompareSelectDate.module.css";

export const CompareSelectDate = () => {
  const dispatch = useDispatch()
  const activityList = useSelector(activity);
  const expensesStatus = useSelector(status);

  const {userId} = useSelector(user)

  const [date, setDate] = useState();

  const navigate = useNavigate();

  const onComparePageClick = async () => {
    dispatch(compareExpensesDate({userId, date}))
    dispatch(budgetCompare({userId, date: {a: date[0].from, b: date[1].from}}))
    navigate("/compare/result");
  };

  let content;

  if (expensesStatus !== "succeeded") {
    content = <Skeleton />;
  } else {
    content = (
      <div className={styles.wrapper}>
        <header>
          <span>Compare</span>
          <Close variant="black" onClick={() => navigate(-1)} />
        </header>
        <SelectDate setDate={setDate} activityList={activityList} />
        <Button onClick={onComparePageClick} variant="primary_blue">
          Compare
        </Button>
      </div>
    );
  }

  return content;
};
