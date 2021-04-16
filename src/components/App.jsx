import { Route, Switch } from "react-router-dom";

import Main from "../components/Main/Main";
import Login from "./Login/Login";

function App() {
  return (
    <Switch>
      <Route exact path="/" />
      <Route path="/login"  component={Login} />
      <Route path="/signup" />
      <Route path="/main" component={Main} />
      <Route path="/error" />
      <Route path="*" />
    </Switch>
  );
}

export default App;
