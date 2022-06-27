import React, { useEffect, useState, useRef } from "react";
import css from "./richTextEditor.module.css";
import ContextEditable from "react-contenteditable";
import HyperLinkModal from "./hyperLinkModal";
import { ReactComponent as LinkIcon } from "../../assets/svg/link-solid.svg";
import { ReactComponent as BoldIcon } from "../../assets/svg/bold-solid.svg";
import { ReactComponent as ItalicIcon } from "../../assets/svg/italic-solid.svg";
import { ReactComponent as HeadingIcon } from "../../assets/svg/heading-solid.svg";
import { ReactComponent as UnderlineIcon } from "../../assets/svg/underline-solid.svg";
import BrowseImageButton from "./BrowseImageButton";

const RichTextEditor = ({ onChange, value, name, setNewWord }) => {
  const [editorText, setEditorText] = useState("<div></div>");
  const [showModal, setShowModal] = useState(false);
  const [hyperLinkValues, setHyperLinkValues] = useState({
    url: "",
    label: "",
  });

  useEffect(() => {
    if (value && value.length >= 1) {
      setEditorText(value);
    }
  }, [value]);

  const [activeH1, setActiveH1] = useState(false);

  const editorRef = useRef();
  const boldBtn = useRef();
  const italicBtn = useRef();
  const underlineBtn = useRef();
  const headeringBtn = useRef();

  const setCaret = (el) => {
    el.focus();
    if (
      typeof window.getSelection != "undefined" &&
      typeof document.createRange != "undefined"
    ) {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  };

  let cancelEnterEvent = false;

  const handleCommand = (cmd, el) => {
    editorRef.current.focus();
    document.execCommand(cmd);

    console.log(el.target.tagName);

    if (!el.target.classList.contains(`${css.activeBtn}`)) {
      el.target.classList.add(`${css.activeBtn}`);
    } else {
      el.target.classList.remove(`${css.activeBtn}`);
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter" && cancelEnterEvent.current === false) {
      document.execCommand("insertLineBreak");
      event.preventDefault();
    } else {
      cancelEnterEvent = false;
    }
  };

  const handleChange = (evt) => {
    onChange(evt);

    if (window.getSelection().anchorNode.parentNode.nodeName === "H1") {
      setActiveH1(true);
    } else {
      setActiveH1(false);
    }

    // Remove the active classes from bold button if its false

    if (!document.queryCommandState("bold")) {
      if (boldBtn.current.classList.contains(`${css.activeBtn}`)) {
        boldBtn.current.classList.remove(`${css.activeBtn}`);
      }
    }

    // Remove the active classes from italic button if its false

    if (!document.queryCommandState("italic")) {
      if (italicBtn.current.classList.contains(`${css.activeBtn}`)) {
        italicBtn.current.classList.remove(`${css.activeBtn}`);
      }
    }

    if (!document.queryCommandState("underline")) {
      if (underlineBtn.current.classList.contains(`${css.activeBtn}`)) {
        underlineBtn.current.classList.remove(`${css.activeBtn}`);
      }
    }

    // Remove the active classes from heading Button if its false

    if (!activeH1) {
      if (headeringBtn.current.classList.contains(`${css.activeBtn}`)) {
        headeringBtn.current.classList.remove(`${css.activeBtn}`);
      }
    }

    setEditorText(evt.target.value);
  };

  const insertHTML = (html, el) => {
    cancelEnterEvent = true;
    document.execCommand("formatBlock", false, html);
    setActiveH1(true);
    if (!el.target.classList.contains(`${css.activeBtn}`)) {
      el.target.classList.add(`${css.activeBtn}`);
    } else {
      el.target.classList.remove(`${css.activeBtn}`);
    }
  };

  const toggleHyperLinkModal = () => {
    setShowModal((prev) => !prev);
  };

  const addHyperLink = async () => {
    setHyperLinkValues((prev) => {
      return { ...prev };
    });

    const hyperlink =
      "<a target='_blank' href='" +
      `${hyperLinkValues.url}` +
      "'>" +
      `${hyperLinkValues.label}` +
      "</a>";

    setCaret(editorRef.current);

    setTimeout(() => {
      document.execCommand("insertHTML", false, hyperlink);
    }, 500);

    //console.log(hyperLinkValues, hyperlink);

    setTimeout(() => {
      setHyperLinkValues((prev) => {
        return { url: "", label: "" };
      });
    }, 1000);

    toggleHyperLinkModal();
  };

  return (
    <div className={css.editorWrapper}>
      <HyperLinkModal
        show={showModal}
        toggleHyperLinkModal={toggleHyperLinkModal}
        setHyperLinkValues={setHyperLinkValues}
        hyperLinkValues={hyperLinkValues}
        addHyperLink={addHyperLink}
      />
      <div className={css.controlWrapper}>
        <div className={css.controls}>
          <button
            ref={boldBtn}
            className={css.controlBtn}
            onClick={(evt) => handleCommand("bold", evt)}
          >
            <BoldIcon width="15" />
          </button>
          <button
            ref={italicBtn}
            className={css.controlBtn}
            id="italic"
            onClick={(evt) => handleCommand("italic", evt)}
          >
            <ItalicIcon width="15" />
          </button>
          <button
            ref={underlineBtn}
            className={css.controlBtn}
            id="underline"
            onClick={(evt) => handleCommand("underline", evt)}
          >
            <UnderlineIcon width="20" />
          </button>
          <button
            ref={headeringBtn}
            className={css.controlBtn}
            onClick={(evt) => insertHTML("H1", evt)}
          >
            <HeadingIcon width="20" />
          </button>
          <button className={css.controlBtn} onClick={toggleHyperLinkModal}>
            <LinkIcon width="20" />
          </button>

          <BrowseImageButton
            setNewWord={setNewWord}
            setEditorText={setEditorText}
            wordName={name}
          />
        </div>
      </div>
      <ContextEditable
        className={css.editor}
        onChange={handleChange}
        onKeyDown={handleEnter}
        html={editorText}
        innerRef={editorRef}
        name="description"
      />
    </div>
  );
};

export default RichTextEditor;
