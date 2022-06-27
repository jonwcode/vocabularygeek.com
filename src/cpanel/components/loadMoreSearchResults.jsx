import React from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import css from "../module/loadMoreVocabWords.module.css";

const LoadMoreSearchResults = ({
  query,
  setVocabWords,
  pg,
  setPG,
  moreWords,
  setMoreWords,
}) => {
  const [loadingMore, setLoadingMore] = useStateIfMounted(false);

  const loadMoreVocabWords = async () => {
    setLoadingMore(true);
    setPG((prevPg) => prevPg + 1);

    const req = await fetch("/server/wordSearch.php?q=" + query + "&pg=" + pg);

    const response = await req.json();

    const wordResponse = response.filter((obj) => !obj.numberOfWords);

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
          <span>No more search results.</span>
        </span>
      )}
      {loadingMore && <span className={css.loadingMore}>Loading...</span>}{" "}
    </React.Fragment>
  );
};

export default LoadMoreSearchResults;
