const TWO_TABLE_SIZE = { width: 225 / 1200, height: 150 / 720 };
const FOUR_TABLE_SIZE = { width: 260 / 1200, height: 180 / 720 };

let idCounter = 1;

const Table2 = (x, y) => ({
  id: idCounter++,
  x: x / 1200,
  y: y / 720,
  width: TWO_TABLE_SIZE.width,
  height: TWO_TABLE_SIZE.height,
  src: "/assets/images/table_2.png",
  reserved_src: "assets/images/table_2_reserved.png",
  seated_src: "assets/images/table_2_seated.png",
  capacity: 2,
});

const Table4 = (x, y) => ({
  id: idCounter++,
  x: x / 1200,
  y: y / 720,
  width: FOUR_TABLE_SIZE.width,
  height: FOUR_TABLE_SIZE.height,
  src: "/assets/images/table_4.png",
  reserved_src: "assets/images/table_4_reserved.png",
  seated_src: "assets/images/table_4_seated.png",
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
