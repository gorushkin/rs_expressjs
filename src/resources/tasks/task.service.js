import * as tasksRepo from './task.memory.repository.js';
import {getBoard} from '../boards/board.service.js';

const getAll = (boardId) => tasksRepo.getAll(boardId);

const addTask =async  (data) => {
  const {boardId} = data;
  await getBoard(boardId);
  const task = await tasksRepo.addTask(data)
  return task
};

const getTask = (id) => tasksRepo.getTask(id);

const updateTask = (id, data) => tasksRepo.updateTask(id, data);

const deleteTask = (id) => tasksRepo.deleteTask(id);

export { getAll, addTask, getTask, updateTask, deleteTask };
