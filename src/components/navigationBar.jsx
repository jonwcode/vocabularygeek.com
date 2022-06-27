import React from "react";
import css from "./module/navigationBar.module.css";
import NavigationLinks from "./navigationLinks";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className={css.navigationBar}>
      <div className={css.links}>
        <ul>
          {[...NavigationLinks()].map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
