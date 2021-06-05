/* eslint-disable no-unused-vars */
import express from 'express';
import httpStatusCodes from 'http-status-codes';
import Task from './task.model.js';
import * as tasksService from './task.service.js';
import { errorHandler } from '../../common/helpers.js';

const router = express.Router({ mergeParams: true });
const { StatusCodes } = httpStatusCodes;
// позволяет брать params из прдыдущих роутов

const getAll = async (req, res, next) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.status(StatusCodes.OK).json(tasks);
};

const createTask = async (req, res, next) => {
  const { boardId } = req.params;
  const data = { ...req.body, boardId };
  try {
    const task = await tasksService.addTask(data);
    res.status(StatusCodes.OK).json(task);
  } catch (error) {
    next(error);
  }
};

router.get('/', getAll);
router.post('/', createTask);

const getBoardId = (req) =>
  req.baseUrl.split('/').filter((item) => !!item.trim())[1];

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
