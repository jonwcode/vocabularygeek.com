import React, { useContext } from "react";
import css from "../module/saveWord.module.css";
import { ReactComponent as HeartEmpty } from "../../assets/svg/heart-regular.svg";
import { ReactComponent as HeartFilled } from "../../assets/svg/heart-solid.svg";
import { useStateIfMounted } from "use-state-if-mounted";
import userContext from "../../store/user-context";
import Modal from "../../components/modal";
import RequireLogin from "./requireLogin";

const SaveWord = ({ saved, word }) => {
  const userCtx = useContext(userContext);

  const [filled, setFilled] = useStateIfMounted(saved ? true : false);
  const [filledHeartClass, setFilledHeartClass] = useStateIfMounted(
    `${css.heartFilled}`
  );
  const [showMsg, setShowMsg] = useStateIfMounted(false);

  const VerifyLogin = () => {
    // Verify that the user is logged in

    if (userCtx.loginStatus) {
      return true;
    } else {
      setShowMsg(true);
      return false;
    }
  };

  const handleSave = async () => {
    if (!VerifyLogin()) return false;

    setFilled(true);

    setFilledHeartClass(`${css.heartFilled} ${css.playHeartEffect}`);

    setTimeout(() => {
      setFilledHeartClass(`${css.heartFilled}`);
    }, 1000);

    const req = await fetch("/server/saveWord.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "word=" + word,
    });

    const response = await req.text();

    console.log(response);
  };

  const handleUnsave = async () => {
    setFilled(false);

    const req = await fetch("/server/unsaveWord.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "word=" + word,
    });

    const response = await req.text();

    console.log(response);
  };

  return (
    <React.Fragment>
      {!filled ? (
        <HeartEmpty
          data-close="false"
          onClick={handleSave}
          className={css.heartEmpty}
        />
      ) : (
        <HeartFilled
          data-close="false"
          onClick={handleUnsave}
          className={filledHeartClass}
        />
      )}
      {showMsg && <RequireLogin setShowMsg={setShowMsg} />}
    </React.Fragment>
  );
};

export default SaveWord;
