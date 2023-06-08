import React, { useState } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { TbShoppingCartPlus } from "react-icons/tb";

function GameItems({ game, handleClick }) {
  const [cartItems, setCartItems] = useState([]);

  return (
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
            <NavLink to={`/game/${game._id}`}>
              <Button style={{ width: "100%" }}>View Details</Button>
            </NavLink>
            <Button
              style={{ marginTop: 10 }}
              onClick={() => game.handleClick(game)}
            >
              Add To <TbShoppingCartPlus size={22} color="#fff" />
            </Button>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default GameItems;
