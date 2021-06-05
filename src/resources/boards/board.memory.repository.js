import { writeData, readData } from '../../common/helpers.js';
import Board from './board.model.js';

const getData = async (fieldName) => (await readData())[fieldName];

const getAll = async () => getData('boards');

const addBoard = async (data) => {
  const board = new Board(data);
  const { boards } = await readData();
  const updatedBoards = [...boards, board];
  writeData({ boards: updatedBoards });
  return board;
};

const updateBoard = async (id, board) => {
  const boards = await getAll();
  // TODO: Сделать замену доски через модель
  const updatedBoards = boards.map((item) => (item.id === id ? board : item));
  writeData({ boards: updatedBoards });
  return board;
};

const getBoard = async (id) => {
  const { boards } = await readData();
  const index = boards.findIndex((item) => item.id === id);
  return boards[index];
};

const deleteBoard = async (id) => {
  const boards = await getAll();
  const updatedBoards = boards.filter((item) => item.id !== id);
  writeData({ boards: updatedBoards });
  return boards;
};

export { getAll, addBoard, getBoard, updateBoard, deleteBoard };
