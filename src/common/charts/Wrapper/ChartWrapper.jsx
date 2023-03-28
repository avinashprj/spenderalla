import styles from "./ChartWrapper.module.css";

export const ChartWrapper = ({ children, swiper = false, mb = false }) => {
  const isMarginSwiper = swiper ? styles.swiper : "";
  const margin = mb ? styles.mb : "";
  return (
    <div className={styles.wrapperChart + " " + isMarginSwiper + " " + margin}>
      {children}
    </div>
  );
};
