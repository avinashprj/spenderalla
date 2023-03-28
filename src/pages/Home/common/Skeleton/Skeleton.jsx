import styles from './Skeleton.module.css'

export function Skeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.container}>
      <div className={styles.containerLeft}>
          <div className={styles.line + " " + styles.h40 + " " + styles.w15 + " " + styles.m10}></div>
          <div className={styles.square + " " + styles.m25}></div>
          <div className={styles.line + " " + styles.h40 + " " + styles.w35 + " " + styles.m15 + " " + styles.auto}></div>
          <div className={styles.line  + " " + styles.h30  + " " + styles.w15  + " " + styles.m10 + " " + styles.auto}></div>
        </div>
      </div>
      <div className={styles.container}>
      <div className={styles.containerLeft}>
      <div className={styles.line + " " + styles.h30 + " " + styles.m10}></div>
          <div className={styles.flex}>
            <div className={styles.tangle}></div>
            <div className={styles.line  + " " + styles.h30  + " " + styles.w100  + " " + styles.m10}></div>
          </div>
        </div>
      </div>
      
      <div className={styles.container}>
      <div className={styles.containerLeft}>
      <div className={styles.line + " " + styles.h30 + " " + styles.m10}></div>
          <div className={styles.flex}>
            <div className={styles.tangle}></div>
            <div className={styles.line  + " " + styles.h30  + " " + styles.w100  + " " + styles.m10}></div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
      <div className={styles.containerLeft}>
      <div className={styles.line + " " + styles.h30 + " " + styles.m10}></div>
          <div className={styles.flex}>
            <div className={styles.tangle}></div>
            <div className={styles.line  + " " + styles.h30  + " " + styles.w100  + " " + styles.m10}></div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
      <div className={styles.containerLeft}>
      <div className={styles.line + " " + styles.h30 + " " + styles.m10}></div>
          <div className={styles.flex}>
            <div className={styles.tangle}></div>
            <div className={styles.line  + " " + styles.h30  + " " + styles.w100  + " " + styles.m10}></div>
          </div>
        </div>
      </div>

      </div>
  )
} 