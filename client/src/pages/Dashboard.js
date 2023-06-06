import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
  Table,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { FcPlus, FcEditImage } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import RowEdit from "../components/RowEdit";
import { NavLink } from "react-router-dom";
import { VscChevronRight } from "react-icons/vsc";
import axios from "axios";
import GameItems from "../components/GameItems";
import Alert from "react-bootstrap/Alert";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = (props) => {
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

  const loadGenres = async () => {
    const response = await fetch(baseURL + "/readAllGenres", {
      method: "GET",
    });
    const data = await response.json();
    setAllGenres(data.message);
  };

  useEffect(() => {
    loadAllGames();
    loadGenres();
  }, []);

  const DeleteGamesById = async (gid) => {
    try {
      const response = await fetch(`${baseURL}/deleteGame/:${gid}`, {
        method: "DELETE",
      });
      const data = await response.json();
      toast.error(data.data);
      loadAllGames();
    } catch (err) {
      toast.error(err.message);
    }
  };

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
      loadAllGames();
    } else {
      toast.error("Game name and price is required!!");
    }
  };

  return (
    <Container>
      <Header />
      <ToastContainer />

      <Row>
        <Col></Col>
      </Row>

      <Row style={{ marginTop: 100 }}>
        <Col xl={12} xs={12}>
          <Row>
            {games.length > 0 ? (
              games.map((item) => (
                <Col xl={3}>
                  <GameItems
                    DeleteGameClick={() => {
                      {
                        DeleteGamesById(item._id);
                      }
                    }}
                    game={item}
                  />
                </Col>
              ))
            ) : (
              <p>NO GAMES</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
