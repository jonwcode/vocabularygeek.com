import React, { useEffect } from "react";
import css from "./module/savedWordList.module.css";
import { useParams } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";
import Modal from "../components/modal";
import WordModal from "../words/components/wordModal";
import ColloModal from "../words/components/colloModal";

const SavedWordList = ({ savedWords }) => {
  const [viewWordModal, setViewWordModal] = useStateIfMounted(false);
  const [viewColloModal, setViewColloModal] = useStateIfMounted(false);
  const [modalWord, setModalWord] = useStateIfMounted("");

  const params = useParams();

  useEffect(() => {
    setViewColloModal(false);
    setViewWordModal(false);
    document.body.removeAttribute("style");
  }, [params]);

  const handleOpenLink = (url, word, collo, evt) => {
    evt.preventDefault();

    setModalWord(word);
    window.history.pushState(url, "Vocabulary Geek", url);
    window.history.replaceState("", "", url);

    !collo ? setViewWordModal(true) : setViewColloModal(true);
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

      <div className={css.wordContainer}>
        <ul>
          {savedWords.map(
            (word) =>
              word.phrase === "false" && (
                <li key={word.word_id}>
                  <a
                    href={`/word/${word.name}`}
                    onClick={(evt) =>
                      handleOpenLink(
                        "/word/" + word.name,
                        word.name,
                        false,
                        evt
                      )
                    }
                  >
                    {word.name}
                  </a>{" "}
                </li>
              )
          )}
          {savedWords.map(
            (word) =>
              word.phrase === "true" && (
                <li key={word.word_id} className={css.phraseList}>
                  <a
                    href={`/colloquialism/${word.name}`}
                    onClick={(evt) =>
                      handleOpenLink(
                        "/colloquialism/" + word.name,
                        word.name,
                        true,
                        evt
                      )
                    }
                  >
                    {word.name}
                  </a>{" "}
                </li>
              )
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SavedWordList;
