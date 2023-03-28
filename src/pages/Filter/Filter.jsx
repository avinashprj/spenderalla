import { Close, Button } from "common/buttons";
import { RangeSlider, Select } from "common/forms";
import { expenses, status } from "features/expenses/expensesSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Filter.module.css";
import { getCenterData } from "./utils/getCenterData";

export const Filter = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onFocus",
  });
  useSearchParams();

  const [range, setRange] = useState([])
  const expensesStatus = useSelector(status);
  const listExpenses = useSelector(expenses);
  const dataRange = getCenterData(listExpenses);

  const onSubmit = (data) => {
    const url = '/stats/log'
    const filter = JSON.stringify({...data, range})
    navigate(`${url}?filter=${filter}`);
  };

  const onReset = () => navigate('/stats/log');

  const onCloseClick = () => {
    navigate(-1);
  };

  let content;

  if (expensesStatus === "succeeded") {
    content = (
      <>
        <header>
          <span>Filter by</span>
          <Close onClick={onCloseClick} variant="black" />
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            name="category"
            type="checkbox"
            register={register}
            errors={errors}
            options={{
              required: { value: true, message: "select category" },
            }}
          />
          <div className={styles.range}>
            <span>Amount</span>
            <RangeSlider dataRange={dataRange} setRange={setRange}/>
          </div>
          <div className={styles.buttons}>
            <Button variant="primary_heavenly" onClick={onReset} type="button">
              Reset
            </Button>
            <Button variant="primary_blue" type="submit">
              Apply
            </Button>
          </div>
        </form>
      </>
    );
  } else {
    content = <div>loading...</div>;
  }

  return <div className={styles.wrapper}>{content}</div>;
};
