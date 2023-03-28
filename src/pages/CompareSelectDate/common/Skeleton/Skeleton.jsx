import styles from './Skeleton.module.css'

export function Skeleton() {
  return (
    <div className={styles.skeleton  + " " + styles.p1 + " " + styles.gapr}>
          <div className={styles.flex + " " + styles.gap1}>
            <div className={styles.line  + " " + styles.h30  + " " + styles.w100 + " " + styles.m10}></div>
            <div className={styles.tangle}></div>
          </div>
        
          <div className={styles.flex + " " + styles.gap1  + " " + styles.h25p 
        + " " + styles.m15}>
            <div className={styles.square  + " " + styles.h100p  + " " + styles.w100}></div>
            <div className={styles.square   + " " + styles.w100 + " " + styles.m10  + " " + styles.h100p }></div>
          </div>

          <div className={styles.flex + " " + styles.gap1  + " " + styles.h50p   + " " + styles.m15}>
            <div className={styles.square    + " " + styles.h100p   + " " + styles.w100 + " " + styles.m10 }></div>
            <div className={styles.square    + " " + styles.h100p  + " " + styles.w100 + " " + styles.m10 }></div>
          </div>
          <div className={styles.line  + " " + styles.h40  + " " + styles.w100 + " " + styles.m10}></div>

      </div>
  )
} 