import React from "react";
import css from "./module/card.module.css";

const Card = ({ children, style, shadow = true }) => {
  const classes = !shadow ? css.container : `${css.container} ${css.shadow}`;

  return (
    <div className={classes} style={{ ...style }}>
      {children}
    </div>
  );
};

export default Card;
