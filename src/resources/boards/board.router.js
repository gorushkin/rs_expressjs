import express from 'express';
import Board from './board.model.js';
import * as boardsService from './board.service.js';

const router = express.Router();

const errorHandler = async (cb, ...data) => {
  try {
    const response = (await cb(...data)) || { message: 'ok!!!' };
    return response;
  } catch (error) {
    return { message: error.message };
  }
};

router.route('/').get(async (req, res) => {
  const response = await errorHandler(boardsService.getAll);
  res.json(response);
});

router.route('/').post(async (req, res) => {
  const { title } = req.body;
  const board = new Board({ title });
  const response = await errorHandler(boardsService.addBoard, board);
  res.json(response);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const response = await errorHandler(boardsService.getBoard, id);
  res.json(response);
});

router.route('/:id').put(async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const response = await errorHandler(boardsService.updateBoard, id, { title });
  res.json(response);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const response = await errorHandler(boardsService.deleteBoard, id);
  res.json(response);
});

export default router;
