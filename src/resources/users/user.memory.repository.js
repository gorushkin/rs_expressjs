import { writeData, readData } from '../../common/helpers.js';
import User from './user.model.js';

const getData = async (fieldName) => (await readData())[fieldName];

const getAll = async () => getData('users');

const addUser = async (data) => {
  const user = new User(data);
  const { users } = await readData();
  const updatedUsers = [...users, user];
  writeData({ users: updatedUsers });
  return user;
};

const getUser = async (id) => {
  const { users } = await readData();
  const user = users.find((item) => item.id === id);
  return user;
};

const updateUser = async (id, user) => {
  const users = await getAll();
  const updatedUsers = users.map((item) =>
    item.id === id ? user : item
  );
  writeData({ users: updatedUsers });
  return user;
};

const deleteUser = async (id) => {
  const users = await getAll();
  const updatedUsers = users.filter((item) => item.id !== id);
  writeData({ users: updatedUsers });
  return users;
};

export { getAll, addUser, getUser, updateUser, deleteUser };
