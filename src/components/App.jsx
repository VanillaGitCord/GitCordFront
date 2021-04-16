import { Route, Switch } from "react-router";

import Login from "./Login/Login";

function App() {
  return (
    <Switch>
      <Route exact path="/" />
      <Route path="/login" component={Login} />
      <Route path="/signUp" />
      <Route path="/main" />
      <Route path="/error" />
      <Route path="*" />
    </Switch>
  );
}

export default App;
