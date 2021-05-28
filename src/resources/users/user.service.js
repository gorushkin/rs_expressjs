import * as usersRepo from './user.memory.repository.js';

const getAll = () => usersRepo.getAll('users');
const addUser = (user) => usersRepo.addUser(user);
const getUser = (id) => usersRepo.getUser(id);
const updateUser = (id, data) => usersRepo.updateUser(id, data);
const deleteUser = (id) => usersRepo.deleteUser(id);

export { getAll, addUser, getUser, updateUser, deleteUser };
