import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { TbShoppingCartPlus } from "react-icons/tb";
import ShoppingCart from "../pages/ShoppingCart";

function GameItems({ game, card, setCard }) {
  return (
    <>
      <Card>
        <Card.Img
          style={{ width: "100%", height: 350 }}
          variant="top"
          src={game.gameImage}
        />
        <Card.Body>
          <Card.Title>{game.gameName}</Card.Title>
          <Card.Text>${game.gamePrice}</Card.Text>
          <Container>
            <Row>
              {/* ניווט לעמוד פרטים לפי האיי די של כול מישחק */}
              <NavLink to={`/game/${game._id}`}>
                <Button style={{ width: "100%" }}>View Details</Button>
              </NavLink>

              {card && setCard && (
                <Button
                  variant="info"
                  style={{ marginTop: 10, color: "#fff" }}
                  game={game}
                  onClick={() => {
                    if (setCard && card) setCard([...card, game]);
                  }}
                >
                  Add To <TbShoppingCartPlus size={22} color="#fff" />
                </Button>
              )}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}

export default GameItems;
