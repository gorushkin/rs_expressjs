import * as usersRepo from './user.memory.repository';
import { IUser } from './user.model';

const getAll = () => usersRepo.getAll();

const addUser = (data: IUser) => usersRepo.addUser(data);

const getUser = async (id: string) => {
  const user = await usersRepo.getUser(id);
  if (!user) throw new Error(`User with id ${id} not found`);
  return user;
};

const updateUser = async (id: string, data: IUser) => {
  const user = await getUser(id);
  const updatedUser = { ...user, ...data };
  await usersRepo.updateUser(id, updatedUser);
  return updatedUser;
};

const deleteUser = async (id: string) => {
  await getUser(id);
  await usersRepo.deleteUser(id);
};

export { getAll, addUser, getUser, updateUser, deleteUser };
