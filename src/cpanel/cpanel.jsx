import React, { useContext } from "react";
import Card from "../components/Card";
import css from "./module/cpanel.module.css";
import { useParams } from "react-router-dom";
import AddNewWord from "./addNewWord";
import userContext from "../store/user-context";
import Footer from "../components/footer";
import { useStateIfMounted } from "use-state-if-mounted";
import SearchModal from "./components/searchModal";

const ControlPanel = () => {
  const { user } = useParams();

  const userCtx = useContext(userContext);
  const [searchInput, setSearchInput] = useStateIfMounted("");

  return (
    <React.Fragment>
      <Card style={{ marginTop: "40px" }}>
        <div className={css.wrapper}>
          {userCtx.permissions >= 2 && searchInput === "" && (
            <div className={css.vocabularyWords}>
              <AddNewWord
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>
          )}
          {searchInput.length >= 1 && (
            <SearchModal
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          )}
        </div>
      </Card>
      <Footer />
    </React.Fragment>
  );
};

export default ControlPanel;
