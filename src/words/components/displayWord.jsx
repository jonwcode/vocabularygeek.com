import React, { useContext } from "react";
import css from "../module/displayWord.module.css";
import { ReactComponent as Play } from "../../assets/svg/play.svg";
import useWordType from "../hooks/useWordType";
import userContext from "../../store/user-context";
import SaveWord from "./saveWord";

const DisplayWord = ({ name, description, type, date, saved }) => {
  const wordType = useWordType;

  const userCtx = useContext(userContext);

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
        <div className={css.saveWordContainer}>
          <SaveWord word={name} saved={saved} />
        </div>
      </div>
      <span className={css.descriptionContainer}>
        <div
          className={css.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {userCtx.permissions >= 2 && (
          <span className={css.timestamp}>{date}</span>
        )}
      </span>
    </div>
  );
};

export default DisplayWord;
