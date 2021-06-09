import { writeData, readData } from '../../common/helpers.js';
import Task from './task.model.js';

const getData = async (fieldName) => (await readData())[fieldName];

const getAll = async (boardId) => {
  const allTasks = await getData('tasks');
  const tasks = allTasks.filter((item) => item.boardId === boardId);
  return tasks;
};

const addTask = async (data) => {
  const { tasks } = await readData();
  const task = new Task(data);
  const updatedTasks = [...tasks, task];
  writeData({
    tasks: updatedTasks,
  });
  return task;
};

const getTask = async (id) => {
  const { tasks } = await readData();
  const task = tasks.find((item) => item.id === id);
  return task;
};

const updateTask = async (id, task) => {
  const { tasks } = await readData();
  const updatedTasks = tasks.map((item) => (item.id === id ? task : item));
  writeData({ tasks: updatedTasks });
  return task;
};

const deleteTask = async (id) => {
  const { tasks } = await readData();
  const updatedTasks = tasks.filter((item) => item.id !== id);
  writeData({ tasks: updatedTasks });
  return tasks;
};

export { getAll, addTask, getTask, updateTask, deleteTask };
