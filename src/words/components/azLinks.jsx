import React, { useEffect } from "react";
import css from "../module/azLinks.module.css";
import { Link } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";

const AZLinks = ({ currCatagory, setPG, setMoreWords, catStyle, path }) => {
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

     const folderPath = path !== 'colloquialisms' ? "/words/" : "/colloquialisms/"

     const hyperLink = catStyle !== 'colloStyle' ? css.hyperLink : css.colloHyperLink;

  return (
    <div className={css.AZContainer}>
      <span className={hyperLink}>
        <Link
          className={`${cat === "a" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "a"}
        >
          A
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "b" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "b"}
        >
          B
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "c" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "c"}
        >
          C
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "d" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "d"}
        >
          D
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "e" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "e"}
        >
          E
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "f" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "f"}
        >
          F
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "g" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "g"}
        >
          G
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "h" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "h"}
        >
          H
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "i" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "i"}
        >
          I
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "j" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "j"}
        >
          J
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "k" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "k"}
        >
          K
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "l" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "l"}
        >
          L
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "m" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "m"}
        >
          M
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "n" && css.active}`}
          to={folderPath + "n"}
          onClick={(evt) => handleLinkChange(evt)}
        >
          N
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "o" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "o"}
        >
          O
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "p" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "p"}
        >
          P
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "q" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "q"}
        >
          Q
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "r" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "r"}
        >
          R
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "s" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "s"}
        >
          S
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "t" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "t"}
        >
          T
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "u" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "u"}
        >
          U
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "v" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "v"}
        >
          V
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "w" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "w"}
        >
          W
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "x" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "x"}
        >
          X
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          className={`${cat === "y" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "y"}
        >
          Y
        </Link>
      </span>
      <span className={hyperLink}>
        <Link
          style={{ borderRight: "0px" }}
          className={`${cat === "z" && css.active}`}
          onClick={(evt) => handleLinkChange(evt)}
          to={folderPath + "z"}
        >
          Z
        </Link>
      </span>
    </div>
  );
};

export default AZLinks;
