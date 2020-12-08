import React, { useContext } from "react";
import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
const Logo = "/logo.jpg";
import Login from "../Login";
// import "./styles.css";
import Link from "next/link";
function Header() {
  return (
    <>
      <Navbar
        style={{ backgroundColor: "var(--gray-dark)" }}
        variant="dark"
        expand="md"
      >
        <Link href="/">
          <Navbar.Brand>
            <img src={Logo} className="logo rounded" alt="logo" /> Galaxy Job
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/">
              <Nav.Link as="a">Home</Nav.Link>
            </Link>
            <Link href="/elojob?modalidade=1">
              <Nav.Link as="a">Elo Booster</Nav.Link>
            </Link>
            <Link href="/elojob?modalidade=2">
              <Nav.Link as="a">Duo Booster</Nav.Link>
            </Link>
          </Nav>
          <div className="nav navbar-nav navbar-right mr-2"></div>
        </Navbar.Collapse>
      </Navbar>
      <Login />
    </>
  );
}

export default Header;
