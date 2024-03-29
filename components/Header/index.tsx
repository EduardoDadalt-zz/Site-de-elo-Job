import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";
import fire from "../../config/fire";
import { Auth } from "../../context/auth";
import Login from "../Login";
function Header() {
  const { openLoginWindow, user } = useContext(Auth);
  const router = useRouter();
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
            <span className="ml-2">Galaxy Job</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* {JSON.stringify(router)} */}
            {["Elo Booster", "Duo Booster", "Vitórias Avulsas"].map((e, x) => (
              <Link key={e} href={"/elojob?modalidade=" + (x + 1)}>
                <Nav.Link
                  as="a"
                  active={
                    "/elojob?modalidade=" + (x + 1) === router.asPath ||
                    (x + 1 === 1 && "/elojob" === router.asPath)
                  }
                >
                  {e}
                </Nav.Link>
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
            <DropdownButton
              menuAlign="right"
              variant="outline-dark"
              title={user.displayName || ""}
              id="basic-nav-dropdown"
            >
              <Link href="/pedido">
                <Dropdown.Item as="a">Meu Pedido</Dropdown.Item>
              </Link>
              <Dropdown.Item
                as="button"
                onClick={(e) => {
                  fire.auth().signOut();
                }}
              >
                Sair
              </Dropdown.Item>
            </DropdownButton>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Login />
    </>
  );
}

export default Header;
