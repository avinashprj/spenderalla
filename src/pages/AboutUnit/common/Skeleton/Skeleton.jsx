import styles from "./Skeleton.module.css";

export function Skeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.containerLeft}>
        <div className={styles.flex + " " + styles.mb2}>
          <div>
            <div className={styles.line + " " + styles.one}></div>
            <div className={styles.line + " " + styles.one}></div>
          </div>
          <div className={styles.square + " " + styles.two}></div>
        </div>
        <div className={styles.bg}>
          <div
            className={styles.line + " " + styles.four + " " + styles.mb1}
          ></div>
          <div
            className={styles.line + " " + styles.three}
          ></div>
        </div>
        <div className={styles.bg}>
          <div
            className={styles.line + " " + styles.four + " " + styles.mb1}
          ></div>
          <div
            className={styles.line + " " + styles.three}
          ></div>
        </div>
        <div className={styles.bg}>
          <div
            className={styles.line + " " + styles.four + " " + styles.mb1}
          ></div>
          <div
            className={styles.line + " " + styles.five + " " + styles.mb1}
          ></div>
        </div>
        <div className={styles.bg}>
          <div
            className={styles.line + " " + styles.four + " " + styles.mb1}
          ></div>
          <div
            className={styles.line + " " + styles.three + " " + styles.mb1}
          ></div>
        </div>
      </div>
    </div>
  );
}
