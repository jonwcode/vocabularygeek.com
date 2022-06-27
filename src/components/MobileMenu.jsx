import React from "react";
import css from "./module/mobileMenu.module.css";
import { useStateIfMounted } from "use-state-if-mounted";
import NavigationMobileMenu from "./navigationMobileMenu";

const MobileMenu = () => {
  const [menuStatus, setMenuStatus] = useStateIfMounted(false);

  const classes = !menuStatus ? css.menuButton : css.menuButtonClose;

  const handleMobileMenu = () => {
    setMenuStatus(!menuStatus);

    if (!menuStatus) {
      document.body.style.cssText = "overflow:hidden;";
    } else {
      document.body.removeAttribute("style");
    }
  };

  return (
    <>
      <div onClick={handleMobileMenu} className={css.mobileMenu}>
        <span className={classes}></span>
      </div>
      {menuStatus && <NavigationMobileMenu toggle={handleMobileMenu} />}
    </>
  );
};

export default MobileMenu;
