import React, { useEffect, useRef } from "react";
import css from "../module/searchModal.module.css";
import SearchBox from "./searchBox";
import CurrentWordList from "./currentWordList";
import { useStateIfMounted } from "use-state-if-mounted";
import LoadMoreSearchResults from "./loadMoreSearchResults";

const SearchFunction = ({ searchInput, setSearchInput }) => {
  let timer = useRef();
  const [vocabWords, setVocabWords] = useStateIfMounted([]);
  const [searching, setSearching] = useStateIfMounted(false);
  const [noResults, setNoResults] = useStateIfMounted(false);
  const [numberOfWords, setNumberOfWords] = useStateIfMounted("");
  const [moreWords, setMoreWords] = useStateIfMounted(true);
  const [pg, setPG] = useStateIfMounted(2);

  useEffect(() => {
    clearTimeout(timer.current);
    setSearching(true);
    setNoResults(false);

    timer.current = setTimeout(async () => {
      // Run a search for that string in the database
      setPG(2);

      const req = await fetch(
        "/server/wordSearch.php?q=" + searchInput + "&pg=1"
      );

      const response = await req.json();
      const numOfWords = response.filter((obj) => obj.numberOfWords)[0]
        .numberOfWords;

      setNumberOfWords(numOfWords);

      if (numOfWords >= 26) {
        setMoreWords(true);
      }

      setVocabWords(response.filter((obj) => !obj.numberOfWords));

      if (response.filter((obj) => !obj.numberOfWords).length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }

      setSearching(false);
    }, 1200);
  }, [searchInput]);

  return (
    <div className={css.wrapper}>
      <span className={css.searchHeader}>Vocabulary Word Search</span>
      <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
      {!searching && (
        <span className={css.numOfResults}>
          Number of results: {numberOfWords}
        </span>
      )}
      {searching && <span className={css.searching}>Searching...</span>}
      {noResults && (
        <span className={css.noResults}>
          No results found for "{searchInput}", try something different.
        </span>
      )}
      <CurrentWordList vocabWords={vocabWords} setVocabWords={setVocabWords} />
      <LoadMoreSearchResults
        query={searchInput}
        setVocabWords={setVocabWords}
        pg={pg}
        setPG={setPG}
        setMoreWords={setMoreWords}
        moreWords={moreWords}
      />
    </div>
  );
};

export default SearchFunction;
