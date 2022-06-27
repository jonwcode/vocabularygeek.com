import React, { useEffect } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";
import DisplayWord from "./components/displayWord";
import Footer from "../components/footer";

const VocabWordsFetch = ({ wordName }) => {
  const [word, setWord] = useStateIfMounted({
    name: "",
    description: "",
    type: "",
    visable: false,
  });

  const [loading, setLoading] = useStateIfMounted(false);
  const params = useParams();

  useEffect(async () => {
    console.log(wordName);

    window.scrollTo(0, 0);

    const paramsData = !wordName ? params.word : wordName;

    setLoading(true);
    const req = await fetch("/server/grabWord.php?word=" + paramsData);

    const response = await req.json();

    if (response.response === true) {
      setWord({ ...response, visable: "true" });
    } else {
      setWord((prev) => {
        return { ...prev, visable: "false" };
      });
    }

    console.log(response.saved, "fetch");

    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <Card style={{ marginTop: "50px" }}>
        {loading && (
          <span style={{ margin: "auto", fontSize: "1rem" }}>Loading...</span>
        )}
        {word.visable === "true" && loading === false && (
          <DisplayWord
            name={word.name}
            description={word.description}
            type={word.type}
            date={word.date}
            saved={word.saved}
          />
        )}
        {word.visable === "false" && loading === false && (
          <h2>Currently there isn't a word to be shown</h2>
        )}
      </Card>
      <Footer />
    </React.Fragment>
  );
};

export default VocabWordsFetch;
