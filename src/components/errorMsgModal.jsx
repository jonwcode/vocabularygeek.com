import React, { useEffect, useRef } from "react";
import css from "./module/errorMsgModal.module.css";
import { useStateIfMounted } from "use-state-if-mounted";
import Modal from "./modal";
import { ReactComponent as ErrorIcon } from "../assets/svg/errorIcon.svg";

const ErrorMsgModal = ({ err, setShowErrorMsg }) => {
  let timeOut = useRef(null);

  const [classes, setClasses] = useStateIfMounted(
    `${css.errorContainer} ${css.showError}`
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    timeOut.current = setTimeout(() => {
      setClasses(`${css.errorContainer} ${css.hideError}`);
      setTimeout(() => {
        setShowErrorMsg({ show: false, msg: null });
      }, 1200);
    }, 10000);

    return () => {
      clearTimeout(timeOut.current);
    };
  }, []);

  const closeModal = () => {
    clearTimeout(timeOut);
    setClasses(`${css.errorContainer} ${css.hideError}`);
    setTimeout(() => {
      setShowErrorMsg({ show: false, msg: null });
    }, 1200);
  };

  return (
    <Modal>
      <div onClick={closeModal} className={classes}>
        <span className={css.errIconContainer}>
          <ErrorIcon width="25" />
        </span>
        {err}
      </div>
    </Modal>
  );
};

export default ErrorMsgModal;
