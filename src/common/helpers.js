import path from 'path';
import fs from 'fs';

const pathToData = path.join(process.cwd(), process.env.DB);

const readData = async () =>
  JSON.parse(await fs.promises.readFile(pathToData, 'utf-8'));

const writeData = async (field) => {
  const db = await readData();
  const updatedData = JSON.stringify({ ...db, ...field });
  await fs.promises.writeFile(pathToData, updatedData, 'utf-8');
};

export { readData, writeData };
