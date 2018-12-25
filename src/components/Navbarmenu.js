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
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { FaSistrix } from "react-icons/fa";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logoGitNavbar from "../assets/github-logo-24.png";
import "./navbarmenu.scss";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      inputWord: 'react'
    };
    this.searchRepos = this.searchRepos.bind(this)
  }
  searchRepos (searchChart) {
    this.setState({
      inputWord: searchChart.target.value
    });
    console.log(this.state.inputWord,'input data from search')
    // this.props.getSearchData(this.state.inputWord)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    // const {getSearchData} = this.props;
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
              <NavLink href="/">Repositories</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contacts">My Contacts</NavLink>
            </NavItem>
            <NavItem className="inputSearch">
              <InputGroupAddon addonType="append" size="normal">
                <Input placeholder="Search..." 
                 value={this.state.inputWord}
                //  onClick={this.props.getSearchData(this.state.inputWord)}
                //  onClick={getSearchData('basic-express')}
onChange={this.searchRepos}

          // eslint-disable-next-line react/jsx-no-duplicate-props
          // onClick={this.searchRepos}
          />
                <InputGroupText>
                  <FaSistrix />
                </InputGroupText>
              </InputGroupAddon>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
