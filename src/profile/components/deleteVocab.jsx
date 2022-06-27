import React, { useEffect } from "react";
import css from "../module/deleteIcon.module.css";
import Modal from "../../components/modal";
import { ReactComponent as DeleteIcon } from "../../assets/svg/trashIcon.svg";
import { useStateIfMounted } from "use-state-if-mounted";
import ConfirmDialog from "../../components/confirmDialog";

const DeleteVocab = ({ word_id, setVocabWords }) => {
  const [showDialog, setShowDialog] = useStateIfMounted(false);

  const handleDeleteVocab = () => {
    setShowDialog(true);
  };

  const delVocabWord = async () => {
    const req = await fetch("/server/delVocabWord.php", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "word_id=" + word_id,
    });

    // Find the word inside of the Object Array and update the hide state.

    setVocabWords((prevWords) => {
      return prevWords.map((words) =>
        words.word_id === word_id
          ? Object.assign(words, { hide: "true" })
          : words
      );
    });
  };
  return (
    <React.Fragment>
      <div className={css.iconContainer}>
        <DeleteIcon
          onClick={() => handleDeleteVocab(word_id)}
          className={css.icon}
        />
      </div>
      <Modal>
        {showDialog && (
          <ConfirmDialog
            msg="Are you sure you want to delete this Vocabulary Word?"
            setShowDialog={setShowDialog}
            buttons={{ confirm: "Delete", cancel: "Cancel" }}
            runFunc={delVocabWord}
          />
        )}
      </Modal>
    </React.Fragment>
  );
};

export default DeleteVocab;
