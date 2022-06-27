import { useContext, useEffect } from "react";
import Home from "./home";
import Login from "./login";
import CreateAccount from "./createAccount";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./pageNotFound";
import userContext from "./store/user-context";
import { useStateIfMounted } from "use-state-if-mounted";
import Logout from "./components/logout";
import CPanel from "./cpanel/cpanel";
import CPanelHomepage from "./cpanel/homepage/homepageIndex";
import VocabWords from "./words/vocabWordsIndex";
import WordsByCategory from "./words/wordsByCategory";
import VocabWordsFetch from "./words/vocabWordsFetch";
import ColloquialismFetch from "./words/colloquialismFetch";
import Colloquialism from "./words/colloquialismIndex";
import ColloquialismByCategory from "./words/colloquialismByCategory";
import SavedWords from "./savedWords/savedWords";
import Forgotpassword from "./forgotpassword/index";
import ResetPasssword from "./forgotpassword/resetpassword";

import Header from "./components/header";

function App() {
  const [loaded, setloaded] = useStateIfMounted(false);

  const userCtx = useContext(userContext);

  useEffect(() => {
    Promise.all([userCtx.VerifyLoginStatus()]).then(() => {
      setloaded(true);
    });
  }, []);

  return (
    <Router>
      <Header />
      {loaded && (
        <Routes>
          {userCtx.loginStatus && <Route path="/logout" element={<Logout />} />}
          <Route
            path="/colloquialism/:word"
            exact
            element={<ColloquialismFetch />}
          />
          <Route
            path="/colloquialisms/:cat"
            exact
            element={<ColloquialismByCategory />}
          />
          <Route
            path="/resetpassword/:key_code"
            exact
            element={<ResetPasssword />}
          />
          <Route path="/forgotpassword" exact element={<Forgotpassword />} />
          <Route path="/savedWords/" exact element={<SavedWords />} />
          <Route path="/colloquialisms" exact element={<Colloquialism />} />
          <Route path="/word/:word" exact element={<VocabWordsFetch />} />
          <Route path="/words/:cat" exact element={<WordsByCategory />} />
          <Route path="/words/" exact element={<VocabWords />} />
          {userCtx.permissions >= 2 && (
            <Route path="/cpanel/" exact element={<CPanel />} />
          )}
          {userCtx.permissions >= 2 && (
            <Route path="/cpanel/homepage" exact element={<CPanelHomepage />} />
          )}
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
