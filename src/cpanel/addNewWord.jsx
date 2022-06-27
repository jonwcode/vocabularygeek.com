import React, { useEffect, useRef } from "react";
import css from "./module/addNewWord.module.css";
import { ReactComponent as PopupIcon } from "../assets/svg/popupIcon.svg";
import Modal from "../components/modal";
import { useStateIfMounted } from "use-state-if-mounted";
import AddWordModal from "./addWordModal";
import SearchBox from "./components/searchBox";
import CurrentWordList from "./components/currentWordList";
import TopNav from "./topNav";

import LoadMoreVocabWords from "./components/loadMoreVocabWords";

const AddNewWord = ({ searchInput, setSearchInput }) => {
  const [showModal, setShowModal] = useStateIfMounted(false);
  const [vocabWords, setVocabWords] = useStateIfMounted([]);
  const [numberOfWords, setNumberOfWords] = useStateIfMounted(0);

  useEffect(() => {
    loadVocabWords();
  }, []);

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
  };

  return (
    <React.Fragment>
      <div className={css.wrapper}>
        <span className={css.headerText}>Add New Word</span>
        <TopNav />
        <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
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
            <CurrentWordList
              vocabWords={vocabWords}
              setVocabWords={setVocabWords}
              loadVocabWords={loadVocabWords}
            />
          )}
        </div>
        {showModal && (
          <Modal>
            <AddWordModal closeModal={toggleModal} />
          </Modal>
        )}

        <LoadMoreVocabWords
          setNumberOfWords={setNumberOfWords}
          setVocabWords={setVocabWords}
        />
      </div>
    </React.Fragment>
  );
};

export default AddNewWord;
