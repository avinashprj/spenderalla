import { Button } from "common/buttons";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

export const NotFound = () => {
  const navigate = useNavigate();

  const onBackHomeClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.flex}>
          <span className={styles.notfound}>404</span>
          <span className={styles.title}> PAGE NOT FOUND</span>
          <span className={styles.desc}>
            The resource requested could not be found on this server
          </span>
        </div>
      </div>
      <div className={styles.btn}>
        <Button
          variant="primary_heavenly"
          type="button"
          widthauto={true}
          onClick={onBackHomeClick}
        >
          go home page
        </Button>
      </div>
    </div>
  );
};
