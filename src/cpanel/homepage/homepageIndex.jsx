import React, { useEffect } from "react";
import Card from "../../components/Card";
import TopNav from "../topNav";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import css from "../module/homepageIndex.module.css";
import { useStateIfMounted } from "use-state-if-mounted";
const HomepageIndex = () => {
  const [textEditor, setTextEditor] = useStateIfMounted("");
  const [loading, setLoading] = useStateIfMounted(false);

  useEffect(async () => {
    const req = await fetch("/server/grabHomePagePost.php");

    const response = await req.text();

    setTextEditor(response);
  }, []);

  const handleChange = (evt) => {
    setTextEditor(evt.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);

    const req = fetch("/server/updateHomePage.php", {
      method: "POST",
      body: "post=" + textEditor,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    setLoading(false);
  };

  const btnText = !loading ? "Update Home Page" : "Loading...";

  return (
    <Card style={{ marginTop: "40px" }}>
      <span className={css.headerText}>Edit Home Page</span>
      <TopNav />
      <RichTextEditor onChange={handleChange} value={textEditor} />
      <button onClick={handleSubmit} className={css.submitBtn} type="submit">
        {btnText}
      </button>
    </Card>
  );
};

export default HomepageIndex;
