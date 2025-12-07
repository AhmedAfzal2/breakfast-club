import { useEffect, useRef } from "react";
import useKeyboard from "./useKeyboard";
import tables from "./tables";
import config from "./gameConstants";
import "./style.css";
import sprites from "./sprites";

const { world, view, char, bar } = config;

// takes x, y coords and object containing width and height
// and returns object with boundaries
function Pos(x, y, size) {
  this.left = x;
  this.right = x + size.width;
  this.top = y;
  this.bottom = y + size.height;
}

function collisionCompare(char, table, highlight) {
  const HIGHLIGHT_RADIUS = 12;
  if (!highlight)
    return (
      char.right > table.left &&
      char.left < table.right &&
      char.bottom > table.top &&
      char.top < table.bottom
    );
  else
    return (
      char.right > table.left - HIGHLIGHT_RADIUS &&
      char.left < table.right + HIGHLIGHT_RADIUS &&
      char.bottom > table.top - HIGHLIGHT_RADIUS &&
      char.top < table.bottom + HIGHLIGHT_RADIUS
    );
}

function detectCollision(cameraPos, charOffset, tables, nearTables) {
  // convert character position from viewport to world
  const charX = cameraPos.x + charOffset.x + view.width / 2;
  const charY = cameraPos.y + charOffset.y + view.height / 2;

  const charPos = new Pos(charX, charY, char);

  // check collision against every table
  for (const table of tables) {
    const tablePos = new Pos(table.x, table.y, table);

    // for highlighting when close by
    if (collisionCompare(charPos, tablePos, true)) {
      document.getElementById("table" + table.id).classList.add("highlighted");
      nearTables.current[table.id] = true;
    } else {
      document
        .getElementById("table" + table.id)
        .classList.remove("highlighted");
      nearTables.current[table.id] = false;
    }

    if (collisionCompare(charPos, tablePos, false)) return true;
  }

  // bar collision
  const barPos = {
    left: view.width - bar.width,
    right: view.width,
    top: 0,
    bottom: bar.height,
  };
  if (collisionCompare(charPos, barPos, false)) return true;

  return false;
}

function applyCollisions(dx, dy, cameraPos, charOffset, tables, nearTables) {
  // ----------- try X axis only -----------
  if (dx !== 0) {
    const nextX = charOffset.current.x + dx;
    const testPos = { x: nextX, y: charOffset.current.y };

    if (detectCollision(cameraPos.current, testPos, tables, nearTables)) {
      dx = 0; // block X
    }
  }

  // ----------- try Y axis only -----------
  if (dy !== 0) {
    const nextY = charOffset.current.y + dy;
    const testPos = { x: charOffset.current.x, y: nextY };

    if (detectCollision(cameraPos.current, testPos, tables, nearTables)) {
      dy = 0; // block Y
    }
  }

  return { dx, dy }; // return leftover movement for camera
}

// takes keys pressed and returns a direction to walk in
function walkingDirection(keys) {
  if (keys.current["w"] && !keys.current["s"]) return "top";
  else if (keys.current["s"] && !keys.current["w"]) return "bottom";
  else if (keys.current["d"] && !keys.current["a"]) return "right";
  else if (keys.current["a"] && !keys.current["d"]) return "left";
  else return "none";
}

export default function useCamera(bgRef, charRef, onSelect, onUnselect) {
  const cameraPos = useRef({ x: 0, y: 0 });
  const charOffset = useRef({ x: 400, y: 280 });
  const nearTables = useRef({});
  const pressedTables = useRef({});
  const keys = useKeyboard();

  const speed = 200; // pixels per second
  const lastTime = useRef(0);

  let walkFrame = 0;
  let updateWalkFrame = 0;
  let currentDirection = "top";

  useEffect(() => {
    const animate = (time) => {
      // check for table select
      for (const tableId of Object.keys(nearTables.current)) {
        if (nearTables.current[tableId] && keys.current["e"]) {
          if (!pressedTables.current[tableId]) {
            document.getElementById("table" + tableId).src = tables.find(
              (t) => t.id == tableId
            ).reserved_src;
            onSelect(t.id);
            pressedTables.current[tableId] = true;
          }
        } else if (nearTables.current[tableId] && keys.current["f"]) {
          if (pressedTables.current[tableId]) {
            document.getElementById("table" + tableId).src = tables.find(
              (t) => t.id == tableId
            ).src;
            onUnselect(t.id);
            pressedTables.current[tableId] = false;
          }
        }
      }

      // animate walking
      const direction = walkingDirection(keys);
      if (updateWalkFrame === 0) {
        if (direction == "none") {
          charRef.current.src = sprites[currentDirection].stand;
        } else {
          charRef.current.src = sprites[direction].walk[walkFrame];
          currentDirection = direction;
          walkFrame = (walkFrame + 1) % 2;
        }
      }

      updateWalkFrame = (updateWalkFrame + 1) % 30;

      // to get time between last update and this update
      if (!lastTime.current) lastTime.current = time;
      const deltaTime = (time - lastTime.current) / 1000; // in seconds
      lastTime.current = time;

      let dx = 0;
      let dy = 0;

      // update position based on keys pressed
      if (keys.current["w"]) dy -= speed * deltaTime;
      if (keys.current["s"]) dy += speed * deltaTime;
      if (keys.current["a"]) dx -= speed * deltaTime;
      if (keys.current["d"]) dx += speed * deltaTime;

      const result = applyCollisions(
        dx,
        dy,
        cameraPos,
        charOffset,
        tables,
        nearTables
      );
      dx = result.dx;
      dy = result.dy;

      // ------------------ camera movement ----------------------

      let newCamX = cameraPos.current.x + dx;
      let newCamY = cameraPos.current.y + dy;

      // maximum camera can move
      const maxCamX = world.width - view.width;
      const maxCamY = world.height - view.height;

      // clamp camera movement
      let camMovedX =
        Math.max(0, Math.min(newCamX, maxCamX)) - cameraPos.current.x;
      let camMovedY =
        Math.max(0, Math.min(newCamY, maxCamY)) - cameraPos.current.y;

      if (newCamX - dx <= 0 && keys.current["d"] && charOffset.current.x < 0)
        camMovedX = 0;
      if (
        newCamX - dx >= maxCamX &&
        keys.current["a"] &&
        charOffset.current.x > 0
      )
        camMovedX = 0;

      if (newCamY - dy <= 0 && keys.current["s"] && charOffset.current.y < 0)
        camMovedY = 0;
      if (
        newCamY - dy >= maxCamY &&
        keys.current["w"] &&
        charOffset.current.y > 0
      )
        camMovedY = 0;
      cameraPos.current.x += camMovedX;
      cameraPos.current.y += camMovedY;

      // ----------------- character movement ----------------------

      let newCharX = charOffset.current.x + dx - camMovedX;
      let newCharY = charOffset.current.y + dy - camMovedY;

      const maxCharX = view.width / 2 - char.width;
      const maxCharY = view.height / 2 - char.height;

      // clamp char movement
      let charMovedX =
        Math.max(-maxCharX - char.width, Math.min(newCharX, maxCharX)) -
        charOffset.current.x;
      let charMovedY =
        Math.max(-maxCharY - char.height, Math.min(newCharY, maxCharY)) -
        charOffset.current.y;

      if (dx === 0) charMovedX = 0;
      if (dy === 0) charMovedY = 0;

      // remaining movement goes to character if camera hit edge
      charOffset.current.x += charMovedX;
      charOffset.current.y += charMovedY;

      // update position of background image
      bgRef.current.style.transform = `translate(
        ${-cameraPos.current.x}px, ${-cameraPos.current.y}px
      )`;
      charRef.current.style.transform = `translate(
        ${charOffset.current.x}px, ${charOffset.current.y}px
      )`;

      // call animate on next frame
      requestAnimationFrame(animate);
    };

    // start the loop
    requestAnimationFrame(animate);
  }, []);
}
