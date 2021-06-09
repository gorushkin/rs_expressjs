import express from 'express';
import httpStatusCodes from 'http-status-codes';
import * as tasksService from './task.service.js';
// import { errorHandler } from '../../common/helpers.js';

// позволяет брать params из прдыдущих роутов
const router = express.Router({ mergeParams: true });
const { StatusCodes } = httpStatusCodes;

const getAll = async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const tasks = await tasksService.getAll(boardId);
    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    next(error);
  }
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

const getTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await tasksService.getTask(id);
    res.status(StatusCodes.OK).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const { title, description, userId, boardId } = req.body;
  const data = { title, description, userId, boardId };
  const { id } = req.params;
  try {
    const task = await tasksService.updateTask(id, data);
    res.status(StatusCodes.OK).json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tasksService.deleteTask(id);
    res.status(StatusCodes.OK).json({ message: 'Task was deleted' });
  } catch (error) {
    next(error);
  }
};

router.get('/', getAll);
router.post('/', createTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
