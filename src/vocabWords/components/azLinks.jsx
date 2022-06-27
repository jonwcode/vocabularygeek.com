import React, { useEffect } from "react";
import css from "../module/azLinks.module.css";
import { Link } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";

const AZLinks = ({ currCatagory, setPG, setMoreWords }) => {
  const [prevEvtTarget, setEvtTarget] = useStateIfMounted();
  const [cat, setCat] = useStateIfMounted(null);

  useEffect(() => {
    setCat(currCatagory ? currCatagory.cat : "");
  }, [currCatagory]);

  const handleLinkChange = (evt) => {
    setMoreWords(true);
    setPG(2);

    if (prevEvtTarget) {
      prevEvtTarget.classList.remove(`${css.active}`);
    }

    setEvtTarget(evt.target);

    evt.target.classList.add(`${css.active}`);
  };

  return (
    <div className={css.AZContainer}>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "a" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/a"
        >
          A
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "b" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/b"
        >
          B
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "c" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/c"
        >
          C
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "d" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/d"
        >
          D
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "e" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/e"
        >
          E
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "f" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/f"
        >
          F
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "g" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/g"
        >
          G
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "h" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/h"
        >
          H
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "i" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/i"
        >
          I
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "j" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/j"
        >
          J
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "k" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/k"
        >
          K
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "l" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/l"
        >
          L
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "m" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/m"
        >
          M
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "n" && css.active}`}
          to="/words/n"
          onClick={(evt) => handleLinkChange(evt)}
        >
          N
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "o" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/o"
        >
          O
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "p" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/p"
        >
          P
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "q" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/q"
        >
          Q
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "r" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/r"
        >
          R
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "s" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/s"
        >
          S
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "t" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/t"
        >
          T
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "u" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/u"
        >
          U
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "v" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/v"
        >
          V
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "w" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/w"
        >
          W
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "x" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/x"
        >
          X
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          className={`${cat === "y" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/y"
        >
          Y
        </Link>
      </span>
      <span className={css.hyperLink}>
        <Link
          style={{ borderRight: "0px" }}
          className={`${cat === "z" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to="/words/z"
        >
          Z
        </Link>
      </span>
    </div>
  );
};

export default AZLinks;
