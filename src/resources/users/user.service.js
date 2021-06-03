import * as usersRepo from './user.memory.repository.js';

const getAll = () => usersRepo.getAll('users');

const addUser = (data) => usersRepo.addUser(data);

const getUser = async (id) => {
  const user = await usersRepo.getUser(id);
  if (!user) throw new Error(`User with id ${id} not found`);
  return user;
};

const updateUser = async (id, data) => {
  const user = await getUser(id);
  const updatedUser = { ...user, ...data };
  await usersRepo.updateUser(id, updatedUser);
  return updatedUser;
};

const deleteUser = async (id) => {
  await getUser(id);
  await usersRepo.deleteUser(id);
};

export { getAll, addUser, getUser, updateUser, deleteUser };
