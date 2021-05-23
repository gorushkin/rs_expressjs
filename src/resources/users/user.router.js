import express from 'express';
import User from './user.model.js';
import * as usersService from './user.service.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = new User({ name, login, password });
  console.log('user: ', User.toResponse(user));
  res.json(User.toResponse(user));
});

export default router;
