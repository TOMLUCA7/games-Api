import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, useParams } from "react-router-dom";

const GameDetails = () => {
  const baseURL = "http://localhost:3001/api";
  const { id } = useParams(); //  ךוקח את האיי די של אותו משחק
  const [gameDetails, setGameDetails] = useState(null);

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

  if (!gameDetails) {
    return <h1 style={{ color: "#fff" }}>Loading...</h1>;
  }

  return (
    <>
      <h3
        style={{
          color: "#fff",
          marginLeft: "20%",
          marginTop: 80,
          width: "10%",
          height: "10%",
        }}
      >
        Game Details
      </h3>
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
            width: "50%",
            marginLeft: "20%",
          }}
        >
          <h3 style={{ color: "#fff" }}>Game Name: {gameDetails.gameName}</h3>
          <h3 style={{ color: "#fff" }}>Game Price: {gameDetails.gamePrice}</h3>
          <h3 style={{ color: "#fff" }}>
            Game Description: {gameDetails.gameDescription}
          </h3>
        </div>
        <img
          src={gameDetails.gameImage}
          alt={gameDetails.gameName}
          style={{
            width: "30%",
            height: "10%",
            borderRadius: 20,
          }}
        />
      </div>
    </>
  );
};

export default GameDetails;

{
  /* <div>
      <h1 style={{ color: "#fff" }}>Game Details</h1>
      <h3 style={{ color: "#fff" }}>Game Name: {gameDetails.gameName}</h3>
      <h3 style={{ color: "red" }}>Game Name: {gameDetails.gameImage}</h3>
      <h3 style={{ color: "#fff" }}>Game Price: {gameDetails.gamePrice}</h3>
      <h3 style={{ color: "#fff" }}>
        Game Description: {gameDetails.gameDescription}
      </h3>
    </div> */
}
