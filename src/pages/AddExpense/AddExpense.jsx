import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./AddExpense.module.css";

import { Button, Close } from "common/buttons";
import {
  Select,
  Switch,
  TextFieldAddExpense,
  FileUpload,
  Textarea,
} from "common/forms";
import { createExpense } from "features/expenses/expensesSlice";
import { Calendar } from "./common/Calendar/Calendar";
import { useSelector } from "react-redux";
import {
  currentActivity,
  statusActivity,
} from "features/activity/activitySlice";
import { Skeleton } from "./common/Skeleton/Skeleton";
import { user } from "features/user/userSlice";
import { writeFile } from "services/firebase/storage/storage";
import { useState } from "react";

export const AddExpense = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activity = useSelector(currentActivity);
  const activityStatus = useSelector(statusActivity);

  const { userId } = useSelector(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    mode: "onSubmit",
  });

  const [file, setFile] = useState({length: 0});

  const onSubmit = async (data) => {
    dispatch(
      createExpense({
        userId,
        expense: {
          ...data,
          amount: Number(data.amount),
          file: file.length ? file[0].name : "example.png",
          date: new Date(data.date),
        },
      })
    ).then((e) => {
      if (file.length) {
        writeFile({
          file: file[0],
          expenseId: e.payload.id,
          filename: e.payload.file,
          userId,
        });
      }
    });

    navigate("/", { replace: true });
  };

  const onCloseClick = () => {
    navigate(-1);
  };

  let content;

  content =
    activityStatus === "idle" || activityStatus === "loading" ? (
      <Skeleton />
    ) : (
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrapper}>
          <div className={styles.blue}>
            <h1>Add Expense</h1>
            <Close onClick={onCloseClick} variant="white" />
          </div>
          <div className={styles.white}>
            <span>Amount</span>
            <TextFieldAddExpense
              name="amount"
              type="number"
              register={register}
              errors={errors}
              options={{
                required: { value: true, message: "enter number" },
              }}
            />
          </div>
        </div>
        <div>
          <div className={styles.date}>
            <Calendar
              activity={activity}
              name="date"
              register={register}
              errors={errors}
              options={{
                required: { value: true, message: "select date" },
              }}
            />
          </div>
        </div>
        <main className={styles.main}>
          <div className={styles.category}>
            <span>Select Category</span>
            <Select
              name="category"
              type="radio"
              register={register}
              errors={errors}
              options={{
                required: { value: true, message: "select category" },
              }}
            />
            <div className={styles.remember}>
              <span>Add This Bill Each Month</span>
              <Switch name="repeat" type="checkbox" register={register} />
            </div>
          </div>
          <div className={styles.photo}>
            <span>Add Photo</span>
            <FileUpload name="file" setFile={setFile} register={register} />
          </div>
          <div className={styles.textarea}>
            <span>More Details</span>
            <Textarea name="message" register={register} />
          </div>
        </main>
        <Button variant="primary_blue" type="submit">
          Add
        </Button>
      </form>
    );

  return content;
};
