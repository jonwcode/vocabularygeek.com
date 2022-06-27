import React from "react";
import css from "./module/header.module.css";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import ToggleDayNight from "../components/toggleDayNight";
import MobileMenu from "./MobileMenu";
import NavigationBar from "./navigationBar";
import { Link } from "react-router-dom";

const Header = ({ dayNight = true, setShowModal }) => {
  const closeModal = () => {
    window.history.back();
    //setShowModal(false);

    // Check to see if there is a style set
    // To the body tag.

    if (document.body.hasAttribute("style")) {
      document.body.removeAttribute("style");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className={css.wrapper}>
        <div id={css.logo}>
          <Link to="/">
            <Logo className={css.logoSVG} />
          </Link>
        </div>

        {dayNight && (
          <div className={css.toggleContainer}>
            <ToggleDayNight />
          </div>
        )}
        {!dayNight && (
          <div onClick={() => closeModal()} className={css.closeModal}>
            Close Modal
          </div>
        )}

        {dayNight && <MobileMenu />}
      </div>
    </>
  );
};

export default Header;
