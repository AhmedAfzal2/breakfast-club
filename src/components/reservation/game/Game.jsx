import React, { useEffect, useRef } from "react";
import Character from "./Character";
import useCamera from "./useCamera";
import RestaurantScene from "./RestaurantScene";
import config from "./gameConstants";

const { world, view, char, bar } = config;

const style = {
  viewport: {
    width: view.width,
    height: view.height,
    backgroundColor: "red",
    overflow: "hidden",
    position: "relative",
  },
};

function Game() {
  const bgRef = useRef();
  const charRef = useRef();

  useCamera(bgRef, charRef);

  return (
    <div style={{ ...style.viewport }}>
      <RestaurantScene ref={bgRef} size={world} />
      <Character ref={charRef} size={char} />
    </div>
  );
}

export default Game;
