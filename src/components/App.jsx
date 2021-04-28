import { Redirect, Route, Switch } from "react-router-dom";

import ChannelList from "./ChannelList/ChannelList";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Main from "./Main/Main";
import Error from "./Error/Error";

import Loading from "./Loading/Loading";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ChannelList} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/main/:roomId" component={Main} />
      <Route path="/error" component={Error} />
      <Route path="/loading" component={Loading} />
      <Redirect
        from="/*"
        to={{
          pathname: "/error",
          state: { message: "Page Not Found!" }
        }}
      />
    </Switch>
  );
}

export default App;
