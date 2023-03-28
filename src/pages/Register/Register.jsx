import styles from "./Register.module.css";
import "./active.css";

import { useForm } from "react-hook-form";

import { TextField } from "common/forms";
import { Button } from "common/buttons";
import { createUserEmail } from "services/firebase/auth/auth";
import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "services/firebase/config";

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const navigate = useNavigate();
  const auth = getAuth(app);

  const [userNot, setUserNot] = useState(false);

  const editing = useMemo(() => {
    setUserNot(false);
    return { email: watch().email, password: watch().password };
  }, [watch().email, watch().password]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (auth.currentUser) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    setUserNot(false);
  }, [errors]);

  const onSubmit = async (data) => {
    const req = await createUserEmail(data.email, data.password);
    if (req === "auth/email-already-in-use") {
      setUserNot({
        field: "email",
        message: "this email is already in use",
        email: editing,
      });
      return;
    } else if (req === "auth/too-many-requests") {
      setUserNot({ field: "email", message: "too many requests" });
    }
    !!req && navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.selector}>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          Log In
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          Register
        </NavLink>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          <h4>E-mail</h4>
          <TextField
            userNot={userNot}
            type="email"
            name="email"
            register={register}
            errors={errors}
            options={{
              required: { value: true, message: "enter your email" },
              pattern: { value: /.+@.+\..+/i, message: "email not valid" },
            }}
          ></TextField>
        </label>
        <label htmlFor="password">
          <h4>Password</h4>
          <TextField
            userNot={userNot}
            name="password"
            type="password"
            errors={errors}
            options={{
              required: { value: true, message: "enter your password" },
              minLength: { value: 8, message: "password is too short" },
            }}
            register={register}
          ></TextField>
        </label>
        <div className={styles.but}>
          <Button variant="primary_blue" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
