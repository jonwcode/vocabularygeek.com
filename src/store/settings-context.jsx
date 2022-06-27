import React, { createContext } from "react";

const Context = createContext({
  themeMode: "dayLight",
  browser: null,
  ToggleThemeMode: () => {},
  getBrowser: () => {},
});

export default Context;
