import React from "react";
// import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { FaSistrix } from "react-icons/fa";
import Splashscreen from "./components/Splashscreen/Splashscreen";
import Navbarmenu from "./components/Navbarmenu";

import logoReact from "./logo.svg";
import "./App.scss";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import Repositories from "./components/Repositories";
import ReposDetailed from "./components/ReposDetailed";
import Contacts from "./components/Contacts";
import NotFoundPage from "./components/NotFoundPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "react",
      contactPath: "!",
      id: ""
    };
  }
  // componentDidMount() {

  // }

  getSearchData = value => {
    this.setState({ searchWord: value });
  };
  itemsForDetailed = itemsValue => {
    this.setState({ items: itemsValue });
  };

  render() {
    return (
      <div className="App">
        <div>
          <Navbarmenu
            getSearchData={this.getSearchData}
            contactPath={this.state.contactPath}
          />
          <div className="Row row">
            <div className="col-lg-1">
              <img
                src={logoReact}
                width={100}
                className="App-logo"
                alt="logo"
              />
            </div>
          </div>
          <main className="App-main">
            <Switch>
              <Route
                path="/repositories"
                exact
                render={() => (
                  <Repositories
                    searchWord={this.state.searchWord}
                    itemsForDetailed={this.itemsForDetailed}
                  />
                )}
              />
              <Route path="/contacts" render={() => <Contacts />} />
              {/* <Route path="app/contacts" component={Contacts} /> */}
              <Route
                path="/repositories/:id"
                render={() => (
                  <ReposDetailed
                    searchWord={this.state.searchWord}
                    items={this.state.items}
                    id={this.state.match}
                  />
                )}
              />

              <Route path="**" component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
