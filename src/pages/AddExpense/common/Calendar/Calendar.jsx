import { Icon } from "common/media";
import { getFormalizeDate } from "pages/AddExpense/utils/getFormalizeDate";
import { useState } from "react";
import {
  getDay,
  getDayOfWeek,
  getMonthString,
} from "services/dates/format.helpers";
import styles from "./Calendar.module.css";

export const Calendar = ({
  activity,
  name,
  type,
  register,
  errors,
  options = undefined,
}) => {
  const [date, setDate] = useState("Select Date");
  const [year, month, dayMin, dayMax] = getFormalizeDate(activity);

  return (
    <>
      <div className={styles.container}>
        <label htmlFor="date" className={styles.flex}>
          {date} <Icon>calendar</Icon>
        </label>
        <input
          {...register(name, options)}
          name={name}
          className={styles.date}
          min={year + "-" + month + "-" + dayMin}
          max={year + "-" + month + "-" + dayMax}
          onChange={(e) => {
            const selectDate = new Date(e.target.value);
            setDate(
              `${getDayOfWeek(selectDate)}, ${getDay(
                selectDate
              )} ${getMonthString(selectDate)}`
            );
          }}
          onClick={(e) => {
            e.target.showPicker();
          }}
          type="date"
          id="date"
        />
      </div>
      {errors[name]?.message && (
        <div className={styles.error}>
          <Icon>error</Icon> <h5>{errors[name].message}</h5>
        </div>
      )}
    </>
  );
};
