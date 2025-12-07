const TWO_TABLE_SIZE = { width: 225, height: 150 };
const FOUR_TABLE_SIZE = { width: 260, height: 180 };

const tables = [
  {
    id: 1,
    x: 360,
    y: 560,
    width: TWO_TABLE_SIZE.width,
    height: TWO_TABLE_SIZE.height,
    src: "/assets/images/table_2.png",
    reserved_src: "assets/images/table_2_reserved.png",
    capacity: 2,
  },
  {
    id: 2,
    x: 360,
    y: 40,
    width: TWO_TABLE_SIZE.width,
    height: TWO_TABLE_SIZE.height,
    src: "/assets/images/table_2.png",
    reserved_src: "assets/images/table_2_reserved.png",
    capacity: 2,
  },
  {
    id: 3,
    x: 0,
    y: 8,
    width: FOUR_TABLE_SIZE.width,
    height: FOUR_TABLE_SIZE.height,
    src: "/assets/images/table_4.png",
    reserved_src: "assets/images/table_4_reserved.png",
    capacity: 4,
  },
  {
    id: 4,
    x: 0,
    y: 540,
    width: FOUR_TABLE_SIZE.width,
    height: FOUR_TABLE_SIZE.height,
    src: "/assets/images/table_4.png",
    reserved_src: "assets/images/table_4_reserved.png",
    capacity: 4,
  },
  {
    id: 5,
    x: 360,
    y: 300,
    width: TWO_TABLE_SIZE.width,
    height: TWO_TABLE_SIZE.height,
    src: "/assets/images/table_2.png",
    reserved_src: "assets/images/table_2_reserved.png",
    capacity: 2,
  },
  {
    id: 6,
    x: 0,
    y: 274,
    width: FOUR_TABLE_SIZE.width,
    height: FOUR_TABLE_SIZE.height,
    src: "/assets/images/table_4.png",
    reserved_src: "assets/images/table_4_reserved.png",
    capacity: 4,
  },
];

export default tables;
