import React from "react";
import { Link } from "react-router-dom";
import css from "./module/topNav.module.css";

const TopNav = () => {
  return (
    <div className={css.navWrapper}>
      <span className={css.navTitle}>cPanel Navigation:</span>
      <span className={css.navLink}>
        <Link to="/cpanel/">Add New Word</Link>
      </span>
      <span className={css.navLink}>
        <Link to="/cpanel/homepage">Edit Home Page</Link>
      </span>
      <span className={css.navLink}>
        <Link to="/cpanel/wordoftheday">Word Of The Day</Link>
      </span>
    </div>
  );
};

export default TopNav;
