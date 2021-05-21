import express from 'express';
import User from './user.model.js';
import * as usersService from './user.service.js';


const router = express.Router();

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

export default router;
