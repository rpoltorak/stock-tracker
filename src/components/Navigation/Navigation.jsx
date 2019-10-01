import React from "react";
import { Link } from "@reach/router";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand>Stock Tracker</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link className="nav-link" to="/new">
          Track new company
        </Link>
        <Link className="nav-link" to="/">
          Companies
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export { Navigation };
