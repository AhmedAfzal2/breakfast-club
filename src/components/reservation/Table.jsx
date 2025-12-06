import React from "react";

const style = {
  table: {
    position: "absolute",
    backgroundColor: "blue",
    width: 60,
    height: 60,
    borderRadius: 10,
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

function Table({ x, y, tableNumber }) {
  return <div style={{ ...style.table, left: x, top: y }}>{tableNumber}</div>;
}

export default Table;
