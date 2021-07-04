import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import * as path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(req.body);
  next();
});

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
  next();
});

export default app;
