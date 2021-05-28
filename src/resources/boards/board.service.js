import * as boardsRepo from './board.memory.repository.js';

const getAll = () => boardsRepo.getAll('boards');
const addBoard = (board) => boardsRepo.addBoard(board);
const getBoard = (id) => boardsRepo.getBoard(id);
const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);
const deleteBoard = (id) => boardsRepo.deleteBoard(id);

export { getAll, addBoard, getBoard, updateBoard, deleteBoard };
