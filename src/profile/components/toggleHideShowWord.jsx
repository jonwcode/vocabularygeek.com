import React from "react";
import css from "../module/toggleHideShowWord.module.css";
import { ReactComponent as Show } from "../../assets/svg/eye-solid.svg";
import { ReactComponent as Hide } from "../../assets/svg/eye-slash.svg";

const ToggleHideShowWord = (props) => {
  return (
    <div style={{ ...props.style }}>
      {props.visable === "true" ? (
        <Show className={css.icon} />
      ) : (
        <Hide className={css.iconHidden} />
      )}
    </div>
  );
};

export default ToggleHideShowWord;
