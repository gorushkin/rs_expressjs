import { writeData, readData } from '../../common/helpers.js';

const getData = async (fieldName) => (await readData())[fieldName];

const getAll = async () => getData('users');

const addUser = async (user) => {
  const { users } = await readData();
  const updatedUsers = [...users, user];
  writeData({ users: updatedUsers });
  return user;
};

const getUser = async (id) => {
  const { users } = await readData();
  const index = users.findIndex((item) => item.id === id);
  return users[index];
};

const updateUser = async (id, data) => {
  const users = await getAll();
  const index = users.findIndex((item) => item.id === id);
  const user = users[index];
  const updatedUser = { ...user, ...data };
  const updatedUsers = users.map((item) =>
    item.id === id ? updatedUser : item
  );
  writeData({ users: updatedUsers });
  return updatedUser;
};

const deleteUser = async (id) => {
  const users = await getAll();
  const updatedUsers = users.filter((item) => item.id !== id);
  writeData({ users: updatedUsers });
  return users;
};

export { getAll, addUser, getUser, updateUser, deleteUser };
