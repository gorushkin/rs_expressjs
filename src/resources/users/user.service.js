import * as usersRepo from './user.memory.repository.js';

const getAll = () => usersRepo.getAll();
const addUser = (user) => usersRepo.addUser(user);

export { getAll, addUser };
