import React, { useEffect, useRef, useContext } from "react";
import Card from "./components/Card";
import css from "./module/create.module.css";
import Header from "./components/header";
import Footer from "./components/footer";
import ErrorMsgModal from "./components/errorMsgModal";
import { ReactComponent as EyeSolid } from "./assets/svg/eye-solid.svg";
import { ReactComponent as EyeSlash } from "./assets/svg/eye-slash.svg";
import { useStateIfMounted } from "use-state-if-mounted";
import Context from "./store/settings-context";
import userContext from "./store/user-context";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const ctx = useContext(Context);
  const userCtx = useContext(userContext);
  const Navigate = useNavigate();

  useEffect(() => {
    if (userCtx.loginStatus) {
      Navigate("/");
    }
  }, []);

  const errMsg = {
    user_no_special_char:
      "No special characters are allowed, Display name must be at least 2 characters long.",
    passwordNotLongEnough: "Password must be at least 5 characters long",
    user_not_available: "The display name is currently in use.",
    email_not_available: "The email is currently in use.",
    all_fields: "Must fill in all feilds",
  };

  const [inputErr, setInputErr] = useStateIfMounted({
    displayName: "",
    password: "",
    email: "",
  });

  const [showErrorMsg, setShowErrorMsg] = useStateIfMounted({
    show: false,
    msg: null,
  });

  const valid = useRef({
    displayName: null,
    password: null,
    email: null,
  }).current;

  let userTimeout = useRef(null);
  let passTimeout = useRef(null);
  let emailTimeout = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(userTimeout);
    };
  });

  const [TogglePassView, setTogglePassView] = useStateIfMounted({
    visable: false,
    SVG: EyeSolid,
    type: "password",
  });

  const [input, setInput] = useStateIfMounted({
    displayName: "",
    password: "",
    email: "",
  });

  const handleChange = (evt) => {
    const name = evt.target.name;

    setInput((prev) => {
      return { ...prev, [name]: evt.target.value };
    });
  };

  const TogglePass = () => {
    let icon = null,
      type = null;

    if (TogglePassView.SVG === EyeSolid) {
      icon = EyeSlash;
      type = "text";
    } else {
      icon = EyeSolid;
      type = "password";
    }

    setTogglePassView((prev) => {
      return { visable: !prev.visable, type, SVG: icon };
    });
  };

  const checkAvailable = async (url) => {
    const req = await fetch(url);
    const response = await req.text();

    return response;
  };

  const checkUser = (time = 1200, showErrMsg = true) => {
    return new Promise((resolve, reject) => {
      setInputErr((prev) => {
        return { ...prev, displayName: "" };
      });

      const userRegex =
        /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\>|\?|\/|\""|\;|\:|\s/g;

      clearTimeout(userTimeout.current);

      userTimeout.current = setTimeout(async () => {
        if (
          !input.displayName.match(userRegex) &&
          input.displayName.length >= 2
        ) {
          const response = await checkAvailable(
            "/server/checkAvailable.php?user=" + input.displayName
          );

          if (response === "1") {
            // set the input error
            valid.displayName = false;

            // Set the color of the input to error red color
            setInputErr((prev) => {
              return { ...prev, displayName: `${css.inputErr}` };
            });

            if (showErrMsg)
              setShowErrorMsg({ show: true, msg: errMsg.user_not_available });

            resolve();
          } else if (input.displayName.length >= 2) {
            valid.displayName = true;

            setInputErr((prev) => {
              return { ...prev, displayName: "" };
            });

            resolve();
          }
        } else {
          valid.displayName = false;
          if (showErrMsg)
            setShowErrorMsg({ show: true, msg: errMsg.user_no_special_char });

          setInputErr((prev) => {
            return { ...prev, displayName: `${css.inputErr}` };
          });
        }
      }, time);
    });
  };

  const checkValidPass = (time = 1200, showErrMsg = true) => {
    // Make sure the password is greater than
    // 5 characters long
    clearTimeout(passTimeout.current);

    passTimeout.current = setTimeout(() => {
      if (input.password.length < 5) {
        valid.password = false;
        if (showErrMsg)
          setShowErrorMsg({ show: true, msg: errMsg.passwordNotLongEnough });
        setInputErr((prev) => {
          return { ...prev, password: `${css.inputErr}` };
        });
      } else {
        valid.password = true;
        setInputErr((prev) => {
          return { ...prev, password: "" };
        });
      }
    }, time);
  };

  const checkValidEmail = (time = 1200, showErrMsg = true) => {
    return new Promise((resolve, reject) => {
      // Make sure it's a valid email address
      clearTimeout(emailTimeout.current);
      setInputErr((prev) => {
        return { ...prev, email: "" };
      });

      emailTimeout.current = setTimeout(async () => {
        const emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (input.email.match(emailRegex) && input.email.length >= 1) {
          // Run a check to make sure it's available

          const response = await checkAvailable(
            "/server/checkAvailable.php?email=" + input.email
          );

          console.log(response);

          if (response === "0") {
            valid.email = true;
            resolve();
          }

          if (response === "1") {
            valid.email = false;
            if (showErrMsg)
              setShowErrorMsg({ show: true, msg: errMsg.email_not_available });
            setInputErr((prev) => {
              return { ...prev, email: `${css.inputErr}` };
            });

            resolve();
          }
        } else {
          valid.email = false;
          setInputErr((prev) => {
            return { ...prev, email: `${css.inputErr}` };
          });
        }
      }, time);
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    checkValidPass(0, false);
    Promise.all([checkValidEmail(0, false), checkUser(0, false)]).then(
      async () => {
        // Subpress error message

        console.log(valid);

        if (valid.displayName && valid.password && valid.email) {
          // If the field are filled and valid

          const json_string = { ...input, browser: ctx.browser };

          const req = await fetch("/server/createAccount.php", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(json_string),
          });

          const response = await req.json();

          if (response.success === true) {
            userCtx.Login(
              response.displayName,
              response.userID,
              response.token,
              response.permissions
            );
            Navigate("/");
          }
        } else {
          console.log(valid);
        }

        console.log(valid.displayName, "Display Name");
      }
    );
  };

  return (
    <>
      {showErrorMsg.show === true && (
        <ErrorMsgModal
          setShowErrorMsg={setShowErrorMsg}
          err={showErrorMsg.msg}
        />
      )}

      <Card style={{ marginTop: "100px" }}>
        <h1>Create an account</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className={css.createWrapper}>
            <label htmlFor="username">
              <span className={css.labelText}>Display Name</span>
              <input
                onKeyUp={() => checkUser()}
                value={input.displayName}
                onChange={(evt) => handleChange(evt)}
                maxLength="25"
                name="displayName"
                type="text"
                className={inputErr.displayName}
              />
            </label>

            <span className={css.passContainer}>
              <label htmlFor="password">
                <span className={css.labelText}>Password</span>
                <input
                  onKeyUp={() => checkValidPass()}
                  value={input.password}
                  onChange={(evt) => handleChange(evt)}
                  maxLength="50"
                  name="password"
                  type={TogglePassView.type}
                  autoComplete="new-password"
                  className={inputErr.password}
                />
              </label>
              <label htmlFor="email">
                <span className={css.labelText}>Email</span>
                <input
                  onKeyUp={() => checkValidEmail()}
                  maxLength="255"
                  name="email"
                  type="text"
                  value={input.email}
                  onChange={(evt) => handleChange(evt)}
                  className={inputErr.email}
                />
              </label>
              <span onClick={TogglePass} className={css.togglePassIcon}>
                {<TogglePassView.SVG width="25" fill="#7e7e7e" />}
              </span>
            </span>
            <span className={css.termsContainer}>
              By clicking <b>"Create an account"</b> you are agreeing to our{" "}
              <a href="https://vocab.daffydoug.com/terms" target="_blank">
                Terms Of Services
              </a>
            </span>
            <button className={css.createAccountBtn}>Create an account</button>
          </div>
        </form>
      </Card>
      <Footer />
    </>
  );
};

export default CreateAccount;
