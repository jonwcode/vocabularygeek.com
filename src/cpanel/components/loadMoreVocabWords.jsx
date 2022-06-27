import React from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import css from "../module/loadMoreVocabWords.module.css";

const LoadMoreVocabWords = ({ setNumberOfWords, setVocabWords }) => {
  const [moreWords, setMoreWords] = useStateIfMounted(true);
  const [loadingMore, setLoadingMore] = useStateIfMounted(false);
  const [pg, setPG] = useStateIfMounted(2);

  const loadMoreVocabWords = async () => {
    setLoadingMore(true);
    setPG((prevPg) => prevPg + 1);

    const req = await fetch("/server/fetchVocabWords.php?pg=" + pg);

    const response = await req.json();

    const wordResponse = response.filter((obj) => !obj.numberOfWords);

    setNumberOfWords(
      response.filter((obj) => obj.numberOfWords)[0].numberOfWords
    );

    if (wordResponse.length >= 1) {
      setVocabWords((prev) => {
        return [...prev, ...response.filter((obj) => !obj.numberOfWords)];
      });
    } else {
      setMoreWords(false);
    }

    setLoadingMore(false);
  };

  return (
    <React.Fragment>
      {moreWords ? (
        <button className={css.loadMoreWordsBtn} onClick={loadMoreVocabWords}>
          <span>Load More</span>
        </button>
      ) : (
        <span className={css.noMoreWords}>
          <span>No more words to be loaded</span>
        </span>
      )}
      {loadingMore && <span className={css.loadingMore}>Loading...</span>}{" "}
    </React.Fragment>
  );
};

export default LoadMoreVocabWords;
