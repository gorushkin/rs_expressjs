import * as tasksRepo from './task.memory.repository.js';
import { getBoard } from '../boards/board.service.js';

const getAll = (boardId) => tasksRepo.getAll(boardId);

const addTask = async (data) => {
  const { boardId } = data;
  await getBoard(boardId);
  const task = await tasksRepo.addTask(data);
  return task;
};

const getTask = async (id) => {
  const task = await tasksRepo.getTask(id);
  if (!task) throw new Error(`Taskwith id ${id} not found`);
  return task;
};

const updateTask = async (id, data) => {
  const task = await getTask(id);
  const updatedTask = { ...task, ...data };
  await tasksRepo.updateTask(id, updatedTask);
  return updatedTask;
};

const deleteTask = async (id) => {
  await getTask(id);
  await tasksRepo.deleteTask(id);
};

export { getAll, addTask, getTask, updateTask, deleteTask };
