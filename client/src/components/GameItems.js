import React from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

function GameItems(props) {
  return (
    <Card style={{ marginTop: 10 }}>
      <Card.Img
        style={{ width: "100%", height: 400 }}
        variant="top"
        src={props.game.gameImage}
      />
      <Card.Body>
        <Card.Title>{props.game.gameName}</Card.Title>
        <Card.Text>${props.game.gamePrice}</Card.Text>
        <Container>
          <Row>
            <NavLink to={`/game/${props.game._id}`}>
              <Button>View Details</Button>
            </NavLink>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default GameItems;
