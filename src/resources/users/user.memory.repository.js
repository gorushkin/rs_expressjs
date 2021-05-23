import path from 'path';
import fs from 'fs';

const pathToData = path.join(process.cwd(), process.env.DB);

const getData = async (fieldName = 'users') =>
  JSON.parse(await fs.promises.readFile(pathToData, 'utf-8'))[fieldName];

getData();

const getAll = async () => getData('users');

export { getAll };
