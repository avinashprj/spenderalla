import { Icon } from "common/media";

import styles from "./TextFieldXL.module.css";

export const TextFieldXL = ({
  name,
  type,
  register,
  errors,
  options = undefined,
}) => {
  return (
    <>
      <input
        name={name}
        type={type}
        {...register(name, options)}
        className={styles.input}
      />

      {errors[name]?.message && (
        <div className={styles.error}>
          <Icon>error</Icon> <h5>{errors[name].message}</h5>
        </div>
      )}
    </>
  );
};
