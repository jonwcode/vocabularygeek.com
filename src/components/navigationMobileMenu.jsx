import React from "react";
import Modal from "./modal";
import NavigationLinks from "./navigationLinks";
import css from "./module/navigationMobileMenu.module.css";
import { Link } from "react-router-dom";
import ToggleDayNight from "../components/toggleDayNight";
const NavigationMobileMenu = ({ toggle }) => {
  const handleRemoveStyleFromBody = () => {
    document.body.removeAttribute("style");
    toggle();
  };

  return (
    <Modal el="main">
      <div className={css.overlay} onClick={toggle}></div>
      <div className={css.popupModal}>
        <ToggleDayNight
          styles={{ marginTop: "0px", color: "#ffffff", zIndex: 99999 }}
        />

        <div className={css.navLinks}>
          {NavigationLinks().map((link, index) => (
            <li key={index}>
              <Link onClick={handleRemoveStyleFromBody} to={link.path}>
                {link.name}
              </Link>
            </li>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default NavigationMobileMenu;
