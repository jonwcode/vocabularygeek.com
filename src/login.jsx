import React, { useContext, useEffect } from "react";
import Header from "./components/header";
import Card from "./components/Card";
import Footer from "./components/footer";
import css from "./module/login.module.css";
import { Link } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";
import ErrorMsgModal from "./components/errorMsgModal";
import settingContext from "./store/settings-context";
import userContext from "./store/user-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();

  const settingCtx = useContext(settingContext);
  const userCtx = useContext(userContext);

  useEffect(() => {
    if (userCtx.loginStatus === true) {
      Navigate("/");
    }

    window.scrollTo(0, 0);

    if (document.body.style) {
      document.body.removeAttribute("style");
    }
  }, []);

  const [input, setInput] = useStateIfMounted({ email: "", password: "" });
  const [showErrorMsg, setShowErrorMsg] = useStateIfMounted({
    show: false,
    msg: null,
  });

  const errMsg = {
    notValidLoginInfo: "Invalid email or password!",
  };

  const handleChange = (evt) => {
    const name = evt.target.name;

    setInput((prev) => {
      return { ...prev, [name]: evt.target.value };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Make sure it's valid login info

    if (
      input.email.match(emailRegex) &&
      input.password &&
      input.password.length >= 5 &&
      input.password.length <= 50
    ) {
      const req = await fetch("/server/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "email=" +
          input.email +
          "&password=" +
          input.password +
          "&browser=" +
          settingCtx.browser,
      });

      const json = await req.json();

      console.log(json);

      if (json.success === true) {
        userCtx.Login(
          json.displayName,
          json.userID,
          json.token,
          json.permissions
        );

        Navigate("/");
      } else {
        setShowErrorMsg({ show: true, msg: errMsg.notValidLoginInfo });
      }
    }
  };

  return (
    <>
      {showErrorMsg.show && (
        <ErrorMsgModal
          setShowErrorMsg={setShowErrorMsg}
          err={showErrorMsg.msg}
        />
      )}
      <form method="post" onSubmit={handleSubmit}>
        <Card style={{ marginTop: "100px" }}>
          <h1>User Login</h1>
          <div className={css.wrapper}>
            <div className={css.loginContainer}>
              <label htmlFor="email">
                <span className={css.labelText}>Email</span>
                <input
                  onChange={(evt) => handleChange(evt)}
                  value={input.email}
                  name="email"
                  type="email"
                  placeholder="email"
                />
              </label>
              <label htmlFor="email">
                <span className={css.labelText}>Password</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={(evt) => handleChange(evt)}
                  value={input.password}
                />
              </label>

              <button type="submit" className={css.loginBtn}>
                Login
              </button>

              <div className={css.otherLinksContainer}>
                <Link to="/forgotpassword">Forgot password?</Link>
              </div>

              <Link to="/create" className={css.createAccountBtn}>
                Create an account
              </Link>
            </div>
          </div>
        </Card>
      </form>

      <Footer />
    </>
  );
};

export default Login;
