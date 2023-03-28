import { Icon } from "common/media";
import { useState } from "react";
import styles from "./FileUpload.module.css";

export const FileUpload = ({ name, setFile }) => {
  const [image, setImage] = useState("");
  return (
    <>
      <div className={styles.wrapper}>
        <label htmlFor={name} className={styles.fileInput}>
          <input
            onChange={(e) => {
              setImage(URL.createObjectURL(e.target.files[0]))
              setFile(e.target.files)
            }}
            type="file"
            accept=".jpg, .gif, .jpeg, .png"
            name={name}
            id={name}
          />
          <div>
            <Icon>add</Icon>
          </div>
        </label>
        {image && <img src={image} className={styles.example} alt="preview" />}
      </div>
    </>
  );
};
