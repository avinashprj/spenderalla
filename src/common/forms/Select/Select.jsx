import { Icon } from "common/media";

import "./Select.css";

export const Select = ({
  name,
  type,
  register,
  errors,
  options = undefined,
}) => {
  const category = {
    Bills: "description",
    Food: "local_pizza",
    Clothes: "checkroom",
    Transport: "drive_eta",
    Fun: "videogame_asset",
    Other: "file_present",
  };

  return (
    <>
      <div className="categories">
        {Object.entries(category).map(([text, ico]) => (
          <label className="category__item" key={text}>
            <input
              value={text}
              type={type}
              {...register(name, options)}
            />
            <div className="wrap_icon_text">
              <span className="icon material-icons">{ico}</span>
              <h4 className="text">{text}</h4>
            </div>
          </label>
        ))}
      </div>

      {errors[name]?.message && (
        <div className="error__field">
          <Icon>error</Icon> <h5>{errors[name].message}</h5>
        </div>
      )}
    </>
  );
};
