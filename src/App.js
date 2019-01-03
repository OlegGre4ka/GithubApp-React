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
      splashscreen: true,
      // content: false,
      searchWord: "react",
      contactPath: "!",
      id: ""
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ splashscreen: false, content: true });
    }, 3000);
  }

  getSearchData = value => {
    this.setState({ searchWord: value });
  };
  itemsForDetailed = itemsValue => {
    this.setState({ items: itemsValue });
  };

  render() {
    // if (this.state.splashscreen === true) {
    //   setTimeout(() => {
    //     this.setState({
    //       splashscreen: false
    //       //  content: true
    //     });
    //   }, 3000);

    //   return (
    //     <div className="App">
    //       <Splashscreen />
    //     </div>
    //   );
    // } else {
    return (
      <div className="App">
        {this.state.splashscreen && <Splashscreen />}
        {this.state.content && (
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
              <Router className="routerOutlet">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Repositories
                        searchWord={this.state.searchWord}
                        itemsForDetailed={this.itemsForDetailed}
                      />
                    )}
                  />
                  {/* <Route path="/contacts" render={() => <Contacts />} /> */}
                  <Route path="/contacts" component={Contacts} />
                  <Route
                    path="/:id"
                    render={() => (
                      <ReposDetailed
                        searchWord={this.state.searchWord}
                        items={this.state.items}
                        id={this.state.match}
                      />
                    )}
                  />
                  {/* < Redirect from="/:id" to="/" /> */}

                  <Route path="**" component={NotFoundPage} />
                </Switch>
              </Router>
            </main>
          </div>
        )}
      </div>
    );
  }
}

export default App;
