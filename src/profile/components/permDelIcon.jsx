import React, { useEffect } from "react";
import css from "../module/permDelIcon.module.css";
import Modal from "../../components/modal";
import { ReactComponent as DeleteIcon } from "../../assets/svg/trashIcon.svg";
import { useStateIfMounted } from "use-state-if-mounted";
import ConfirmDialog from "../../components/confirmDialog";

const DeleteVocab = ({ word_id, setVocabWords, name }) => {
  const [showDialog, setShowDialog] = useStateIfMounted(false);

  const handleDeleteVocab = () => {
    setShowDialog(true);
  };

  const delVocabWord = async () => {
    const req = await fetch("/server/permdelVocabWord.php", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "word_id=" + word_id,
    });

    setVocabWords((prevWords) => {
      return prevWords.filter((word) => word.vocabWord !== name);
    });
  };
  return (
    <React.Fragment>
      <DeleteIcon
        onClick={() => handleDeleteVocab(word_id)}
        className={css.icon}
      />
      <Modal>
        {showDialog && (
          <ConfirmDialog
            msg="Are you sure you want to permanently delete this word? You will not be able to restore it."
            setShowDialog={setShowDialog}
            buttons={{ confirm: "Permanently Delete", cancel: "Cancel" }}
            runFunc={delVocabWord}
          />
        )}
      </Modal>
    </React.Fragment>
  );
};

export default DeleteVocab;
