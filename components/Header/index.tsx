import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import fire from "../../config/fire";
import { Auth } from "../../context/auth";
import Login from "../Login";
function Header() {
  const { openLoginWindow, user } = useContext(Auth);

  return (
    <>
      <Navbar variant="light" expand="sm">
        <Link href="/">
          <Navbar.Brand className="d-flex justify-content-center align-items-center">
            <Image
              src="/logo.jpg"
              height={40}
              width={40}
              // layout="responsive"
              className="rounded"
              alt="logo"
            />
            <Navbar.Text>Galaxy Job</Navbar.Text>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/">
              <Nav.Link as="a">Home</Nav.Link>
            </Link>
            {["Elo Booster", "Duo Booster", "Vitórias Avulsas"].map((e, x) => (
              <Link key={e} href={"/elojob?modalidade=" + (x + 1)}>
                <Nav.Link as="a">{e}</Nav.Link>
              </Link>
            ))}
          </Nav>
          <div className="nav navbar-nav navbar-right mr-2"></div>
          {!!!user ? (
            <Form inline>
              <Button
                variant="outline-dark"
                onClick={(e) => {
                  openLoginWindow();
                }}
              >
                Entrar
              </Button>
            </Form>
          ) : (
            <NavDropdown
              className="btn btn-outline-dark p-0"
              title={user.displayName}
              id="basic-nav-dropdown"
            >
              <Link href="/pedido">
                <NavDropdown.Item as="a">Meu Pedido</NavDropdown.Item>
              </Link>
              <NavDropdown.Item
                as="button"
                onClick={(e) => {
                  fire.auth().signOut();
                }}
              >
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Login />
    </>
  );
}

export default Header;
