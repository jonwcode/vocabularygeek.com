import React, { useRef, useEffect } from "react";
import css from "./mediaModal.module.css";
import Modal from "../modal";
import { ReactComponent as FileIcon } from "../../assets/svg/file-solid.svg";
import { ReactComponent as CloseButton } from "../../assets/svg/xmark.svg";
import { ReactComponent as Downloading } from "../../assets/svg/downloading.svg";
import { ReactComponent as AddIcon } from "../../assets/svg/plus-solid.svg";
import { ReactComponent as TrashIcon } from "../../assets/svg/trashIcon.svg";
import { useStateIfMounted } from "use-state-if-mounted";
import { useReadCookie } from "../../hooks/cookies";

const MediaModal = ({
  setShowMediaModal,
  setNewWord,
  setEditorText,
  wordName,
}) => {
  const [image, setImage] = useStateIfMounted(
    <FileIcon className={css.noFile} />
  );

  const [uploading, setUploading] = useStateIfMounted(false);
  const [percentage, setPercentage] = useStateIfMounted("");
  const [showOptions, setShowOptions] = useStateIfMounted(false);
  const imgBlob = useRef();

  const readCookie = useReadCookie;

  useEffect(() => {
    if (readCookie("imgFile") && readCookie("imgFile").length >= 1) {
      setShowOptions(true);
      const imgPath = "/images/" + readCookie("imgFile");
      setImage(
        <div className={css.imageFileContainer} style={{ height: `${document.documentElement.scrollHeight}px` }}>
          <img src={imgPath} height="400" />
        </div>
      );
    }
  }, []);

  const toggleModal = () => {
    setShowMediaModal(false);
  };

  const handleChange = async (evt) => {
    const file = evt.target.files;

    const blob = URL.createObjectURL(file[0]);
    imgBlob.current = blob;

    setImage(
      <div className={css.imageFileContainer} style={{ height: `${document.documentElement.scrollHeight}px` }}>
        <Downloading className={css.downloadingSpinner} />
        <div className={css.downloading}>
          <img src={blob} width="250" />
        </div>
      </div>
    );

    setUploading(true);

    startUpload(evt.target.files[0]);

    // const blob = URL.createObjectURL(file);

    // console.log(blob);
  };

  const startUpload = (fileData) => {
    if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
    }

    const formData = new FormData();

    if (wordName && wordName.length >= 1) {
      formData.append("wordName", wordName);
    }

    formData.append("imgFile", fileData);

    xhr.addEventListener("load", complete.bind(this, xhr));
    xhr.upload.addEventListener("progress", progress);
    xhr.open("POST", "/server/imageUploader.php");
    xhr.send(formData);
  };

  const complete = (xhr) => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      setShowOptions(true);
      setImage(
        <div className={css.imageFileContainer} style={{ height: `${document.documentElement.scrollHeight}px` }}>
          <img src={imgBlob.current} width="250" />
        </div>
      );
    }
  };

  const progress = (evt) => {
    let percent = (evt.loaded / evt.total) * 100;

    setPercentage(percent);
  };

  const handleAddImage = () => {
    const imgPath = "/images/" + readCookie("imgFile");

    if (setNewWord) {
      setNewWord((prev) => {
        return {
          ...prev,
          description: prev.description + `<img src=${imgPath} width="500" />`,
        };
      });
    } else if (setEditorText) {
      setEditorText((prev) => prev + `<img src=${imgPath} width="500" />`);
    }

    toggleModal(false);
  };

  const handleDeleteImage = async () => {
    const req = await fetch(
      "/server/delImage.php?img=" + readCookie("imgFile")
    );

    // Now reset everything

    setShowOptions(false);
    setImage(<FileIcon className={css.noFile} />);
    setUploading(false);
    setPercentage("");
  };

  return (
    <Modal>
      <div className={css.overlay} style={{ height: `${document.documentElement.scrollHeight}px` }}>
        {" "}
        <div className={css.container} style={{ top: `${window.scrollY}px` }}>
          <div className={css.header}>
            <span className={css.headerText}>Image Manager</span>
            <CloseButton className={css.closeButton} onClick={toggleModal} />
          </div>
          {!uploading && !showOptions && (
            <div className={css.uploadButton}>
              <input type="file" onChange={handleChange} />
              <button className={css.btn}>
                <FileIcon className={css.fileIcon} />{" "}
                <span className={css.btnText}>Choose Image File</span>
              </button>
            </div>
          )}
          {uploading && !showOptions && (
            <span className={css.progressBar}>
              <span
                className={css.percentageBar}
                style={{ width: `${percentage}%` }}
              ></span>
              <span className={css.uploadedPercent}>
                {Math.round(percentage)}%
              </span>
            </span>
          )}
          {showOptions && (
            <div className={css.optionsContainer}>
              <button className={css.addBtn} onClick={handleAddImage}>
                <span className={css.plusIconContainer}>
                  <AddIcon className={css.addIcon} />
                </span>
                <span className={css.addText}>Add Image</span>
              </button>
              <button className={css.delBtn} onClick={handleDeleteImage}>
                <span className={css.plusIconContainer}>
                  <TrashIcon className={css.trashIcon} />
                </span>
                <span className={css.addText}>Delete Image</span>
              </button>
            </div>
          )}
          <div className={css.imageContainer}>{image}</div>
        </div>
      </div>
    </Modal>
  );
};

export default MediaModal;
