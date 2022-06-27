import React, { useEffect } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";
import DisplayWord from "./components/displayWord";

const VocabWordsFetch = () => {
  const [word, setWord] = useStateIfMounted({
    name: "",
    description: "",
    type: "",
    visable: false,
  });

  const [loading, setLoading] = useStateIfMounted(false);
  const params = useParams();

  useEffect(async () => {
    setLoading(true);
    const req = await fetch("/server/grabWord.php?word=" + params.word);

    const response = await req.json();

    if (response.response === true) {
      setWord({ ...response, visable: "true" });
    } else {
      setWord((prev) => {
        return { ...prev, visable: "false" };
      });
    }
    setLoading(false);
  }, []);

  return (
    <Card style={{ marginTop: "50px" }}>
      {loading && (
        <span style={{ margin: "auto", fontSize: "1rem" }}>Loading...</span>
      )}
      {word.visable === "true" && loading === false && (
        <DisplayWord
          name={word.name}
          description={word.description}
          type={word.type}
        />
      )}
      {word.visable === "false" && loading === false && (
        <h2>Currently there isn't a word to be shown</h2>
      )}
    </Card>
  );
};

export default VocabWordsFetch;
