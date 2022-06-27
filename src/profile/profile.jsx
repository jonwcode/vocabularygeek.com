import React, { useContext } from "react";
import Card from "../components/Card";
import css from "./module/profile.module.css";
import { useParams } from "react-router-dom";
import AddNewWord from "./addNewWord";
import userContext from "../store/user-context";
import Footer from "../components/footer";

const Profile = () => {
  const { user } = useParams();

  const userCtx = useContext(userContext);

  return (
    <React.Fragment>
      <Card style={{ marginTop: "40px" }}>
        <div className={css.wrapper}>
          {userCtx.permissions >= 2 && (
            <div className={css.vocabularyWords}>
              <AddNewWord />
            </div>
          )}
          <div className={css.savedWords}>
            <span className={css.headerText}>Saved Vocabulary Words ( 0 )</span>
          </div>
        </div>
      </Card>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
