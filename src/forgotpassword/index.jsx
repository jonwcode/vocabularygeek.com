import React from "react";
import Card from "../components/Card";
import css from "./index.module.css";
import { useStateIfMounted } from "use-state-if-mounted";
import Footer from "../components/footer";

const Index = () => {
  const [email, setEmail] = useStateIfMounted("");
  const [showSent, setShowSent] = useStateIfMounted(false);

  const handleChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSendRecovery = async (evt) => {
    // We need to verify that it's a valid email address
    evt.preventDefault();

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(emailRegex)) {
      const req = await fetch("/server/sendRecovery.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "email=" + email,
      });

      const response = await req.text();

      setShowSent(true);
    }
  };

  return (
    <React.Fragment>
    <Card style={{ width: "700px" }}>
      {!showSent && (
        <React.Fragment>
          <form onSubmit={handleSendRecovery}>
            <span className={css.headerTxt}>Reset Password</span>
            <span className={css.txt}>
              Here you can reset your password. Enter your email address and we
              will send you a link to reset your password.
            </span>
            <div className={css.inputContainer}>
              <span className={css.inputLabel}>Email Address</span>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className={css.btnContainer}>
              <button type="submit">Send Recovery Email</button>
            </div>
          </form>
        </React.Fragment>
      )}
      {showSent && (
        <React.Fragment>
          <span className={css.headerTxt}>Recovery Sent</span>
          <span className={css.txt}>
            If that email matches one of our records a email will be sent to
            that address to reset your password.
          </span>
        </React.Fragment>
      )}
    </Card>

    <Footer />
    </React.Fragment>
  );
};

export default Index;
