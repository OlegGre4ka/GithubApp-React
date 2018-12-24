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
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logoGitNavbar from '../assets/github-logo-24.png';
import './navbarmenu.scss';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <Navbar className="Navbar"
          color=""
          style={{ backgroundColor: "rgb(1, 228, 228)" }}
          light
          expand="md"
        >
          <NavbarBrand href="/" className="NavbarBrand">
        <img src={logoGitNavbar} className="Logo-GitNavbar" alt="logoGitCat" />
          
          GithubApp-React
          
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="/">Repositories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contacts">My Contacts</NavLink>
              </NavItem>
              <NavItem>
                <Input placeholder="Search..." />
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}
