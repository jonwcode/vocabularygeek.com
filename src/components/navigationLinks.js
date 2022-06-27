import { useContext, useEffect, useState } from "react";
import userContext from "../store/user-context";

const NavigationLinks = () => {
  const userCtx = useContext(userContext);

  useEffect(() => {
    ShowLinks();
  }, [userCtx.Login, userCtx.Logout]);

  const [Links, setLinks] = useState([]);

  const ShowLinks = () => {
    if (userCtx.loginStatus && userCtx.permissions === "1") {
      setLinks([
        { name: "Home", path: "/" },
        { name: "Saved Words", path: "/savedWords" },
        { name: "Colloquialism", path: "/colloquialisms" },
        { name: "Vocabulary Words", path: "/words" },
        { name: "Logout", path: "/logout" },
      ]);
    } else if (userCtx.permissions >= 2) {
      setLinks([
        { name: "Home", path: "/" },
        { name: "Control Panel", path: "/cpanel/" },
        { name: "Saved Words", path: "/savedWords" },
        { name: "Colloquialism", path: "/colloquialisms" },
        { name: "Vocabulary Words", path: "/words" },
        { name: "Logout", path: "/logout" },
      ]);
    } else {
      setLinks([
        { name: "Home", path: "/" },
        { name: "Vocabulary Words", path: "/words" },
        { name: "Colloquialism", path: "/colloquialisms" },
        { name: "Login", path: "/login" },
        { name: "Create an account", path: "/create" },
      ]);
    }
  };

  return Links;
};

export default NavigationLinks;
