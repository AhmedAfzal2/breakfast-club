import { useEffect, useRef } from "react";
import useKeyboard from "./useKeyboard";
import { useGameContext } from "./GameContext";
import tables from "./tables";
import config from "./gameConstants";
import "./style.css";

const assets = {};

async function loadImage(name, src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      assets[name] = img;
      resolve();
    };
  });
}

function drawSprite(ctx, char, direction, frame) {
  const width = assets.char.width / 3;
  const height = assets.char.height / 4;
  frame = frame === 2 ? 0 : frame;
  frame = frame === 3 ? 2 : frame;
  ctx.clearRect(0, 0, char.width, char.height);
  ctx.drawImage(
    assets.char,
    frame * width + 2,
    direction * height + 2,
    width - 2,
    height - 2,
    0,
    0,
    char.width,
    char.height
  );
}

// takes x, y coords and object containing width and height
// and returns object with boundaries
function Pos(x, y, size) {
  this.left = x;
  this.right = x + size.width;
  this.top = y;
  this.bottom = y + size.height;
}

function collisionCompare(charPos, table, highlight, char) {
  const HIGHLIGHT_RADIUS = 8;
  if (!highlight)
    return (
      charPos.right > table.left &&
      charPos.left < table.right &&
      charPos.bottom > table.top &&
      charPos.top < table.bottom - char.height / 2
    );
  else
    return (
      charPos.right > table.left - HIGHLIGHT_RADIUS &&
      charPos.left < table.right + HIGHLIGHT_RADIUS &&
      charPos.bottom > table.top - HIGHLIGHT_RADIUS &&
      charPos.top < table.bottom + HIGHLIGHT_RADIUS
    );
}

function detectCollision(cameraPos, charOffset, tables, nearTableId, sizes) {
  const { char, view, world } = sizes;
  // convert character position from viewport to world
  const charX = cameraPos.x + charOffset.x + view.width / 2;
  const charY = cameraPos.y + charOffset.y + view.height / 2;

  const charPos = new Pos(charX, charY, char);

  // check collision against every table
  let nearAny = false;
  for (const table of tables) {
    const tablePos = new Pos(table.x, table.y, table);

    // for highlighting when close by
    if (!table.reserved && collisionCompare(charPos, tablePos, true, char)) {
      // only highlight one table near
      if (!nearAny)
        document
          .getElementById("table" + table.id)
          .classList.add("highlighted");
      nearTableId.current = table.id;
      nearAny = true;
    } else {
      document
        .getElementById("table" + table.id)
        .classList.remove("highlighted");
    }

    if (!nearAny) nearTableId.current = 0;

    if (collisionCompare(charPos, tablePos, false, char)) return true;
  }

  // bar collision
  const bar = config.bar;
  const barPos = {
    left: world.width - bar.width * world.width,
    right: world.width,
    top: 0,
    bottom: bar.height * world.height,
  };
  if (collisionCompare(charPos, barPos, false, char)) return true;

  // plant collision
  const plant = config.plant;
  const plantPos = {
    left: world.width - plant.width * world.width,
    right: world.width,
    bottom: world.height,
    top: world.height - plant.height * world.height,
  };
  if (collisionCompare(charPos, plantPos, false, char)) return true;

  return false;
}

function resolveOverlap(charPos, tablePos) {
  const overlapX =
    Math.min(charPos.right, tablePos.right) -
    Math.max(charPos.left, tablePos.left);
  const overlapY =
    Math.min(charPos.bottom, tablePos.bottom) -
    Math.max(charPos.top, tablePos.top);

  // No overlap
  if (overlapX <= 0 || overlapY <= 0) return { dx: 0, dy: 0 };

  // Push out along the smaller overlap
  if (overlapX < overlapY) {
    // push left or right
    return charPos.left < tablePos.left
      ? { dx: -overlapX, dy: 0 }
      : { dx: overlapX, dy: 0 };
  } else {
    // push up or down
    return charPos.top < tablePos.top
      ? { dx: 0, dy: -overlapY }
      : { dx: 0, dy: overlapY };
  }
}

function applyCollisions(
  dx,
  dy,
  cameraPos,
  charOffset,
  tables,
  nearTableId,
  sizes
) {
  // ----------- try X axis only -----------
  if (dx !== 0) {
    const nextX = charOffset.current.x + dx;
    const testPos = { x: nextX, y: charOffset.current.y };

    if (
      detectCollision(cameraPos.current, testPos, tables, nearTableId, sizes)
    ) {
      dx = 0; // block X
    }
  }

  // ----------- try Y axis only -----------
  if (dy !== 0) {
    const nextY = charOffset.current.y + dy;
    const testPos = { x: charOffset.current.x, y: nextY };

    if (
      detectCollision(cameraPos.current, testPos, tables, nearTableId, sizes)
    ) {
      dy = 0; // block Y
    }
  }

  return { dx, dy }; // return leftover movement for camera
}

// takes keys pressed and returns a direction to walk in
function walkingDirection(keys, controllerRef) {
  const k = keys.current;
  const c = controllerRef ? controllerRef.current : {};

  const w = k["w"] || c["w"];
  const s = k["s"] || c["s"];
  const a = k["a"] || c["a"];
  const d = k["d"] || c["d"];

  if (w && !s) return 3;
  else if (s && !w) return 0;
  else if (d && !a) return 2;
  else if (a && !d) return 1;
  else return null;
}

function addCoords(a, b) {
  const ax = a.current ? a.current.x : a.x;
  const ay = a.current ? a.current.y : a.y;

  const bx = b.current ? b.current.x : b.x;
  const by = b.current ? b.current.y : b.y;

  return {
    x: ax + bx,
    y: ay + by,
  };
}

function canCameraMove(coords, view, world) {
  const halfViewW = view.width / 2;
  const halfViewH = view.height / 2;

  const canMoveX = coords.x > halfViewW && coords.x < world.width - halfViewW;

  const canMoveY = coords.y > halfViewH && coords.y < world.height - halfViewH;

  return {
    x: canMoveX,
    y: canMoveY,
  };
}

function canCharacterMove(coords, char, world) {
  const halfW = char.width / 2;
  const halfH = char.height / 2;

  const centerCoords = { x: coords.x + halfW, y: coords.y + halfH };

  const canMoveX =
    centerCoords.x - halfW >= 0 && centerCoords.x + halfW <= world.width;
  const canMoveY =
    centerCoords.y - halfH >= 0 && centerCoords.y + halfH <= world.height;

  return { x: canMoveX, y: canMoveY };
}

export default function useCamera(
  bgRef,
  charRef,
  onSelect,
  onUnselect,
  enabled,
  selectedTables,
  controllerRef
) {
  const ctx = useGameContext();
  const sizesRef = useRef(ctx.sizes);
  const viewInitial = sizesRef.current.view;
  const worldInitial = sizesRef.current.world;

  const cameraPos = useRef({
    x: 0,
    y: worldInitial.height - viewInitial.height,
  });
  const charOffset = useRef({ x: 0, y: 0 });
  const charCoords = useRef({
    x: cameraPos.current.x + viewInitial.width / 2 + charOffset.current.x,
    y: cameraPos.current.y + viewInitial.height / 2 + charOffset.current.y,
  });
  const nearTableId = useRef(0);
  const keys = useKeyboard();
  const selectedTablesRef = useRef(selectedTables);

  const speed = 200; // pixels per second
  const lastTime = useRef(0);

  let walkFrame = 0;
  let updateWalkFrame = 0;
  const UPDATE_FRAME_DELAY = 20;
  let currentDirection = 0;

  useEffect(() => {
    loadImage("char", "/assets/images/bob.png");
  }, []);

  useEffect(() => {
    sizesRef.current = ctx.sizes;
  }, [ctx.sizes]);

  useEffect(() => {
    selectedTablesRef.current = selectedTables;
  }, [selectedTables]);

  useEffect(() => {
    const viewInitial = ctx.sizes.view;
    const worldInitial = ctx.sizes.world;
    cameraPos.current = {
      x: 0,
      y: worldInitial.height - viewInitial.height,
    };
    charOffset.current = { x: 0, y: 0 };
    charCoords.current = {
      x: cameraPos.current.x + viewInitial.width / 2 + charOffset.current.x,
      y: cameraPos.current.y + viewInitial.height / 2 + charOffset.current.y,
    };

    const charCtx = charRef.current.getContext("2d");

    let frameId;
    const animate = (time) => {
      if (!enabled || !assets.char) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const { char, view, world } = sizesRef.current;

      const scaledTables = tables.map((t) => ({
        ...t,
        x: t.x * world.width,
        y: t.y * world.height,
        width: t.width * world.width,
        height: t.height * world.height,
      }));

      if (keys.current["e"] && nearTableId.current !== 0) {
        // check for table select
        const isSelected = selectedTablesRef.current.some(
          (t) => t.id === nearTableId.current
        );
        if (!isSelected) {
          onSelect(nearTableId.current);
        }
      } else if (nearTableId.current !== 0 && keys.current["f"]) {
        const isSelected = selectedTablesRef.current.some(
          (t) => t.id === nearTableId.current
        );
        if (isSelected) {
          onUnselect(nearTableId.current);
        }
      }

      // animate walking
      const direction = walkingDirection(keys, controllerRef);
      if (direction === null) {
        drawSprite(charCtx, char, currentDirection, 0);
        walkFrame = 1;
      }
      if (direction !== null && currentDirection != direction) {
        drawSprite(charCtx, char, direction, 0);
        currentDirection = direction;
      }
      if (updateWalkFrame === 0 && direction !== null) {
        drawSprite(charCtx, char, direction, walkFrame);
        currentDirection = direction;
        walkFrame = (walkFrame + 1) % 4;
      }

      updateWalkFrame = (updateWalkFrame + 1) % UPDATE_FRAME_DELAY;

      // to get time between last update and this update
      if (!lastTime.current) lastTime.current = time;
      const deltaTime = (time - lastTime.current) / 1000; // in seconds
      lastTime.current = time;

      let dx = 0;
      let dy = 0;

      const k = keys.current;
      const c = controllerRef ? controllerRef.current : {};

      // update position based on keys pressed
      if (k["w"] || c["w"]) dy -= speed * deltaTime;
      if (k["s"] || c["s"]) dy += speed * deltaTime;
      if (k["a"] || c["a"]) dx -= speed * deltaTime;
      if (k["d"] || c["d"]) dx += speed * deltaTime;

      const result = applyCollisions(
        dx,
        dy,
        cameraPos,
        charOffset,
        scaledTables,
        nearTableId,
        sizesRef.current
      );
      dx = result.dx;
      dy = result.dy;

      for (const table of scaledTables) {
        const tablePos = new Pos(table.x, table.y, table);
        const charPos = new Pos(
          cameraPos.current.x + charOffset.current.x + view.width / 2,
          cameraPos.current.y + charOffset.current.y + view.height / 2,
          char
        );

        if (collisionCompare(charPos, tablePos, false, char)) {
          const correction = resolveOverlap(charPos, tablePos);
          charOffset.current.x += correction.dx;
          charOffset.current.y += correction.dy;
        }
      }

      let newCharCoords = addCoords(charCoords, { x: dx, y: dy });

      const canCamMove = canCameraMove(newCharCoords, view, world);
      const canCharMove = canCharacterMove(newCharCoords, char, world);

      let charMove = { x: 0, y: 0 };
      let worldMove = { x: 0, y: 0 };

      if (!canCamMove.x) {
        if (canCharMove.x) charMove.x = dx;
      } else worldMove.x = dx;

      if (!canCamMove.y) {
        if (canCharMove.y) charMove.y = dy;
      } else worldMove.y = dy;

      cameraPos.current = addCoords(cameraPos, worldMove);
      charOffset.current = addCoords(charOffset, charMove);
      charCoords.current = addCoords(
        charCoords,
        addCoords(worldMove, charMove)
      );
      // actually move the camera by translating bg
      bgRef.current.style.transform = `translate(
        ${-cameraPos.current.x}px, ${-cameraPos.current.y}px
      )`;
      // move character
      charRef.current.style.transform = `translate(
        ${charOffset.current.x}px, ${charOffset.current.y}px
      )`;

      // call animate on next frame
      frameId = requestAnimationFrame(animate);
    };

    // start the loop
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [enabled, ctx.sizes]);
}
