import { getIconByCategoryName as getIcon } from "./getIconByCategoryName";
import './Icon.css'

export const Icon = ({ children, variant }) => {
  return (
    <span className={"material-icons " + variant}>{getIcon(children)}</span>
  );
};
