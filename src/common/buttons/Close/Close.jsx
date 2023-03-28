import styles from "./Close.module.css";

export const Close = ({ onClick, variant }) => {
  return (
    <button type="button" className={styles.close + " " + styles[variant]} onClick={onClick}>
      <span className={"material-icons " + styles["mi" + variant]}>close</span>
    </button>
  );
};
