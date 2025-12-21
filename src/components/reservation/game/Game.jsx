import React, { useEffect, useRef, useState } from "react";
import Character from "./Character";
import useCamera from "./useCamera";
import RestaurantScene from "./RestaurantScene";
import config from "./gameConstants";
import tables from "./tables";

const { world, view, char, bar } = config;

const style = {
  viewport: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    overflow: "hidden",
    position: "relative",
  },
};

function Game({ onSelect, onUnselect, enabled, reservedTables }) {
  const bgRef = useRef();
  const charRef = useRef();
  const viewportRef = useRef();
  const [scale, setScale] = useState(1);

  for (const table of tables) {
    if (reservedTables.includes(table.id)) table.reserved = true;
    else table.reserved = false;
  }

  // Calculate scale to fill container (no borders)
  useEffect(() => {
    const updateScale = () => {
      if (viewportRef.current) {
        const container = viewportRef.current.parentElement;
        if (container) {
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          const scaleX = containerWidth / view.width;
          const scaleY = containerHeight / view.height;
          // Use max to fill container completely (no borders), but cap at reasonable zoom
          const newScale = Math.min(Math.max(scaleX, scaleY), 1.2); // Fill container, max 20% zoom
          setScale(newScale);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    
    const resizeObserver = new ResizeObserver(updateScale);
    if (viewportRef.current?.parentElement) {
      resizeObserver.observe(viewportRef.current.parentElement);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      resizeObserver.disconnect();
    };
  }, []);

  useCamera(bgRef, charRef, onSelect, onUnselect, enabled);

  return (
    <div ref={viewportRef} style={{ ...style.viewport }}>
      <div
        style={{
          width: view.width,
          height: view.height,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: `-${view.height / 2}px`,
          marginLeft: `-${view.width / 2}px`,
        }}
      >
        <RestaurantScene ref={bgRef} size={world} />
        <Character ref={charRef} size={char} />
      </div>
    </div>
  );
}

export default Game;
