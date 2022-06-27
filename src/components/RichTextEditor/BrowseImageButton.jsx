import React, { useRef, useEffect } from "react";
import { ReactComponent as ImageIcon } from "../../assets/svg/image-solid.svg";
import css from "./BrowseImageButton.module.css";
import { useStateIfMounted } from "use-state-if-mounted";
import MediaModal from "./mediaModal";

const BrowseImageButton = ({ setNewWord, wordName, setEditorText }) => {
  //   const [imgTagCurr, setImgTagCurr] = useStateIfMounted("");

  //   let imgTag = useRef();
  //   const imgRef = useRef();

  //   const handleChange = async (evt) => {
  //     const file = evt.target.files;

  //     const blob = URL.createObjectURL(file[0]);

  //     imgTag.current = <img src={blob} width="350" />;

  //     setImgTagCurr(
  //       <div ref={imgRef} class={css.downloadingImage}>
  //         {imgTag.current}
  //       </div>
  //     );

  //     // const blob = URL.createObjectURL(file);

  //     // console.log(blob);
  //   };

  const [showMediaModal, setShowMediaModal] = useStateIfMounted(false);

  const toggleMediaModal = () => {
    setShowMediaModal((prev) => !prev);
  };

  return (
    <div className={css.browseImagesContainer}>
      {showMediaModal && (
        <MediaModal
          setShowMediaModal={setShowMediaModal}
          setNewWord={setNewWord}
          setEditorText={setEditorText}
          wordName={wordName}
        />
      )}
      <ImageIcon width="25" onClick={toggleMediaModal} />
    </div>
  );
};

export default BrowseImageButton;
