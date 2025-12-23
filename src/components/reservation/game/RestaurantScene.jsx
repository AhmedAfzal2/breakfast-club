import React, { forwardRef } from "react";
import tables from "./tables";
import config from "./gameConstants";
import "./style.css";

const style = {
  scene: {
    position: "relative",
    backgroundImage: "url('/assets/images/tilesb.png')",
    backgroundSize: "cover",
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
  plant: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
};

const RestaurantScene = forwardRef((props, ref) => {
  const { width, height } = props.size;
  const { selectedTables, onTableClick } = props;
  const bar = config.bar;
  const plant = config.plant;

  return (
    <div
      ref={ref}
      style={{
        ...style.scene,
        width: props.size.width,
        height: props.size.height,
        transform: "scale(1)",
        transformOrigin: "top left",
      }}
      className="restaurant-scene"
    >
      <img
        src="/assets/images/bar.png"
        style={{
          ...style.bar,
          width: bar.width * width,
          height: bar.height * height,
        }}
      />
      <img
        src="/assets/images/plant.png"
        style={{
          ...style.plant,
          width: plant.width * width,
          height: plant.height * height,
        }}
      />
      {tables.map((t) => {
        const isSelected = selectedTables?.some((st) => st.id === t.id);
        const src = t.reserved
          ? t.seated_src
          : isSelected
          ? t.reserved_src
          : t.src;

        return (
          <img
            src={src}
            id={"table" + t.id}
            key={t.id}
            className="table"
            style={{
              ...style.table,
              left: t.x * width,
              top: t.y * height,
              width: t.width * width,
              height: t.height * height,
              cursor: t.reserved ? "default" : "pointer",
            }}
            onClick={() => onTableClick && onTableClick(t.id)}
          />
        );
      })}
    </div>
  );
});

export default RestaurantScene;
