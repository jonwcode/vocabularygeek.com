import React, { useEffect } from "react";
import css from "../module/wordList.module.css";
import Modal from "../../components/modal";
import { useParams } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";
import useWordType from "../hooks/useWordType";
import WordModal from "./wordModal";
import ColloModal from "./colloModal";

const VocabWordList = (props) => {
  const [vocabWords, setVocabWords] = useStateIfMounted([]);
  const [viewWordModal, setViewWordModal] = useStateIfMounted(false);
  const [viewColloModal, setViewColloModal] = useStateIfMounted(false);
  const [modalWord, setModalWord] = useStateIfMounted("");
  const wordType = useWordType;
  const params = useParams();

  const { words, listStyle, path } = props;

  useEffect(() => {
    setVocabWords([...words]);
  }, [words]);

  useEffect(() => {
    setViewWordModal(false);
    setViewColloModal(false);
    document.body.removeAttribute("style");
  }, [params]);

  const handleOpenLink = (url, wordName, evt) => {
    evt.preventDefault();

    setModalWord(wordName);

    window.history.pushState(url, "Vocabulary Geek", url);
    window.history.replaceState("", "", url);

    !path ? setViewWordModal(true) : setViewColloModal(true);
    document.body.style.cssText =
      "overflow:hidden; touch-action: none; -webkit-overflow-scrolling: none; height: 200px;";
  };

  return (
    <React.Fragment>
      {viewWordModal && (
        <Modal>
          <WordModal word={modalWord} setShowModal={setViewWordModal} />
        </Modal>
      )}
      {viewColloModal && (
        <Modal>
          <ColloModal word={modalWord} setShowModal={setViewColloModal} />
        </Modal>
      )}
      <div
        className={
          listStyle !== "colloStyle" ? css.vocabWordsContainer : css.colloStyle
        }
      >
        <ul>
          {vocabWords.map((word, index) => (
            <li key={index} className={css.wordName}>
              <a
                href={path ? path + word.name : `/word/${word.name}`}
                onClick={(evt) =>
                  handleOpenLink(
                    path ? path + word.name : `/word/${word.name}`,
                    word.name,
                    evt
                  )
                }
              >
                {word.name}
              </a>
              <span className={css.type}>{wordType(word.type)}</span>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default VocabWordList;
