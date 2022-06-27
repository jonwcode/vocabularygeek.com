import React, { useEffect } from "react";
import Header from "./components/header";
import Card from "./components/Card";
import styled from "styled-components";
import { useStateIfMounted } from "use-state-if-mounted";
import css from "./module/home.module.css";
import Footer from "./components/footer";
import WordOfTheDay from "./wordoftheday/index";
const Home = () => {
  const [pagePost, setPagePost] = useStateIfMounted("");

  // Load the home page post

  useEffect(async () => {
    const req = await fetch("/server/grabHomePagePost.php");

    const response = await req.text();

    setPagePost(response);
  }, []);

  return (
    <div className={css.wrapper}>
      <Card style={{ marginTop: "50px", minWidth: "50%", maxWidth: "1080px" }}>
        <div
          className={css.homepagePost}
          dangerouslySetInnerHTML={{ __html: pagePost }}
        ></div>
        <WordOfTheDay />
      </Card>

      <Footer />
    </div>
  );
};

export default Home;
