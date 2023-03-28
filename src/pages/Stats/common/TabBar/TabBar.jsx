import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./TabBar.css";

export const TabBar = ({ onClick, first, last }) => {
  const location = useLocation();
  const { pathname } = location;

  const isChecked = useMemo(() => {
    return pathname === "/stats/log" || pathname === "/stats/log/"
      ? true
      : pathname === "/stats" || pathname === "/stats/"
      ? false
      : "";
  }, [pathname]);

  return (
    <label className="tab-bar">
      <input type="checkbox" onClick={onClick} defaultChecked={isChecked} />
      <div className="bg-action"></div>
      <div className="tab first">{first}</div>
      <div className="tab last">{last}</div>
    </label>
  );
};
