import styles from "./Expense.module.css";
import spinner from "assets/images/spinner.gif";
import { useState } from "react";

export const Expense = ({ expense, url }) => {
  const { amount, category, message } = expense;

  const [img, setImg] = useState(spinner);

  return (
    <main>
      <div className={styles.category}>
        <span className={styles.title}>Amount</span>
        <div className={styles.amount}>{amount}</div>
      </div>
      <div className={styles.category}>
        <span className={styles.title}>Category</span>
        <div className={styles.cat}>{category}</div>
      </div>
      <div className={styles.category}>
        <span className={styles.title}>Photos</span>
        <div className={styles.image}>
        <a href={img} target="_blank" rel="noreferrer">
        <img
          className={styles.photos}
          onLoad={() => setImg(url)}
          src={img}
          alt="order"
        />
        </a>
        </div>
      </div>
      <div className={styles.category}>
        <span className={styles.title}>More Details</span>
        <div className={styles.details}>{message}</div>
      </div>
    </main>
  );
};
