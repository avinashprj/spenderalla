import styles from "./Button.module.css";

type Variant =
  | "primary_blue"
  | "primary_heavenly"
  | "secondary_white"
  | "secondary_blue";

interface IPropsButton {
  children: any;
  onClick: any;
  variant: Variant;
  wa?: boolean;
  widthauto?: boolean;
  type?: 'button' | 'submit'
}

export const Button = ({
  children,
  onClick,
  variant,
  wa,
  widthauto = false,
  type = "button",
}: IPropsButton) => {
  const width = wa ? styles.wa : "";
  const autowidth = widthauto ? styles.widthauto : styles.width100

  return (
    <button
      type={type}
      className={styles.btn + " " + styles[variant] + " " + autowidth + " " + width}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
