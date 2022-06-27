import React, { useEffect, useContext } from "react";
import UserContext from "./user-context";
import { useStateIfMounted } from "use-state-if-mounted";
import { useReadCookie } from "../hooks/cookies";
import settingContext from "./settings-context";

const UserProvider = ({ children }) => {
  const readCookie = useReadCookie;
  const settingCtx = useContext(settingContext);

  useEffect(() => {
    VerifyLoginStatus();
  }, []);

  const VerifyLoginStatus = async () => {
    return new Promise(async (resolve, reject) => {
      // Here we will take the token and verify that its a valid
      // Token

      const token = readCookie("token");

      const browser = settingCtx.getBrowser();

      if (token && token.length === 174) {
        const req = await fetch(
          "/server/checkLoginStatus.php?token=" + token + "&browser=" + browser
        );

        const response = await req.text();

        const data = JSON.parse(response);

        if (data.success === true) {
          Login(data.displayName, data.userID, data.token, data.permissions);
        }
      }

      resolve();
    });
  };

  const [user, setUser] = useStateIfMounted({
    displayName: "",
    userID: null,
    token: null,
    loginStatus: null,
    permissions: null,
  });

  const Login = (displayName, userID, token, permissions) => {
    setUser({ displayName, userID, token, loginStatus: true, permissions });
  };

  const Logout = async () => {
    return new Promise(async (resolve, reject) => {
      const browser = settingCtx.getBrowser();

      const req = await fetch(
        "/server/logout.php?token=" + user.token + "&browser=" + browser
      );

      const response = await req.text();

      if (response) {
        setUser({
          displayName: "",
          userID: null,
          token: null,
          loginStatus: null,
          permissions: null,
        });

        resolve();
      }

      console.log(response);
    });
  };

  return (
    <UserContext.Provider
      value={{
        userID: user.userID,
        displayName: user.displayName,
        loginStatus: user.loginStatus,
        token: user.token,
        permissions: user.permissions,
        Login,
        VerifyLoginStatus,
        Logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
