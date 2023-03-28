import { Outlet, useNavigate } from "react-router-dom";

import { TabBar } from "./common/TabBar/TabBar";
import { Icon } from "common/media";
import styles from "./Stats.module.css";

export const Stats = () => {
  const navigate = useNavigate();

  const onNavigateClick = (e) => {
    e.target.checked ? navigate("/stats/log") : navigate("/stats");
  };

  const onCompareClick = () => {
    navigate("/compare");
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.name}>Status</h1>
        <div className={styles.buttons}>
          <button onClick={onCompareClick}>
            <Icon>balance</Icon>
          </button>
        </div>
      </header>
      <TabBar onClick={onNavigateClick} first="General" last="Expenses Log" />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};
