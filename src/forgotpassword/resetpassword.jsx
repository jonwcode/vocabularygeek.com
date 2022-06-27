import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import css from "./resetpassword.module.css";
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import ErrorMsgModal from "../components/errorMsgModal";
import Footer from "../components/footer";

const ResetPasssword = () => {
  const params = useParams();
  const [loading, setLoading] = useStateIfMounted(false);
  const [valid, setValid] = useStateIfMounted(false);
  const [pass, setPass] = useStateIfMounted("");
  const [repass, setRepass] = useStateIfMounted("");
  const [passClasses, setPassClasses] = useStateIfMounted("");
  const [retypePassClasses, setRetypePassClasses] = useStateIfMounted("");
  const [showErrorMsg, setShowErrorMsg] = useStateIfMounted({
    show: false,
    msg: "",
  });
  const [newPass, setNewPass] = useStateIfMounted(false);

  const timeOut = useRef(null);

  useEffect(() => {
    validateKeyCode();
  }, []);

  useEffect(() => {
    checkPasswords();
  }, [pass, repass]);

  const validateKeyCode = async () => {
    setLoading(true);
    const key_code = params.key_code;

    // Check to see if there is a valid key code
    // for this key

    const req = await fetch("/server/validateKeyCode.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "key_code=" + key_code,
    });

    const response = await req.text();

    if (response === "1") {
      setValid(true);
    } else {
      setValid(false);
    }

    setLoading(false);

    console.log(response);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    console.log(showErrorMsg);

    if (pass.length <= 0 || repass.length <= 0) {
      setShowErrorMsg({
        show: true,
        msg: "Please be sure that both passsword fields are filled in and the passwords match.",
      });
    }

    if (pass === repass && pass.length >= 5 && repass.length >= 5) {
      const req = await fetch("/server/updatePassword.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "pass=" + pass + "&repass=" + repass + "&key_code=" + params.key_code,
      });

      const response = await req.text();

      if(response === "1") {
        setNewPass(true);
      }
      else {
        setValid(false);
      }
    }


  };

  const handleChange = (evt) => {
    if (evt.target.name === "password") {
      setPass(evt.target.value);

      if (evt.target.value.length < 5) {
        setPassClasses(`${css.yellowInput}`);
      }

      if (evt.target.value.length <= 0) {
        setPassClasses(`${css.redInput}`);
      }

      if (evt.target.value.length >= 5) {
        setPassClasses(`${css.greenInput}`);
      }
    }

    if (evt.target.name === "retypePassword") {
      setRepass(evt.target.value);

      if (evt.target.value.length < 5) {
        setRetypePassClasses(`${css.yellowInput}`);
      }

      if (evt.target.value.length <= 0) {
        setRetypePassClasses(`${css.redInput}`);
      }

      if (evt.target.value.length >= 5) {
        setRetypePassClasses(`${css.greenInput}`);
      }
    }
  };

  const checkPasswords = () => {
    clearTimeout(timeOut.current);

    // Check to see if the passwords match
    timeOut.current = setTimeout(() => {
      if (pass.length >= 5 && repass.length >= 5 && pass !== repass) {
        setShowErrorMsg({ show: true, msg: "Passwords do not match!" });
        setPassClasses(`${css.redInput}`);
        setRetypePassClasses(`${css.redInput}`);
      } else if (pass.length >= 5 && repass.length >= 5) {
        setShowErrorMsg({ show: false, msg: null });
        setPassClasses(`${css.greenInput}`);
        setRetypePassClasses(`${css.greenInput}`);
      }
    }, 1200);
  };

  return (
    <React.Fragment>
    <Card style={{ width: "600px", overflow: "hidden" }}>
      {showErrorMsg.show && (
        <ErrorMsgModal
          err={showErrorMsg.msg}
          setShowErrorMsg={setShowErrorMsg}
        />
      )}
      {loading && <span className={css.loading}>Loading...</span>}
      {!loading && valid && !newPass && (
        <React.Fragment>
          <h1>Reset Password</h1>

          <form onSubmit={handleSubmit}>
            <div className={css.resetWrapper}>
              <div className={css.inputContainer}>
                <span className={css.inputLabel}>Password</span>
                <input
                  className={passClasses}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={pass}
                />
                <span className={css.inputLabel}>Retype Password</span>
                <input
                  className={retypePassClasses}
                  type="password"
                  onChange={handleChange}
                  name="retypePassword"
                  placeholder="Retype Password"
                  value={repass}
                />
              </div>
              <button className={css.resetBtn} type="submit">
                Reset Password
              </button>
            </div>
          </form>
        </React.Fragment>
      )}
      {newPass && (
        <span className={css.passUpdatedTxt}>Your password has been changed. You may now login with the new password that you have chosen. </span>
      )}
      {!loading && !valid && (
        <div className={css.invalidKeyContainter}>
          <span className={css.notValid}>
            Sorry this key is not valid or it has been used or is expired.
            Please try resending a key.
          </span>
          <span className={css.resendBtn}>
            <Link to="/forgotpassword">Resend Key</Link>
          </span>
        </div>
      )}
    </Card>
    <Footer />
    </React.Fragment>
  );
};

export default ResetPasssword;
