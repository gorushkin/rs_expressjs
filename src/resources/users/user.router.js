/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './user.model.js';
import * as usersService from './user.service.js';
import { errorHandler } from '../../common/helpers.js';

const router = Router();

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await usersService.getAll();
  res.status(StatusCodes.OK).json(users.map(User.toResponse));
});

const createUser = async (req, res, next) => {
  const data = req.body;
  try {
    const user = usersService.addUser(data);
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await usersService.getUser(id);
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const user = await usersService.updateUser(id, data);
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await usersService.deleteUser(id);
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
