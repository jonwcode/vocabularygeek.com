import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SettingsProvider from "./store/settings-provider";
import UserProvider from "./store/user-provider";
import "babel-polyfill";

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById("main")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
