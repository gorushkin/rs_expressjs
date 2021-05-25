import { writeData, readData } from '../../common/helpers.js';

const getData = async (fieldName) => (await readData())[fieldName];

const addData = async (user) => {
  const { users } = await readData();
  const updatedUsers = [...users, user];
  writeData({ users: updatedUsers });
  return { data: 'qweu' };
};

const getAll = async () => getData('users');
const addUser = async (user) => addData(user);

export { getAll, addUser };
