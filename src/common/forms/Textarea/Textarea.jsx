import styles from "./Textarea.module.css";

export const Textarea = ({ name, register }) => {
  return (
    <textarea
      name={name}
      {...register(name)}
      placeholder="enter here"
      className={styles.textarea}
    ></textarea>
  );
};
