import React from "react";
import ToggleHideShowWord from "./toggleHideShowWord";
import RestoreVocabWord from "./restoreVocabWord";
import PermDelIcon from "./permDelIcon";
import DeleteVocab from "./deleteVocab";
import EditVocabWord from "./editVocabWord";
import { Link } from "react-router-dom";
import css from "../module/currentWordList.module.css";

const CurrentWordList = ({ vocabWords, loadVocabWords, setVocabWords }) => {
  return (
    <div className={css.vocabWordContainer}>
      {!vocabWords.hide &&
        vocabWords.map((word, index) => {
          let content;

          if (word.hide === "false" || word.hide === null) {
            content = (
              <div className={css.vocabWordRow} key={index}>
                <span className={css.vocabWordText}>
                  <Link to={`/word/${word.vocabWord}`}>{word.vocabWord}</Link>
                </span>
                <DeleteVocab
                  setVocabWords={setVocabWords}
                  word_id={word.word_id}
                  style={{ float: "right" }}
                />
                <ToggleHideShowWord
                  visable={word.visable}
                  style={{ float: "right" }}
                />
                <EditVocabWord word={word} loadVocabWords={loadVocabWords} />
              </div>
            );
          } else if (word.hide === "true") {
            content = (
              <div
                className={css.vocabWordRow}
                style={{ backgroundColor: "#f7e7e7" }}
                key={index}
              >
                <span className={css.vocabWordText}>{word.vocabWord}</span>
                <RestoreVocabWord
                  setVocabWords={setVocabWords}
                  word_id={word.word_id}
                />
                <PermDelIcon
                  setVocabWords={setVocabWords}
                  word_id={word.word_id}
                  name={word.vocabWord}
                />
              </div>
            );
          }

          return content;
        })}
    </div>
  );
};

export default CurrentWordList;
