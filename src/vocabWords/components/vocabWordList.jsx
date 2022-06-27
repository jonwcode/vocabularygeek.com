import React, { useEffect } from "react";
import css from "../module/vocabWordList.module.css";
import { Link } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";
import useWordType from "../hooks/useWordType";

const VocabWordList = ({ words }) => {
  const [vocabWords, setVocabWords] = useStateIfMounted([]);
  const wordType = useWordType;

  useEffect(() => {
    setVocabWords([...words]);
  }, [words]);

  return (
    <div className={css.vocabWordsContainer}>
      <ul>
        {vocabWords.map((word, index) => (
          <li key={index} className={css.wordName}>
            <Link to={`/word/${word.name}`}>{word.name}</Link>
            <span className={css.type}>{wordType(word.type)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VocabWordList;
