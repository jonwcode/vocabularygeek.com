import React from "react";
import css from "../module/displayWord.module.css";
import { ReactComponent as Play } from "../../assets/svg/play.svg";
import useWordType from "../hooks/useWordType";

const DisplayWord = ({ name, description, type }) => {
  const wordType = useWordType;

  const readText = (text) => {
    const msg = new SpeechSynthesisUtterance();
    const voices = window.speechSynthesis.getVoices();

    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className={css.wordContainer}>
      <div className={css.wordHeader}>
        <span className={css.name}>{name}</span>
        <span className={css.type}>{wordType(type)}</span>
        <Play onClick={() => readText(name)} className={css.play} />
      </div>

      <span className={css.descriptionContainer}>
        <div
          className={css.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </span>
    </div>
  );
};

export default DisplayWord;
