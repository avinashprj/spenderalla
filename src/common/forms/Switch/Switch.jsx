import "./Switch.css";

export const Switch = ({ name, type, register }) => {
  const reg = register ? { ...register(name) } : null;

  return (
    <label className="switch">
      <input type={type} name={name} {...reg} className="input_hidden" />
      <span className="slider"></span>
    </label>
  );
};
