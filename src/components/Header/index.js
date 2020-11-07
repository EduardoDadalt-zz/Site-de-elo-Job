import React, { useContext } from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import Auth from "../../context/auth";
import "./styles.css";
function Header() {
  const { isLoggin, SingOut } = useContext(Auth);
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img src={Logo} className="logo" alt="logo" /> Galaxy Job
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
          <Nav.Link as={Link} to="elojob?modalidade=2">
            Duo Booster
          </Nav.Link>
          {isLoggin === false && (
            <Button
              className="btn btn-outline-light float-right"
              as={Link}
              to="/login"
            >
              Sing In
            </Button>
          )}
          {isLoggin === true && (
            <NavDropdown
              title="Dropdown"
              className="float-right"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item>Meu Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={SingOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
