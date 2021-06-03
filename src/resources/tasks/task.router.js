import express from 'express';
import Task from './task.model.js';
import * as tasksService from './task.service.js';
import { errorHandler } from '../../common/helpers.js';

const router = express.Router({ mergeParams: true });
// позволяет брать params из прдыдущих роутов

const getBoardId = (req) =>
  req.baseUrl.split('/').filter((item) => !!item.trim())[1];

router.route('/').get(async (req, res) => {
  const boardId = getBoardId(req);
  const response = await errorHandler(tasksService.getAll, boardId);
  res.json(response);
});

router.route('/').post(async (req, res) => {
  const boardId = getBoardId(req);
  const { title, description } = req.body;
  const task = new Task({ title, description, boardId });
  const response = await errorHandler(tasksService.addTask, task);
  res.json(response);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const response = await errorHandler(tasksService.getTask, id);
  res.json(response);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { order, ...data } = req.body;
  const response = await errorHandler(tasksService.updateTask, id, {
    ...data,
  });
  res.json(response);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const response = await errorHandler(tasksService.deleteTask, id);
  res.json(response);
});

export default router;
