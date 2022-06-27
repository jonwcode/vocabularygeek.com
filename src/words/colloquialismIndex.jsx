import React, { useEffect } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import css from "./module/colloquialismIndex.module.css";
import AZLinks from "./components/azLinks";
import { useStateIfMounted } from "use-state-if-mounted";
import Footer from "../components/footer";
import WordList from "./components/wordList";

const Index = () => {
  const params = useParams();

  const [words, setWords] = useStateIfMounted([]);
  const [loading, setLoading] = useStateIfMounted(false);
  const [pg, setPG] = useStateIfMounted(2);
  const [moreWords, setMoreWords] = useStateIfMounted(true);

  useEffect(async () => {
    setLoading(true);

    const req = await fetch("/server/colloquialismIndex.php?pg=1");

    const response = await req.json();

    if (response.length <= 24) {
      setMoreWords(false);
    }

    setWords((prevWords) => {
      return [...prevWords, ...response];
    });

    setLoading(false);
  }, []);

  const loadMore = async () => {
    setLoading(true);

    setPG((prevPg) => prevPg + 1);

    const req = await fetch("/server/colloquialismIndex.php?pg=" + pg);

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
        <span className={css.textHeader}>Colloquialism</span>
        <h2>Choose from the list of the words A-Z</h2>
        <AZLinks setPG={setPG} setMoreWords={setMoreWords} catStyle="colloStyle" path="colloquialisms" />
        <WordList words={words} listStyle="colloStyle" path="/colloquialism/" />
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

export default Index;
