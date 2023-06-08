import React, { useState } from "react";
import SecondHeader from "../components/SecondHeader";
import GameItems from "../components/GameItems";

function ShoppingCart() {
  const [selectedGames, setSelectedGames] = useState([1, 2, 3, 4, 5]);

  const handleClick = (item) => {
    console.log(item);
  };

  return (
    <>
      <SecondHeader />
      <div style={{ width: "30%", height: "50%", marginLeft: 20 }}>
        {selectedGames.length === 0 ? (
          <h1 style={{ color: "#fff" }}>Your shopping cart is empty.</h1>
        ) : (
          <div>
            {selectedGames.map((game, index) => (
              <GameItems key={game._id} game={game} handleClick={handleClick} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ShoppingCart;
