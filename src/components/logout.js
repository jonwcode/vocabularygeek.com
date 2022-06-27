import React, { useContext, useEffect } from "react";
import userContext from "../store/user-context";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const userCtx = useContext(userContext);

  const Navigate = useNavigate();

  useEffect(() => {
    if (userCtx.loginStatus) {
      Promise.all([userCtx.Logout()]).then(() => {
        Navigate("/");
      });
    }
  }, []);

  return null;
};

export default Logout;
