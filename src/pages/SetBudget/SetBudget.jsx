import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button, Close } from "common/buttons";
import { TextFieldXL } from "common/forms";
import { MonthAndYear } from "common/text";
import styles from "./SetBudget.module.css";
import { useSelector } from "react-redux";
import { currentActivity } from "features/activity/activitySlice";
import { status } from "features/expenses/expensesSlice";
import { useDispatch } from "react-redux";
import { initBudget } from "features/budget/budgetSlice";
import { user } from "features/user/userSlice";

export const SetBudget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const {userId} = useSelector(user)
  const expensesStatus = useSelector(status)
  const activity = useSelector(currentActivity)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onFocus",
  });

  const onCloseClick = () => {
    navigate("/");
  };

  const onSubmit = async ({budget}) => {
    await dispatch(initBudget({userId, date: new Date(activity.year, activity.month, 1), budget: Number(budget) }))
    navigate("/",  {replace: true});
  };

  let content = expensesStatus === 'succeeded' ? (
    <>
      <div className={styles.modal}>
        <div className={styles.top}>
          <MonthAndYear>{new Date(activity.year, activity.month, 1)}</MonthAndYear>
          <Close onClick={onCloseClick} variant="black" />
        </div>
        <div className={styles.edit}>
          <h3>Budget</h3>
          <TextFieldXL
            name="budget"
            type="number"
            errors={errors}
            options={{
              required: { value: true, message: "enter your budget" },
            }}
            register={register}
          />
        </div>
      </div>
      <Button type="submit" variant="primary_blue">Save</Button>
    </>
  ) : <div>загрузка</div>


  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      {content}
    </form>
  );
};
