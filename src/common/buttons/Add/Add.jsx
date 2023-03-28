import "./Add.css";

export const Add = ({onClick}) => {
  return (
    <button className="btn add" onClick={onClick}>
      <span className="material-icons">add</span>
    </button>
  );
};
