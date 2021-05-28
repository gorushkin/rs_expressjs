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

const errorHandler = async (cb, ...data) => {
  try {
    const response = (await cb(...data)) || { message: 'ok!!!' };
    return response;
  } catch (error) {
    return { message: error.message };
  }
};

export { readData, writeData, errorHandler };
