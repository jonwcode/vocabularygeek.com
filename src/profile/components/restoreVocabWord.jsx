import React, { useEffect } from "react";
import css from "../module/restoreIcon.module.css";
import Modal from "../../components/modal";
import { ReactComponent as RestoreIcon } from "../../assets/svg/restore.svg";
import { useStateIfMounted } from "use-state-if-mounted";
import ConfirmDialog from "../../components/confirmDialog";

const DeleteVocab = ({ word_id, setVocabWords }) => {
  const [showDialog, setShowDialog] = useStateIfMounted(false);

  const handleRestoreVocab = () => {
    setShowDialog(true);
  };

  const delVocabWord = async () => {
    const req = await fetch("/server/restoreVocabWord.php", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "word_id=" + word_id,
    });

    setVocabWords((prevWords) => {
      return prevWords.map((words) =>
        words.word_id === word_id
          ? Object.assign(words, { hide: "false" })
          : words
      );
    });
  };
  return (
    <React.Fragment>
      <RestoreIcon
        onClick={() => handleRestoreVocab(word_id)}
        className={css.icon}
      />
      <Modal>
        {showDialog && (
          <ConfirmDialog
            msg="Are you sure you want to restore this vocabulary word?"
            setShowDialog={setShowDialog}
            buttons={{ confirm: "Restore", cancel: "Cancel" }}
            runFunc={delVocabWord}
          />
        )}
      </Modal>
    </React.Fragment>
  );
};

export default DeleteVocab;
