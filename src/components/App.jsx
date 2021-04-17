import { Route, Switch } from "react-router-dom";

import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Main from "../components/Main/Main";

function App() {
  return (
    <Switch>
      <Route exact path="/" />
      <Route path="/login"  component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/main" component={Main} />
      <Route path="/error" />
      <Route path="*" />
    </Switch>
  );
}

export default App;
