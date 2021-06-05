/* eslint-disable no-unused-vars */
import express from 'express';
import httpStatusCodes from 'http-status-codes';
import * as boardsService from './board.service.js';
import { errorHandler } from '../../common/helpers.js';

const router = express.Router();
const { StatusCodes } = httpStatusCodes;

const getAll = async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
};

const createBoard = async (req, res, next) => {
  const { title } = req.body;
  const data = { title };
  try {
    const board = boardsService.addBoard(data);
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const getBoard = async (req, res, next) => {
  const { id } = req.params;
  try {
    const board = await boardsService.getBoard(id);
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const updateBoard = async (req, res, next) => {
  // const data = req.body;
  const { title } = req.body;
  const data = { title };
  const { id } = req.params;
  try {
    const board = await boardsService.updateBoard(id, data);
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const deleteBoard = async (req, res, next) => {
  const { id } = req.params;
  try {
    await boardsService.deleteBoard(id);
    res.status(StatusCodes.OK).json({ message: 'Board was deleted' });
  } catch (error) {
    next(error);
  }
};

router.get('/', getAll);
router.post('/', createBoard);
router.get('/:id', getBoard);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);

export default router;
