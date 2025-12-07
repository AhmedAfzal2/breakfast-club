import React, { forwardRef } from "react";
import tables from "./tables";
import "./style.css";

const style = {
  scene: {
    position: "relative",
    backgroundImage: "url('/assets/images/tiles.png')",
    backgroundRepeat: "repeat",
    backgroundSize: "420px 420px",
  },
  table: {
    position: "absolute",
    transition: "transform 0.5s",
  },
  bar: {
    position: "absolute",
    top: 0,
    right: 0,
  },
};

const RestaurantScene = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        ...style.scene,
        width: props.size.width,
        height: props.size.height,
      }}
    >
      <img src="/assets/images/bar.png" style={{ ...style.bar }} />
      {tables.map((t) => {
        return (
          <img
            src={t.src}
            id={"table" + t.id}
            key={t.id}
            style={{
              ...style.table,
              left: t.x,
              top: t.y,
              width: t.width,
              height: t.height,
            }}
          />
        );
      })}
    </div>
  );
});

export default RestaurantScene;
