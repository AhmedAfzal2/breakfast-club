import React, { useEffect, useRef, useState } from "react";
import Character from "./Character";
import useCamera from "./useCamera";
import RestaurantScene from "./RestaurantScene";
import { useGameContext } from "./GameContext";
import tables from "./tables";
import MobileController from "./MobileController";
import "./Game.css";

function Game({
  onSelect,
  onUnselect,
  enabled,
  reservedTables,
  selectedTables,
  showController = false,
}) {
  const bgRef = useRef();
  const charRef = useRef();
  const viewportRef = useRef();
  const controllerRef = useRef({});

  const ctx = useGameContext();
  const { char, view, world } = ctx.sizes;

  for (const table of tables) {
    if (reservedTables.includes(table.id)) table.reserved = true;
    else table.reserved = false;
  }

  useCamera(
    bgRef,
    charRef,
    onSelect,
    onUnselect,
    enabled,
    selectedTables,
    controllerRef
  );

  const handleTableClick = (tableId) => {
    const table = tables.find((t) => t.id === tableId);
    if (table && table.reserved) return;

    const isSelected = selectedTables.some((t) => t.id === tableId);
    if (isSelected) {
      onUnselect(tableId);
    } else {
      onSelect(tableId);
    }
  };

  return (
    <div ref={viewportRef} className="viewport">
      <div
        style={{
          width: view.width,
          height: view.height,
          transformOrigin: "center center",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: `-${view.height / 2}px`,
          marginLeft: `-${view.width / 2}px`,
        }}
      >
        <RestaurantScene
          ref={bgRef}
          size={world}
          selectedTables={selectedTables}
          onTableClick={handleTableClick}
        />
        <Character ref={charRef} size={char} />
      </div>
      {showController && <MobileController controllerRef={controllerRef} />}
    </div>
  );
}

export default Game;
