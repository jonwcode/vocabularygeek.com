import React, { useEffect } from "react";
import css from "./module/confirmDialog.module.css";
import { useStateIfMounted } from "use-state-if-mounted";

const ConfirmDialog = ({ msg, buttons, setShowDialog, runFunc }) => {
  useEffect(() => {
    document.body.style.cssText = "overflow:hidden;";
  }, []);

  const cancelDialog = () => {
    document.body.removeAttribute("style");
    setShowDialog(false);
  };

  const handleRunFunc = () => {
    document.body.removeAttribute("style");
    setShowDialog(false);

    runFunc();
  };

  return (
    <div
      style={{ height: `${document.documentElement.scrollHeight}px` }}
      className={css.overlay}
    >
      <div className={css.dialogBox} style={{ top: `${window.scrollY}px` }}>
        <span className={css.header}>Confirm</span>
        <span className={css.msgContainer}>
          <span className={css.msg}>{msg}</span>
        </span>
        <div className={css.btnContainer}>
          <button onClick={handleRunFunc}>{buttons.confirm}</button>
          <button onClick={cancelDialog}>{buttons.cancel}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
