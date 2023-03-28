import "./String.css";

import { Icon } from "common/media";
import { Chart } from "./Chart";
import { useSelector } from "react-redux";
import { currentActivity } from "features/activity/activitySlice";
import { expenses } from "features/expenses/expensesSlice";
import { listDaysInMonth } from "./utils/date/listDaysInMonth";
import { dailyExpenses } from "./utils/calculation/dailyExpenses";
import { useState } from "react";

export const String = () => {
  const activity = useSelector(currentActivity);
  const expensesList = useSelector(expenses);

  const daysInMonth = activity ? listDaysInMonth(activity) : undefined;

  const expenseDaily = dailyExpenses(daysInMonth.list, expensesList);
  const [[firstInterval, lastInterval, count, action], setInterval] = useState([
    0,
    daysInMonth.days,
    0,
    "+",
  ]);

  const onChangeScaleClick = () => {
    if (lastInterval - firstInterval > 7 && action === "+") {
      setInterval([firstInterval + 3, lastInterval - 3, count + 1, "+"]);
    } else if (lastInterval - firstInterval <= 7 || action === "-") {
      if (count === 0) {
        setInterval([firstInterval + 3, lastInterval - 3, count + 1, "+"]);
      } else {
        setInterval([firstInterval - 3, lastInterval + 3, count - 1, "-"]);
      }
    }
  };

  return (
    <>
      <Chart dates={expenseDaily.dates} amount={expenseDaily.amount} firstInterval={firstInterval} lastInterval={lastInterval} />
      <div className="btn_wrapper">
        <button className="btn_zoom" onClick={onChangeScaleClick}>
          <h4>Zoom</h4>
          <Icon variant="btn_icon">remove</Icon>
        </button>
      </div>
    </>
  );
};
