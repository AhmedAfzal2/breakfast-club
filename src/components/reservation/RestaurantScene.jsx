import React, { useState } from "react";
import Character from "./Character";
import Table from "./Table";

function RestaurantScene() {
  const [charPos, setCharPos] = useState({ x: 50, y: 200 });
  const [selectedTable, setSelectedTable] = useState(null);

  const tables = [
    { x: 100, y: 50, number: 1 },
    { x: 250, y: 100, number: 2 },
    { x: 400, y: 50, number: 3 },
  ];

  const moveToTable = (table) => {
    setCharPos({ x: table.x, y: table.y });
    setSelectedTable(table.number);
  };

  return (
    <div
      style={{
        backgroundColor: "#964b00",
        position: "relative",
        width: 600,
        height: 300,
        border: "2px solid #ccc",
      }}
    >
      <Character x={charPos.x} y={charPos.y} />
      {tables.map((t) => (
        <Table key={t.number} x={t.x} y={t.y} tableNumber={t.number} />
      ))}
    </div>
  );
}

export default RestaurantScene;
