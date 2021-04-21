import { Route, Switch } from "react-router-dom";

import ChannelList from "./ChannelList/ChannelList";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Main from "./Main/Main";
import Loading from "./Loading/Loading";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ChannelList} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/main/:roomId" component={Main} />
      <Route path="/loading" component={Loading} />
      <Route path="/error" />
      <Route path="*" />
    </Switch>
  );
}

export default App;
