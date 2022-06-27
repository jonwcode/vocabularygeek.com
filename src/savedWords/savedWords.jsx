import React, { useEffect, useContext, useRef } from "react";
import css from "./module/savedWords.module.css";
import Card from "../components/Card";
import SavedWordList from "./savedWordList";
import { useStateIfMounted } from "use-state-if-mounted";
import userContext from "../store/user-context";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const SavedWords = () => {
  const [savedWords, setSavedWords] = useStateIfMounted([]);
  const [loading, setLoading] = useStateIfMounted(false);
  const [moreWords, setMoreWords] = useStateIfMounted(true);
  const [pg, setPG] = useStateIfMounted(2);

  const phrase = useRef("false");

  const Navigate = useNavigate();

  const userCtx = useContext(userContext);

  useEffect(async () => {
    if (document.body.style) {
      document.body.removeAttribute("style");
    }

    setLoading(true);

    if (userCtx.loginStatus === null) {
      Navigate("/");
    }

    window.scrollTo(0, 0);

    const req = await fetch("/server/savedWords.php?phrase=false&pg=1");

    const response = await req.json();

    if (response.length <= 24) {
      setMoreWords(false);
    }

    setSavedWords(response);

    setLoading(false);
  }, []);

  const toggleWords = async (evt) => {
    // Toggle between phrases and vocabulary words

    // V = Vocabulary
    // C = Phrases

    if (!evt.target.classList.contains(`${css.wordTypeRowCurr}`)) {
      // Remove any existing classes that were already there

      setLoading(true);

      document
        .getElementsByClassName(`${css.wordTypeRowCurr}`)[0]
        .classList.remove(`${css.wordTypeRowCurr}`);
      // Add a class to the element that was clicked on

      evt.target.classList.add(`${css.wordTypeRowCurr}`);

      // Now we need to grab the data based on
      // We catorgorie they clicked on

      phrase.current = evt.target.dataset.phrase;

      const req = await fetch(
        "/server/savedWords.php?phrase=" + phrase.current + "&pg=1"
      );

      const response = await req.json();

      console.log(response);

      setSavedWords(response);

      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);

    setPG((prevPg) => prevPg + 1);

    const req = await fetch(
      "/server/savedWords.php?pg=" + pg + "&phrase=" + phrase.current
    );

    const response = await req.json();

    if (response.length === 0) {
      setMoreWords(false);
    }
    setSavedWords((prevWords) => {
      return [...prevWords, ...response];
    });

    setLoading(false);
  };

  return (
    <Card>
      <Helmet>
        <title>Vocabulary Geek - Saved Words</title>
      </Helmet>
      <div className={css.container}>
        <span className={css.headerText}>Saved Words</span>

        <div className={css.wordType}>
          <span
            onClick={(evt) => toggleWords(evt)}
            data-phrase="false"
            className={`${css.wordTypeRow} ${css.wordTypeRowCurr}`}
          >
            Vocabulary Words
          </span>
          <span
            onClick={(evt) => toggleWords(evt)}
            data-phrase="true"
            className={css.wordTypeRow}
          >
            Colloquialism
          </span>
        </div>
        {loading && <span className={css.loading}>Loading...</span>}
        <SavedWordList savedWords={savedWords} />
        {moreWords ? (
          <button className={css.loadMoreWordsBtn} onClick={loadMore}>
            <span>Load More</span>
          </button>
        ) : (
          <span className={css.noMoreWords}>
            <span>No more words to be loaded</span>
          </span>
        )}
      </div>
    </Card>
  );
};

export default SavedWords;
