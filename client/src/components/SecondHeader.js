import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Button,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiLogout } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import GameDetails from "../pages/GameDetails";

function SecondHeader() {
  const baseURL = "http://localhost:3001/api";
  const navigate = useNavigate();
  const location = useLocation();
  const [priceRange, setPriceRange] = useState("");
  const [search, setSearch] = useState("");
  const [genres, setAllGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img src="../../logo.png" style={{ width: 140 }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default SecondHeader;
