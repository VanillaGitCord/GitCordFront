import { Route, Switch } from "react-router-dom";

import Main from "../components/Main/Main";

function App() {
  return (
    <Route>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" />
        <Route path="/signup" />
        <Route path="/main" component={Main} />
        <Route path="/error" />
        <Route path="*" />
      </Switch>
    </Route>
  );
}

export default App;
