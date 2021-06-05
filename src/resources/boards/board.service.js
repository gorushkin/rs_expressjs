import * as boardsRepo from './board.memory.repository.js';

const getAll = () => boardsRepo.getAll('boards');

const addBoard = (board) => boardsRepo.addBoard(board);

const getBoard = async (id) => {
  boardsRepo.getBoard(id);
  const board = await boardsRepo.getBoard(id);
  if (!board) throw new Error(`Board with id ${id} not found`);
  return board;
};

const updateBoard = async (id, data) => {
  const board = await getBoard(id);
  const updatedBoard = { ...board, ...data };
  await boardsRepo.updateBoard(id, updatedBoard);
  return updatedBoard;
};

const deleteBoard = async (id) => {
  await getBoard(id);
  await boardsRepo.deleteBoard(id);
};

export { getAll, addBoard, getBoard, updateBoard, deleteBoard };
