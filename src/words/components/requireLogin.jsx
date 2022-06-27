import React, { useEffect } from "react";
import css from "../module/requireLogin.module.css";
import { Link } from "react-router-dom";

const RequireLogin = ({ setShowMsg }) => {
  useEffect(() => {
    const bodyListener = (evt) => {
      if (evt.target.dataset.close !== "false") {
        setShowMsg(false);
        console.log(evt.target.dataset);
      }
    };

    document.addEventListener("click", bodyListener);

    return () => {
      document.removeEventListener("click", bodyListener);
    };
  }, []);

  const handleGoToLogin = () => {
    // Check to see if there is a style on the

    window.scrollTo(0, 0);

    if (document.body.style) {
      document.body.removeAttribute("style");
    }
  };

  return (
    <React.Fragment>
      <div className={css.msgContainer} data-close="false">
        <span data-close="false" className={css.headerText}>
          You must be logged in first.
        </span>
        <Link
          data-close="false"
          onClick={handleGoToLogin}
          to="/login"
          className={css.loginButton}
        >
          Login
        </Link>
      </div>
    </React.Fragment>
  );
};

export default RequireLogin;
