import { useForm } from "react-hook-form";
import styles from "./ForgotPass.module.css";

import { TextField } from "common/forms";
import { Button } from "common/buttons";
import { resetPassword } from "services/firebase/auth/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const [userNot, setUserNot] = useState(false);
  const [status, setStatus] = useState("idle");

  const onSubmit = async (data) => {
    setUserNot(false)
    setStatus("loading");
    await resetPassword(data.email).then(e =>{
      console.log(e);
      if(e === 'auth/user-not-found') {
        setUserNot({field: "text", message: "user not found"})
      }
      setStatus("succeeded");
    })
  };

  console.log(userNot, status );
  return (
    <div className={styles.wrapper}>
      {status === "succeeded" && !userNot ? <span>Please check your email</span> : false}
      {status === "succeeded" && !userNot ? (
        false
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">
            <h4>E-mail</h4>
            <TextField
              userNot={userNot}
              name="email"
              type="text"
              register={register}
              errors={errors}
              options={{
                required: { value: true, message: "enter your email" },
                pattern: { value: /.+@.+\..+/i, message: "email not valid" },
              }}
            />
          </label>
          <Button variant="primary_blue" type="submit">
            Reset Password
          </Button>
        </form>
      )}
      {status === "succeeded" && !userNot ? (
        <Button onClick={() => navigate('/login')} variant="primary_blue" type="submit">
          back to login page
        </Button>
      ) : (
        false
      )}
    </div>
  );
};
