import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import Lottie from "lottie-web";
import SecondHeader from "../components/SecondHeader";
import { AiOutlineComment } from "react-icons/ai";

const GameDetails = () => {
  const baseURL = "http://localhost:3001/api";
  const { id } = useParams(); //  לוקח את האיי די של אותו משחק
  const [gameDetails, setGameDetails] = useState(null);
  const container = useRef(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/readGameById/${id}`);
        const data = await response.json();
        setGameDetails(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGameDetails();
  }, [id]);

  // useEffect(() => {
  //   Lottie.loadAnimation({
  //     container: container.current, // the dom element that will contain the animation
  //     renderer: "svg",
  //     loop: true,
  //     autoplay: true,
  //     animationData: require("../images/118264-teenager-playing-video-games.json"),
  //   });
  // }, []);

  if (!gameDetails) {
    return (
      <div
        // style={{
        //   width: "100%",
        //   height: "100%",
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "center",
        // }}
        // ref={container}
        style={{ color: "#fff" }}
      >
        <h1>Loading ... </h1>
      </div>
    );
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const newComment = commentText;
    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <div>
      <SecondHeader />
      <h1
        style={{
          color: "#ffffff",
          marginLeft: "40%",
          marginTop: 80,
          width: "50%",
          height: "50%",
          fontSize: 50,
        }}
      >
        Game Details
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: 50,
        }}
      >
        <div
          style={{
            marginLeft: "10%",
          }}
        >
          <h2 style={{ color: "#D64933", fontSize: "bold" }}>Game Name:</h2>
          <h3 style={{ color: "#C5CBD3" }}>{gameDetails.gameName}</h3>
          <h2 style={{ color: "#D64933" }}>Game Price:</h2>
          <h3 style={{ color: "#C5CBD3" }}>{gameDetails.gamePrice} $</h3>
          <h2 style={{ color: "#D64933" }}>Game Description:</h2>
          <h3 style={{ color: "#C5CBD3" }}>{gameDetails.gameDescription}</h3>

          {/* comments */}
          <div style={{ flexDirection: "row" }}>
            <Form
              style={{ width: "50%", flexDirection: "row" }}
              onSubmit={handleCommentSubmit}
            >
              <Form.Label
                style={{ color: "#fff", marginTop: 10, fontSize: 22 }}
              >
                Add Your Comment
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Comment"
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                }}
              />
              <Button style={{ marginTop: 10 }} variant="success" type="submit">
                Add Comment
              </Button>
            </Form>
          </div>
          <h2 style={{ color: "#fff", marginTop: 8 }}>See Comments:</h2>
          <ul>
            {comments.map((comment, index) => (
              <li style={{ color: "#C5CBD3", fontSize: 22 }} key={index}>
                {comment}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={gameDetails.gameImage}
          style={{
            width: "30%",
            height: "10%",
            borderRadius: 20,
            marginLeft: 20,
          }}
        />
      </div>
    </div>
  );
};

export default GameDetails;
