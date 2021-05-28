import express from 'express';
import User from './user.model.js';
import * as usersService from './user.service.js';
import { errorHandler } from '../../common/helpers.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const response = await errorHandler(usersService.getAll);
  res.json(response);
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = new User({ name, login, password });
  const response = await errorHandler(usersService.addUser, user);
  res.json(response);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const response = await errorHandler(usersService.getUser, id);
  res.json((User.toResponse(response)));
});

router.route('/:id').put(async (req, res) => {
  const { name, login, password } = req.body;
  const { id } = req.params;
  await usersService.updateUser(id, { name, login, password });
  res.json({ user: 'qwe' });
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await usersService.deleteUser(id);
  res.json({ user: 'qwe' });
});

export default router;
