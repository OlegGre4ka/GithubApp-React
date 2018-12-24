import React from "react";
// import React, { Component } from 'react';
import Splashscreen from "./components/Splashscreen";
import Navbarmenu from "./components/Navbarmenu";

import logoReact from "./logo.svg";
import "./App.scss";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import repositories from "./components/Repositories";
import contacts from "./components/Contacts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { splashscreen: true, content: false };
  }
  componentDidMount() {
    console.log("componentDidMount()");
    setTimeout(() => {
      this.setState({ splashscreen: false, content: true });
    }, 3000);
  }

  render() {
    return (
      <div className="App">
        {this.state.splashscreen && <Splashscreen />}
        {this.state.content && (
          <div>
            <Navbarmenu />
            <img src={logoReact} width={100} className="App-logo" alt="logo" />

            <header className="App-header">
            {/* <img src={logoReact} width={100} className="App-logo" alt="logo" /> */}

              <Router>
                <Switch>
                  <Route exact path="/" component={repositories} />
                  <Route path="/contacts" component={contacts} />
                </Switch>
              </Router>
              {/* <img src={logoReact} width={100} className="App-logo" alt="logo" /> */}

              {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
            </header>
          </div>
        )}
      </div>
    );
  }

  componentWillUnmount() {
    console.log("componentWillUnmount()");
  }
}

export default App;
