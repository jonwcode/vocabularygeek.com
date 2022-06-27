import React, { useEffect } from "react";
import css from "./module/loading.module.css";
import { ReactComponent as Loader } from "../assets/svg/loader.svg";

const Loading = () => {
  return (
    <div className={css.wrapper} style={{ height: `${window.height}` }}>
      <Loader
        width="60"
        style={{ top: `${window.scrollY + 570}px` }}
        className={css.loader}
      />
    </div>
  );
};

export default Loading;
