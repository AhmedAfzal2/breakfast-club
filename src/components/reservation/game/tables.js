const TWO_TABLE_SIZE = { width: 225 / 1200, height: 150 / 720 };
const FOUR_TABLE_SIZE = { width: 260 / 1200, height: 180 / 720 };
const TWO_TABLE_NAME = "table_2c";
const FOUR_TABLE_NAME = "table_2a";

let idCounter = 1;

const path = "/assets/images/";

function getSrc(name) {
  return path + name + ".png";
}

function getReserved(name) {
  return path + name + "_reserved.png";
}

function getSeated(name) {
  return path + name + "_seated.png";
}

const Table2 = (x, y) => ({
  id: idCounter++,
  x: x / 1200,
  y: y / 720,
  width: TWO_TABLE_SIZE.width,
  height: TWO_TABLE_SIZE.height,
  src: getSrc(TWO_TABLE_NAME),
  reserved_src: getReserved(TWO_TABLE_NAME),
  seated_src: getSeated(TWO_TABLE_NAME),
  capacity: 2,
});

const Table4 = (x, y) => ({
  id: idCounter++,
  x: x / 1200,
  y: y / 720,
  width: FOUR_TABLE_SIZE.width,
  height: FOUR_TABLE_SIZE.height,
  src: getSrc(FOUR_TABLE_NAME),
  reserved_src: getReserved(FOUR_TABLE_NAME),
  seated_src: getSeated(FOUR_TABLE_NAME),
  capacity: 4,
});

const tables = [
  Table2(360, 560),
  Table2(360, 40),
  Table4(0, 8),
  Table4(0, 540),
  Table2(360, 300),
  Table4(0, 274),
];

export default tables;
