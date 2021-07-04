import { writeData, readData } from '../../common/helpers.js';
import User from './user.model';

const getData = async (fieldName: string) => (await readData())[fieldName];

const getAll = async () => getData('users');

const addUser = async (data: User) => {
  const user = new User(data);
  const { users } = await readData();
  const updatedUsers = [...users, user];
  writeData({ users: updatedUsers });
  return user;
};

const getUser = async (id: string) => {
  const { users } = await readData();
  const user = users.find((item: User) => item.id === id);
  return user;
};

const updateUser = async (id: String, user: User) => {
  const users = await getAll();
  const updatedUsers = users.map((item: User) => (item.id === id ? user : item));
  writeData({ users: updatedUsers });
  return user;
};

const deleteUser = async (id: string | undefined) => {
  const users = await getAll();
  const updatedUsers = users.filter((item: User) => item.id !== id);
  writeData({ users: updatedUsers });
  return users;
};

export { getAll, addUser, getUser, updateUser, deleteUser };
