import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";
import { FaSistrix } from "react-icons/fa";
import { BrowserRouter as Router, Route,  NavLink as RRNavLink, Switch } from "react-router-dom";
import logoGitNavbar from "../assets/github-logo-24.png";
import "./navbarmenu.scss";

export default class Example extends React.Component {
  
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      inputWord: "",
      inputField: true
    };
  }
  // componentDidMount() {
    
  // }
  onSearchInputChange = event => {
    this.setState({
      inputWord: event.target.value
    });
  };
  onSearchInputClick() {
    this.props.getSearchData(this.state.inputWord);
    this.setState({
      inputWord: ""
    });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar
        className="Navbar"
        color=""
        style={{ backgroundColor: "rgb(1, 228, 228)" }}
        light
        expand="md"
      >
        <NavbarBrand href="/" className="NavbarBrand">
          <img
            src={logoGitNavbar}
            className="Logo-GitNavbar"
            alt="logoGitCat"
          />
          GithubApp-React
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse className="Collapse" isOpen={this.state.isOpen} navbar>
          <Nav className="Nav ml-auto" navbar>
            <NavItem>
              <NavLink exact to="/repositories" tag={RRNavLink} activeStyle={{color:"green"}}>Repositories</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contacts" tag={RRNavLink} activeStyle={{color:"green"}}>My Contacts</NavLink>
            </NavItem>
            {/* над цим треба ще попрацювати - поле інпут true-false */}
            {this.state.inputField && (
              <NavItem className="inputSearch">
                <InputGroupAddon addonType="append" size="normal">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={this.state.inputWord}
                    onChange={this.onSearchInputChange}
                    onKeyPress={event => {
                      if (event.key === "Enter") {
                        this.onSearchInputClick();
                      }
                    }}
                  />
                  <InputGroupText
                    className="FaSearchIconGroup"
                    onClick={() => this.onSearchInputClick()}
                  >
                    <FaSistrix />
                  </InputGroupText>
                </InputGroupAddon>
              </NavItem>
            )}
            <NavItem>
              <NavLink
                href="https://github.com/reactstrap/reactstrap"
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

 
}
