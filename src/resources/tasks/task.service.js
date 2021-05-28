import * as tasksRepo from './task.memory.repository.js';

const getAll = (boardId) => tasksRepo.getAll(boardId);
const addTask = (task) => tasksRepo.addTask(task);
const getTask = (id) => tasksRepo.getTask(id);
const updateTask = (id, data) => tasksRepo.updateTask(id, data);
const deleteTask = (id) => tasksRepo.deleteTask(id);

export { getAll, addTask, getTask, updateTask, deleteTask };
