import React, { useState, useEffect } from "react";
import SecondHeader from "../components/SecondHeader";
import GameItems from "../components/GameItems";
import { useLocation } from "react-router-dom";

function ShoppingCart() {
  const loction = useLocation();
  const [gamesInCart, setgamesInCart] = useState([]);

  useEffect(() => {
    if (loction.state) {
      setgamesInCart(loction.state.card ? loction.state.card : []);
    }
  }, []);

  return (
    <>
      <SecondHeader />
      <div
        style={{ width: "20%", height: "20%", marginLeft: 50, marginTop: 20 }}
      >
        {gamesInCart.length === 0 ? (
          <h1 style={{ color: "#fff" }}>Your shopping cart is empty.</h1>
        ) : (
          <div>
            {gamesInCart.map((game, index) => (
              <GameItems key={index} game={game} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ShoppingCart;
