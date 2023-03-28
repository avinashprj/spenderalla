import styles from "./Skeleton.module.css";

export function Skeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.containerLeft}>
        <div className={styles.bg}>
        <div className={styles.flex + " " + styles.padding}>
          <div className={styles.line + " " + styles.one}></div>
          <div className={styles.square + " " + styles.two}></div>
        </div>
        </div>
        <div className={styles.fg}>
        <div className={styles.line + " " + styles.three}></div>
        <div className={styles.line + " " + styles.four}></div>
        <div className={styles.flex + " " + styles.padding2}>
          <div className={styles.line + " " + styles.five}></div>
          <div className={styles.square + " " + styles.six}></div>
        </div>
        </div>
        <div className={styles.line + " " + styles.one + " " + styles.hz}></div>
        <div className={styles.line + " " + styles.seven}></div>
      </div>
    </div>
  );
}
