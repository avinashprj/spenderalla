import { Icon } from "common/media";
import { status } from "features/expenses/expensesSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const expensesStatus = useSelector(status);

  return (
    <ul className="navbar">
      <li className="item home">
        {expensesStatus === "succeeded" ? (
          <Link className="link" to="/">
            <Icon variant="icon">feed</Icon>
          </Link>
        ) : (
          <div className="zagl"></div>
        )}
      </li>
      <li className="item stats">
        {expensesStatus === "succeeded" ? (
          <Link className="link" to="stats">
            <Icon variant="icon">stats</Icon>
          </Link>
        ) : (
          <div className="zagl"></div>
        )}
      </li>
      <li className="item settings">
        {expensesStatus === "succeeded" ? (
          <Link className="link" to="settings">
            <Icon variant="icon">settings</Icon>
          </Link>
        ) : (
          <div className="zagl"></div>
        )}
      </li>
      <li className="item add">
        {expensesStatus === "succeeded" ? (
          <Link className="link" to="addexpense">
            <Icon variant="icon">add</Icon>
          </Link>
        ) : (
          <div className="zagl"></div>
        )}
      </li>
    </ul>
  );
};
