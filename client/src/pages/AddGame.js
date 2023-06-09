import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { TbShoppingCartPlus } from "react-icons/tb";
import ShoppingCart from "../pages/ShoppingCart";
import SecondHeader from "../components/SecondHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddGame() {
  const baseURL = "http://localhost:3001/api";
  const [games, setAllGames] = useState([]);
  const [genres, setAllGenres] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGameName, setSelectedGameName] = useState("");
  const [selectedGamePrice, setSelectedGamePrice] = useState("");
  const [selectedDescription, setSelectedDesription] = useState("");
  const [selectedGameImage, setSelectedGameImage] = useState("");

  const loadAllGames = async () => {
    const response = await fetch(baseURL + "/readAllGames", {
      method: "GET",
    });
    const data = await response.json();
    setAllGames(data.message);
  };

  const addNewGame = async () => {
    if (
      selectedGameName !== "" &&
      selectedGamePrice !== "" &&
      selectedGenre !== "" &&
      selectedDescription !== ""
    ) {
      const response = await fetch(baseURL + "/createGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genreId: selectedGenre,
          gameName: selectedGameName,
          gamePrice: selectedGamePrice,
          gameDescription: selectedDescription,
          gameImage: selectedGameImage,
        }),
      });

      setSelectedGameName("");
      setSelectedGamePrice("");
      setSelectedDesription("");
      setSelectedGameImage("");

      const data = await response.json();
      toast.success(`${data.message.gameName} was created`);
      loadAllGames();
    } else {
      toast.error("Game name and price is required!!");
    }
  };

  const DeleteGamesById = async (gid) => {
    try {
      const response = await fetch(`${baseURL}/deleteGame/:${gid}`, {
        method: "DELETE",
      });
      const data = await response.json();
      toast.error(data.data);
      //   loadAllGames();
    } catch (err) {
      toast.error(err.message);
    }
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
    loadAllGames();
    loadGenres();
  }, []);

  return (
    <>
      <SecondHeader />
      <Container>
        <Row>
          <Col>
            <Form>
              {/* ------ Game Name -------- */}
              <Form.Label
                style={{ color: "#fff", marginTop: 10 }}
                htmlFor="inputPassword5"
              >
                Game Name
              </Form.Label>
              <Form.Control
                type="text"
                value={selectedGameName}
                onChange={(e) => {
                  setSelectedGameName(e.target.value);
                }}
                placeholder="Game Name"
              />
              {/* ------ Game Price -------- */}
              <Form.Label
                style={{ color: "#fff", marginTop: 10 }}
                htmlFor="inputPassword5"
              >
                Game Price
              </Form.Label>
              <Form.Control
                type="text"
                value={selectedGamePrice}
                onChange={(e) => {
                  setSelectedGamePrice(e.target.value);
                }}
                placeholder="Game Price"
              />
              {/* ------ Game Genre -------- */}
              <Form.Label style={{ color: "#fff", marginTop: 10 }}>
                Game Genre
              </Form.Label>
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
              {/* ------ Game Image -------- */}
              <Form.Label
                style={{ color: "#fff", marginTop: 10 }}
                htmlFor="inputPassword5"
              >
                Game Image
              </Form.Label>
              <Form.Control
                type="text"
                value={selectedGameImage}
                onChange={(e) => {
                  setSelectedGameImage(e.target.value);
                }}
                placeholder="Game Image"
              />
              {/* ------ Game Description -------- */}
              <Form.Label
                style={{ color: "#fff", marginTop: 10 }}
                htmlFor="inputPassword5"
              >
                Game Description
              </Form.Label>
              <Form.Control
                type="text"
                value={selectedDescription}
                onChange={(e) => {
                  setSelectedDesription(e.target.value);
                }}
                placeholder="Game Name"
              />
              {/* ------ Add New Game -------- */}
              <Button
                style={{ width: "100%", marginTop: 25 }}
                variant="success"
                onClick={addNewGame}
              >
                Add New Game
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddGame;
