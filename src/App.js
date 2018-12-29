import React from "react";
// import React, { Component } from 'react';
import Splashscreen from "./components/Splashscreen/Splashscreen";
import Navbarmenu from "./components/Navbarmenu";

import logoReact from "./logo.svg";
import "./App.scss";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Repositories from "./components/Repositories";
import contacts from "./components/Contacts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      splashscreen: true, 
      content: false,
      searchWord: '' 
    };
  }
  componentDidMount() {
    console.log("componentDidMount()");
 setTimeout(() => {

      this.setState({ splashscreen: false, content: true });
    }, 3000);
    this.getSearchData();
  }

  getSearchData = (value) => {
    console.log(value,'getSearchData from Navbar');
    this.setState({ searchWord: value });
    console.log(this.state.searchWord, 'searchWord in App from Nav,ar in this.state')
 }
  render() {
   console.log(this.state.searchWord,'in render from state in AppComponent')
    return (
      <div className="App">
        {this.state.splashscreen && <Splashscreen />}
        {this.state.content && (
          //short syntaxis <React.Fragment>
          <div>
            {/* <Navbarmenu /> */}
            <Navbarmenu getSearchData={this.getSearchData}/>

            <img src={logoReact} width={100} className="App-logo" alt="logo" />

            <main className="App-main">

              <Router>
                <Switch>
                  {/* <Route exact path="/" component={repositories} /> */}
                  <Route exact path="/" render={()=><Repositories  searchWord={this.state.searchWord}/>} />
                  {/* <Route exact path="/" render={()=><Repositories searchWord={()=>this.getSearchData}/>} /> */}


                  
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
