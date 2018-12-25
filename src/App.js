import React from "react";
// import React, { Component } from 'react';
import Splashscreen from "./components/Splashscreen";
import Navbarmenu from "./components/Navbarmenu";

import logoReact from "./logo.svg";
import "./App.scss";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import repositories from "./components/Repositories";
import Repositories from "./components/Repositories";
import contacts from "./components/Contacts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      splashscreen: true, 
      content: false,
      searchWord: 'react'
    };
    // this.getSearchData = this.getSearchData.bind(this)
  }
  componentDidMount() {
    console.log("componentDidMount()");
    setTimeout(() => {
      this.setState({ splashscreen: false, content: true });
    }, 3000);
  }
//   getSearchData = (value) => {
//     console.log(value,'getSearchData from Navbar');
//     this.setState({ searchWord: value });
//  }
  render() {
    return (
      <div className="App">
        {this.state.splashscreen && <Splashscreen />}
        {this.state.content && (
          <div>
            <Navbarmenu />
            {/* <Navbarmenu getSearchData={this.getSearchData}/> */}

            <img src={logoReact} width={100} className="App-logo" alt="logo" />

            <main className="App-main">
            {/* <img src={logoReact} width={100} className="App-logo" alt="logo" /> */}

              <Router>
                <Switch>
                  {/* <Route exact path="/" component={repositories} /> */}
                  <Route exact path="/" render={()=><Repositories searchWord={this.state.searchWord}/>} />

                  
                  <Route path="/contacts" component={contacts} />
                </Switch>
              </Router>
           
            </main>
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
