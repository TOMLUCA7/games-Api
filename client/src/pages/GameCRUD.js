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
import { ToastContainer, toast } from "react-toastify";

import SecondHeader from "../components/SecondHeader";
import GameItems from "../components/GameItems";

function GameCRUD() {
  const baseURL = "http://localhost:3001/api";
  const [games, setAllGames] = useState([]);

  const loadAllGames = async () => {
    const response = await fetch(baseURL + "/readAllGames", {
      method: "GET",
    });
    const data = await response.json();
    setAllGames(data.message);
  };

  useEffect(() => {
    loadAllGames();
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

  return (
    <>
      <SecondHeader />
      <Container>
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
              <h1 style={{ color: "#fff" }}>YOU HAVE NO GAMES !</h1>
            )}
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default GameCRUD;
