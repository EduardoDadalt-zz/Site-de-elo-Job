import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import "./styles.css";
function Header() {
  
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img src={Logo} className="logo" /> Galaxy Job
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/elojob?modalidade=1">
            Elo Booster
          </Nav.Link>
          <Nav.Link as={Link} to="/elojob?modalidade=2">
            Duo Booster
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
