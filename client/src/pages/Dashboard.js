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

const Dashboard = (props) => {
  const baseURL = "http://localhost:3001/api";
  const [games, setAllGames] = useState([]);
  const [genres, setAllGenres] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGameName, setSelectedGameName] = useState("");
  const [selectedGamePrice, setSelectedGamePrice] = useState("");
  const [selectedDescription, setSelectedDesription] = useState("");
  const [selectedGameImage, setSelectedGameImage] = useState("");
  const [card, setCard] = useState([]);

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

  return (
    <>
      <Header card={card} />
      <Container>
        <ToastContainer />
        <Row style={{ marginTop: 90 }}>
          <Col xl={12} xs={12}>
            <Row>
              {games.length > 0 ? (
                games.map((item) => (
                  <Col xl={3}>
                    <GameItems game={item} card={card} setCard={setCard} />
                  </Col>
                ))
              ) : (
                <h1 style={{ color: "#fff" }}>YOU HAVE NO GAMES !</h1>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
