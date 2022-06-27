import React from "react";
import css from "./hyperLinkModal.module.css";
import { ReactComponent as CloseIcon } from "../../assets/svg/xmark.svg";

const HyperLinkModal = ({
  show,
  setHyperLinkValues,
  toggleHyperLinkModal,
  hyperLinkValues,
  addHyperLink,
}) => {
  const handleChange = (evt) => {
    setHyperLinkValues((prev) => {
      return { ...prev, [evt.target.name]: evt.target.value };
    });
  };

  return (
    <>
      {show && (
        <>
          <div className={css.overlay}></div>
          <div className={css.hyperLinkModal}>
            <span className={css.header}>
              Create an Hyperlink{" "}
              <CloseIcon
                className={css.closeIcon}
                onClick={toggleHyperLinkModal}
              />
            </span>
            <div className={css.wrapper}>
              <div className={css.inputContainer}>
                <label htmlFor="url">
                  <span className={css.labelText}>URL</span>
                  <input
                    placeholder="Hyperlink URL"
                    value={hyperLinkValues.url}
                    name="url"
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="url">
                  <span className={css.labelText}>Label</span>
                  <input
                    placeholder="Hyperlink Label"
                    value={hyperLinkValues.label}
                    name="label"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={css.buttonContainer}>
                <button onClick={addHyperLink}>Create HyperLink</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HyperLinkModal;
