import React, { createContext } from "react";

const Context = createContext({
  userID: null,
  displayName: null,
  token: null,
  loginStatus: null,
  Login: (displayName, userID, token) => {},
  Logout: () => {},
  VerifyLoginStatus: () => {},
  permissions: null,
});

export default Context;
