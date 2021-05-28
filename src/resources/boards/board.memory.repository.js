import { writeData, readData } from '../../common/helpers.js';

const getData = async (fieldName) => (await readData())[fieldName];

const getAll = async () => getData('boards');

const addBoard = async (board) => {
  const { boards } = await readData();
  const updatedBoards = [...boards, board];
  writeData({ boards: updatedBoards });
  return board;
};

const getBoard = async (id) => {
  const { boards } = await readData();
  const index = boards.findIndex((item) => item.id === id);
  return boards[index];
};

const updateBoard = async (id, data) => {
  const boards = await getAll();
  const index = boards.findIndex((item) => item.id === id);
  const board = boards[index];
  const updatedBoard = { ...board, ...data };
  const updatedBoards = boards.map((item) =>
    item.id === id ? updatedBoard : item
  );
  writeData({ boards: updatedBoards });
};

const deleteBoard = async (id) => {
  const boards = await getAll();
  const updatedBoards = boards.filter((item) => item.id !== id);
  writeData({ boards: updatedBoards });
  return boards;
};

export { getAll, addBoard, getBoard, updateBoard, deleteBoard };
