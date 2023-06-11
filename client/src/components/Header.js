import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiLogout } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";

const Header = ({ card }) => {
  const baseURL = "http://localhost:3001/api";
  const navigate = useNavigate();

  // מאפשר לגשת לאובייקט המיקום הנוכחי ברכיבים הפונקציונליים שלך
  const location = useLocation();
  const [priceRange, setPriceRange] = useState("");
  const [search, setSearch] = useState("");
  const [genres, setAllGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isItDashBoard, setisItDashBoard] = useState(false);

  const handleFilter = async () => {
    // המאפשר מניפולציה של פרמטרי השאילתה של כתובת URL.
    const queryParams = new URLSearchParams();

    // אם SelectGenre זמין (לא null או לא מוגדר), הוא מוסיף פרמטר שאילתה לאובייקט URLSearchParams עם המפתח "genreId" והערך של selectedGenre. זה נעשה באמצעות שיטת set() של האובייקט URLSearchParams.
    if (selectedGenre) {
      queryParams.set("genreId", selectedGenre);
    }

    // המשתנה searchUrl נבנה על ידי שילוב של כתובת האתר הבסיסית (baseURL) עם פרמטרי השאילתה מהאובייקט URLSearchParams. זה נעשה באמצעות שיטת toString() של האובייקט URLSearchParams.
    const searchUrl = `${baseURL}/searchAllGames?${queryParams.toString()}`;

    try {
      const response = await fetch(searchUrl, {
        method: "GET",
      });
      const data = await response.json();
      setSearchResults(data.message);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    // לבסוף, הפונקציה navigate() נקראת כדי לנווט למיקום חדש. המיקום החדש נבנה על ידי הוספת פרמטרי השאילתה מהאובייקט URLSearchParams ל-location.pathname הנוכחי.
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const loadGenres = async () => {
    try {
      const response = await fetch(`${baseURL}/readAllGenres`, {
        method: "GET",
      });
      const data = await response.json();
      setAllGenres(data.message);
    } catch (error) {
      console.error("Error loading genres:", error);
    }
  };

  useEffect(() => {
    loadGenres();
    // handleFilter();
  }, []);

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
              <Nav.Link style={{ color: "#000" }} href="/dashboard">
                Home
              </Nav.Link>
              <Nav.Link style={{ color: "#000" }} href="/AddGame">
                Add Game To Shop
              </Nav.Link>
              <NavLink
                style={{ marginTop: 5 }}
                to="/ShoppingCart"
                state={{ card: card }}
              >
                <AiOutlineShoppingCart size={30} color="#000000" />
              </NavLink>
            </Nav>

            <Form className="d-flex">
              <Form.Select
                className="me-2"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option>All Genres</option>
                {genres.length > 0 &&
                  genres.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.genreName}
                    </option>
                  ))}
              </Form.Select>
              <Button
                className="ms-2"
                variant="outline-primary"
                onClick={handleFilter}
              >
                Search
              </Button>
            </Form>
            <Button
              style={{ marginLeft: 10 }}
              onClick={logout}
              variant="outline-danger"
            >
              <CiLogout size={22} />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ marginTop: 10, marginLeft: "3%" }}>
        {searchResults && searchResults.length > 0 ? (
          <div>
            {searchResults.map((game) => (
              <div key={game._id}>
                <h4 style={{ color: "#D64933" }}>{game.gameName}</h4>
                <p style={{ color: "#F1A208" }}>
                  Genre: {game.genreId.genreName}
                </p>
                <p style={{ color: "#fff" }}>Price: {game.gamePrice} $</p>
                <img
                  src={game.gameImage}
                  style={{
                    width: "10%",
                    height: "10%",
                    borderRadius: 20,
                    marginBottom: 15,
                  }}
                  alt="Game Image"
                />
              </div>
            ))}
          </div>
        ) : (
          <span style={{ color: "#fff" }}></span>
        )}
      </div>
    </>
  );
};

export default Header;
