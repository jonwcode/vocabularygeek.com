import React, { useEffect } from "react";
import Loading from "../../components/loading";
import EditVocabWordModal from "../editVocabWordModal";
import Modal from "../../components/modal";
import { ReactComponent as EditIcon } from "../../assets/svg/editIcon.svg";
import css from "../module/editVocabWord.module.css";
import { useStateIfMounted } from "use-state-if-mounted";

const EditVocabWord = ({ word, loadVocabWords }) => {
  const [scrollPos, setScrollTo] = useStateIfMounted(0);

  const [loading, setLoading] = useStateIfMounted(false);
  const [showEditModal, setShowEditModal] = useStateIfMounted({
    show: false,
    word: "",
  });

  useEffect(() => {
    setScrollTo(window.scrollY);
    //window.scrollTo(0, 0);

    if (showEditModal.show == true) {
      document.body.style.cssText = "overflow:hidden;";
    }
    if (!showEditModal.show) {
      window.scrollBy(0, scrollPos);
      document.body.removeAttribute("style");
    }
  }, [showEditModal.show]);

  const toggleEditModal = (reloadWords = false) => {
    setShowEditModal((prev) => {
      return { show: !prev.show, word: "" };
    });

    if (reloadWords === true) {
      loadVocabWords();
    }
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

  return (
    <React.Fragment>
      {loading && <Loading />}
      <EditIcon
        width="25"
        className={css.editIcon}
        onClick={() => editVocabWord(word.vocabWord)}
      />

      {showEditModal.show && (
        <Modal>
          <EditVocabWordModal
            word={showEditModal.word}
            toggleEditModal={toggleEditModal}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default EditVocabWord;
