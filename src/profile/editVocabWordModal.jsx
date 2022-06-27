import React, { useState, useRef, useEffect } from "react";
import css from "./module/editVocabWordModal.module.css";
import { ReactComponent as CloseIcon } from "../assets/svg/xmark.svg";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";
import ErrorMsgModal from "../components/errorMsgModal";
import { useStateIfMounted } from "use-state-if-mounted";

const AddWordModal = ({ toggleEditModal, word }) => {
  const [showErrorMsg, setShowErrMsg] = useStateIfMounted({
    show: false,
    msg: null,
  });

  const vocabWordTimeout = useRef(null);

  const [submitBtnText, setSubmitBtnText] =
    useStateIfMounted("Edit Vocab Word");

  const [newWord, setNewWord] = useStateIfMounted({
    curr_word: word.name,
    name: word.name,
    description: word.description,
    type: word.type,
    visable: word.visable,
    wordDup: null,
  });

  useEffect(() => {
    setNewWord((prev) => {
      return { ...prev, name: word.name };
    });
  }, []);

  const handleChangeDes = (evt) => {
    setNewWord((prev) => {
      return { ...prev, description: evt.target.value };
    });
  };

  const handleChange = (evt) => {
    const name = evt.target.name;

    setNewWord((prev) => {
      return { ...prev, [name]: evt.target.value };
    });
  };

  const checkAvability = (evt) => {
    clearTimeout(vocabWordTimeout.current);

    if (evt.target.classList.contains(`${css.inputError}`)) {
      evt.target.classList.remove(`${css.inputError}`);
    }

    vocabWordTimeout.current = setTimeout(async () => {
      if (newWord.curr_word !== evt.target.value.trim()) {
        if (evt.target.value.length >= 2) {
          const req = await fetch(
            "/server/checkWordAvability.php?word=" + evt.target.value
          );

          const response = await req.text();

          if (response === "0") {
            setNewWord((prev) => {
              return { ...prev, wordDup: false };
            });
          } else {
            setNewWord((prev) => {
              return { ...prev, wordDup: true };
            });

            setShowErrMsg({
              show: true,
              msg: `This Vocabulary Word already exist in our database.`,
            });

            evt.target.classList.add(`${css.inputError}`);
          }
        }
      }
    }, 1200);
  };

  const handleSubmit = async (evt) => {
    const { name, type, description, wordDup } = newWord;

    if (name.length >= 2 && type !== 0 && description.length >= 10) {
      // Update the vocabulary word
      setSubmitBtnText("Loading...");

      const word_data = { ...newWord, word_id: word.word_id };

      const req = await fetch("/server/editVocabWord.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(word_data),
      });

      //const response = await req.text();

      setSubmitBtnText("Edit Vocab Word");

      toggleEditModal(true);
    } else {
      setShowErrMsg({
        show: true,
        msg: "Please be sure to fill in all fields.",
      });
    }
  };

  const closeModal = () => {
    toggleEditModal();
  };

  return (
    <>
      {showErrorMsg.show && (
        <ErrorMsgModal err={showErrorMsg.msg} setShowErrorMsg={setShowErrMsg} />
      )}
      <div
        className={css.overLay}
        style={{ height: `${document.documentElement.scrollHeight}px` }}
      ></div>

      <div className={css.wrapper} style={{ top: `${window.scrollY}px` }}>
        <div className={css.mobileContainer}>
          <div className={css.headerBar}>
            <span className={css.modalTitle}>
              <span className={css.headerText}>Edit Vocabulary Word</span>
            </span>
            <div className={css.closeBtnContainer}>
              <CloseIcon onClick={closeModal} className={css.closeIcon} />
            </div>
          </div>
          <div className={css.inputContainer}>
            <label className={css.inputField} htmlFor="newWord">
              <span className={css.labelText}>Vocab Word</span>
              <input
                onKeyDown={(evt) => checkAvability(evt)}
                onChange={handleChange}
                name="name"
                type="text"
                value={newWord.name}
                placeholder="Vocabulary Word"
              />
            </label>
            <label className={css.inputField} htmlFor="newWord">
              <span className={css.labelText}>Word Type</span>
              <select name="type" onChange={handleChange} value={newWord.type}>
                <option value="0">-- Select Word Type -- </option>
                <option value="1">Noun</option>
                <option value="2">Verb</option>
                <option value="3">Adjective</option>
                <option value="4">Adverb</option>
                <option value="5">Pronoun</option>
                <option value="6">Preposition</option>
                <option value="7">Conjunction</option>
                <option value="8">Interjection</option>
                <option value="9">Article</option>
                <option value="10">Determiner</option>
              </select>
            </label>
            <label className={css.inputField} htmlFor="newWord">
              <span className={css.labelText}>Description</span>
              <RichTextEditor
                onChange={handleChangeDes}
                value={newWord.description}
                style={{ width: "100%", height: "500px" }}
              />
            </label>

            <label className={css.inputField} htmlFor="newWord">
              <span className={css.labelText}>Visability</span>
              <select
                className={css.selectInupt}
                onChange={handleChange}
                name="visable"
                value={newWord.visable}
              >
                <option value="false">Hidden</option>
                <option value="true">Visable</option>
              </select>
            </label>
          </div>

          <button
            disabled={false}
            className={css.submitBtn}
            onClick={(evt) => handleSubmit(evt)}
          >
            {submitBtnText}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddWordModal;
