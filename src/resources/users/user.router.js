import express from 'express';
import User from './user.model.js';
import * as usersService from './user.service.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll('users');
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = new User({ name, login, password });
  try {
    await usersService.addUser(user);
    res.json(User.toResponse(user));
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUser(id);
  res.json(User.toResponse(user));
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
