import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";
import Splashscreen from "./components/Splashscreen/Splashscreen";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Splashscreen} />
      <Route path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
