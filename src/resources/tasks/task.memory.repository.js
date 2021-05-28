import { writeData, readData } from '../../common/helpers.js';

const getData = async (fieldName) => (await readData())[fieldName];

const getAll = async (boardId) => {
  const allTasks = await getData('tasks');
  const tasks = allTasks.filter((item) => item.boardId === boardId);
  return tasks;
};

const addTask = async (task) => {
  const { tasks, boards } = await readData();
  const { boarId } = task;
  const isBoardIdIsCorrect = boards.findIndex((item) => item.id === boarId);
  if (isBoardIdIsCorrect < 0) {
    throw new Error('board id is incorrect!!!');
  }
  const updatedTasks = [...tasks, task];
  writeData({ tasks: updatedTasks });
  return task;
};

const getTask = async (id) => {
  const { tasks } = await readData();
  const index = tasks.findIndex((item) => item.id === id);
  if (index < 0) {
    throw new Error('Task ID is not correct!!!');
  }
  return tasks[index];
};

const updateTask = async (id, data) => {
  const { tasks } = await readData();
  const index = tasks.findIndex((item) => item.id === id);
  if (index < 0) {
    throw new Error('Task ID is not correct!!!');
  }
  const task = tasks[index];
  const updatedTask = { ...task, ...data };
  const updatedTasks = tasks.map((item) =>
    item.id === id ? updatedTask : item
  );
  writeData({ tasks: updatedTasks });
};

const deleteTask = async (id) => {
  const { tasks } = await readData();
  const updatedTasks = tasks.filter((item) => item.id !== id);
  writeData({ tasks: updatedTasks });
  return updatedTasks;
};

export { getAll, addTask, getTask, updateTask, deleteTask };
