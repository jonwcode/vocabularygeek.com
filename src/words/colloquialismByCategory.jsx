import React, { useEffect } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import AZLinks from "./components/azLinks";
import css from "./module/colloquialismsByCatagory.module.css";
import { useStateIfMounted } from "use-state-if-mounted";
import WordList from "./components/wordList";
import Footer from "../components/footer";

const VocabWordsFetch = () => {
  const params = useParams();

  const [words, setWords] = useStateIfMounted([]);
  const [loading, setLoading] = useStateIfMounted(false);
  const [pg, setPG] = useStateIfMounted(2);
  const [moreWords, setMoreWords] = useStateIfMounted(true);

  useEffect(async () => {
    setLoading(true);
    setWords([]);

    const req = await fetch(
      "/server/colloqualismByCatagory.php?letter=" + params.cat + "&pg=" + 1
    );

    const response = await req.json();

    if (response.length <= 24) {
      setMoreWords(false);
    }

    setWords((prevWords) => {
      return [...prevWords, ...response];
    });

    setLoading(false);
  }, [params.cat]);

  const loadMore = async () => {
    setLoading(true);

    setPG((prevPg) => prevPg + 1);

    const req = await fetch(
      "/server/wordsByCatagory.php?letter=" + params.cat + "&pg=" + pg
    );

    const response = await req.json();

    if (response.length === 0) {
      setMoreWords(false);
    }
    setWords((prevWords) => {
      return [...prevWords, ...response];
    });

    setLoading(false);
  };

  return (
    <React.Fragment>
      <Card style={{ marginTop: "50px", minWidth: "50%", maxWidth: "1080px" }}>
        <span className={css.catagoryHeader}>Catagory: {params.cat}</span>
        <AZLinks
          currCatagory={params}
          setPG={setPG}
          setMoreWords={setMoreWords}
          catStyle="colloStyle" path="colloquialisms"
        />
        {words.length > 0 && <WordList words={words} listStyle="colloStyle"/>}
        {words.length === 0 && !loading && (
          <span className={css.noWords}>Currently there is no words yet.</span>
        )}
        {loading && <span className={css.loading}>Loading...</span>}
        {moreWords ? (
          <button className={css.loadMoreWordsBtn} onClick={loadMore}>
            <span>Load More</span>
          </button>
        ) : (
          <span className={css.noMoreWords}>
            <span>No more words to be loaded</span>
          </span>
        )}
      </Card>
      <Footer />
    </React.Fragment>
  );
};

export default VocabWordsFetch;
