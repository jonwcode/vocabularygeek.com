import React, { useEffect } from "react";
import css from "../module/wordModal.module.css";
import Header from "../../components/header";
import { useReadCookie } from "../../hooks/cookies";
import ColloquialismFetch from "../colloquialismFetch";

const WordModal = ({ word, setShowModal }) => {
  const readCookie = useReadCookie;

  // We are going to read the cookie to see
  // If we need to have day or night as our background color for the page

  const theme =
    readCookie("themeMode") && readCookie("themeMode") === "nightLight"
      ? css.nightLight
      : css.dayLight;

  return (
    <React.Fragment>
      <div className={`${css.modal} ${theme}`}>
        <Header dayNight={false} setShowModal={setShowModal} />
        <ColloquialismFetch wordName={word} />
      </div>
    </React.Fragment>
  );
};

export default WordModal;
