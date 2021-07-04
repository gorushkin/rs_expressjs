/* eslint-disable no-unused-vars */
import express, { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './user.model';
import * as usersService from './user.service.js';
// import { errorHandler } from '../../common/helpers.js';

const router = express.Router();

// const catchAsync = (fn) => (req, res, next) => {
//   fn(req, res, next).catch(next);
// };

const getAllUsers: RequestHandler = async (_req, res, next) => {
  const users = await usersService.getAll();
  try {
    res.status(StatusCodes.OK).json(users.map(User.toResponse));
  } catch (error) {
    next(error);
  }
};

const createUser: RequestHandler = async (req, res, next) => {
  const data = req.body;
  try {
    const user = await usersService.addUser(data);
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } catch (error) {
    next(error);
  }
};

const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await usersService.getUser(String(id));
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } catch (error) {
    next(error);
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const user = await usersService.updateUser(String(id), data);
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } catch (error) {
    next(error);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    await usersService.deleteUser(String(id));
    res.status(StatusCodes.OK).json({ message: 'User was deleted' });
  } catch (error) {
    next(error);
  }
};

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
