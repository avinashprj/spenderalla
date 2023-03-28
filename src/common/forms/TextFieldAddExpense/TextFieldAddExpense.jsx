import { Icon } from "common/media";
import { CurrentCurrency } from "features/user/CurrentCurrency";

import styles from "./TextFieldAddExpense.module.css";

export const TextFieldAddExpense = ({
  name,
  type,
  register,
  errors,
  options = undefined,
}) => {
  return (
    <>
      <div className={styles.wrapper}>
        <input
          name={name}
          type={type}
          {...register(name, options)}
          className={styles.input}
        />
        <CurrentCurrency />
      </div>

      {errors[name]?.message && (
        <div className={styles.error}>
          <Icon>error</Icon> <h5>{errors[name].message}</h5>
        </div>
      )}
    </>
  );
};
