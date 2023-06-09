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

  const addNewGame = async () => {
    if (
      selectedGameName !== "" &&
      selectedGamePrice !== "" &&
      selectedGenre !== ""
    ) {
      const response = await fetch(baseURL + "/createGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          generId: selectedGenre,
          gameName: selectedGameName,
          gamePrice: selectedGamePrice,
          gameDesc: selectedDescription,
          gameImage: selectedGameImage,
        }),
      });

      setSelectedGameName("");

      const data = await response.json();
      toast.success(`${data.message.gameName} was created`);
      //   loadAllGames();
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

  return (
    <>
      <SecondHeader />
    </>
  );
}

export default AddGame;
