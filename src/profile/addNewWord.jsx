import React, { useEffect, useRef } from "react";
import css from "./module/addNewWord.module.css";
import { ReactComponent as PopupIcon } from "../assets/svg/popupIcon.svg";
import Loading from "../components/loading";
import Modal from "../components/modal";
import { useStateIfMounted } from "use-state-if-mounted";
import AddWordModal from "./addWordModal";
import EditVocabWordModal from "./editVocabWordModal";
import ToggleHideShowWord from "./components/toggleHideShowWord";
import { ReactComponent as EditIcon } from "../assets/svg/editIcon.svg";
import RestoreVocabWord from "./components/restoreVocabWord";
import PermDelIcon from "./components/permDelIcon";
import DeleteVocab from "./components/deleteVocab";
const AddNewWord = () => {
  const [showModal, setShowModal] = useStateIfMounted(false);
  const [showEditModal, setShowEditModal] = useStateIfMounted({
    show: false,
    word: "",
  });
  const [vocabWords, setVocabWords] = useStateIfMounted([]);
  const [numberOfWords, setNumberOfWords] = useStateIfMounted(0);
  const [loading, setLoading] = useStateIfMounted(false);
  const [loadingMore, setLoadingMore] = useStateIfMounted(false);
  const [scrollPos, setScrollTo] = useStateIfMounted(0);
  const [pg, setPG] = useStateIfMounted(2);
  const [moreWords, setMoreWords] = useStateIfMounted(true);

  useEffect(() => {
    loadVocabWords();
  }, []);

  useEffect(() => {
    setScrollTo(window.scrollY);
    window.scrollTo(0, 0);

    if (showEditModal.show == true) {
      document.body.style.cssText = "overflow:hidden;";
    }
    if (!showEditModal.show) {
      window.scrollBy(0, scrollPos);
      document.body.removeAttribute("style");
    }
  }, [showEditModal.show]);

  const toggleModal = (reloadWords = false) => {
    if (document.body.style) {
      document.body.removeAttribute("style");
    }

    setShowModal((prev) => !prev);

    if (reloadWords === true) {
      loadVocabWords();
    }
  };

  const loadVocabWords = async () => {
    const req = await fetch("/server/fetchVocabWords.php?pg=1");

    const response = await req.json();

    setNumberOfWords(
      response.filter((obj) => obj.numberOfWords)[0].numberOfWords
    );

    setVocabWords(response.filter((obj) => !obj.numberOfWords));

    console.log(response);
  };

  const loadMoreVocabWords = async () => {
    setLoadingMore(true);
    setPG((prevPg) => prevPg + 1);

    const req = await fetch("/server/fetchVocabWords.php?pg=" + pg);

    const response = await req.json();

    const wordResponse = response.filter((obj) => !obj.numberOfWords);

    setNumberOfWords(
      response.filter((obj) => obj.numberOfWords)[0].numberOfWords
    );

    if (wordResponse.length >= 1) {
      setVocabWords((prev) => {
        return [...prev, ...response.filter((obj) => !obj.numberOfWords)];
      });
    } else {
      setMoreWords(false);
    }

    setLoadingMore(false);
  };

  const editVocabWord = async (word) => {
    setLoading(true);
    const req = await fetch("/server/editFetchWord.php?word=" + word);

    const response = await req.json();

    setShowEditModal((prev) => {
      return { show: !prev.show, word: response };
    });

    setLoading(false);
  };

  const toggleEditModal = (reloadWords = false) => {
    setShowEditModal((prev) => {
      return { show: !prev.show, word: "" };
    });

    if (reloadWords === true) {
      loadVocabWords();
    }
  };

  return (
    <React.Fragment>
      {loading && <Loading />}
      <div className={css.wrapper}>
        <span className={css.addWordHeader}>
          <span className={css.addNewWordButtonContainer}>
            <button onClick={toggleModal} className={css.addButton}>
              <PopupIcon width="20" fill="#f1f1f1" className={css.plusIcon} />
              Add New Word
            </button>
          </span>

          <span className={css.addWordHeaderText}>
            Vocabulary Words ( {numberOfWords} )
          </span>
        </span>

        <div className={css.currentWords}>
          {vocabWords.length === 0 ? (
            <span className={css.text}>
              <span className={css.noVocabWords}>
                Currently there isn't any vocabulary words.
              </span>
            </span>
          ) : (
            <div className={css.vocabWordContainer}>
              {!vocabWords.hide &&
                vocabWords.map((word, index) => {
                  let content;

                  if (word.hide === "false" || word.hide === null) {
                    content = (
                      <div className={css.vocabWordRow} key={index}>
                        <span className={css.vocabWordText}>
                          {word.vocabWord}
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
                        <EditIcon
                          width="25"
                          className={css.editIcon}
                          onClick={() => editVocabWord(word.vocabWord)}
                        />
                      </div>
                    );
                  } else if (word.hide === "true") {
                    content = (
                      <div
                        className={css.vocabWordRow}
                        style={{ backgroundColor: "#f7e7e7" }}
                        key={index}
                      >
                        <span className={css.vocabWordText}>
                          {word.vocabWord}
                        </span>
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
          )}
        </div>
        {showModal && (
          <Modal>
            <AddWordModal closeModal={toggleModal} />
          </Modal>
        )}
        {showEditModal.show && (
          <Modal>
            <EditVocabWordModal
              word={showEditModal.word}
              toggleEditModal={toggleEditModal}
            />
          </Modal>
        )}
        {moreWords ? (
          <button className={css.loadMoreWordsBtn} onClick={loadMoreVocabWords}>
            <span>Load More</span>
          </button>
        ) : (
          <span className={css.noMoreWords}>
            <span>No more words to be loaded</span>
          </span>
        )}

        {loadingMore && <span className={css.loadingMore}>Loading...</span>}
      </div>
    </React.Fragment>
  );
};

export default AddNewWord;
