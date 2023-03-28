import styles from "./LogIn.module.css";
import "./active.css";

import { useForm } from "react-hook-form";

import { TextField } from "common/forms";
import { Button } from "common/buttons";
import { signInUserEmail } from "services/firebase/auth/auth";
import { useLayoutEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "services/firebase/config";

export const LogIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const auth = getAuth(app);

  const [userNot, setUserNot] = useState(false);

  const editing = useMemo(() => {
    setUserNot(false);
    return { email: watch().email, password: watch().password };
  }, [watch().email, watch().password]);

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (auth.currentUser) {
        navigate("/");
      }
    });
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const req = await signInUserEmail(data.email, data.password);
    if (req === "auth/user-not-found") {
      setUserNot({ field: "email", message: "user not found", email: editing });
      return;
    } else if (req === "auth/wrong-password") {
      setUserNot({ field: "password", message: "password incorrect" });
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
          />
        </label>
        <Link className={styles.forgotPassword} to="/resetpass">
          Forgot Password
        </Link>
        <Button variant="primary_blue" type="submit">
          Log In
        </Button>
        {/* <h5 className={styles.alternative}>or continue with</h5>
        <div className={styles.authSocial}>
          <Button variant="primary_heavenly">Facebook</Button>
          <Button variant="primary_heavenly">Google</Button>
        </div> */}
      </form>
    </div>
  );
};
