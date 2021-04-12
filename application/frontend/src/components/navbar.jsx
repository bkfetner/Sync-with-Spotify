import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="bg-dark-sync" fixed="top">
        <Navbar.Brand href="/">Sync</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Create">Create</Nav.Link>
          <Nav.Link href="/Join">Join</Nav.Link>
          <Nav.Link href="/Room">Room</Nav.Link>
          <Nav.Link href="/Contact">Contact us</Nav.Link>
          <Nav.Link href="/Aboutus">About us</Nav.Link>
        </Nav>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            signed in as, <Link href="#login">User Name</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ marginTop: "50px" }}></div>
    </div>
  );
};

export default NavBar;
