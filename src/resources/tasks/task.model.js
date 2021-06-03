import { v4 as uuidv4 } from 'uuid';

class Task {
  constructor({
    id = uuidv4(),
    title = 'title',
    description = '',
    userId = null,
    boardId = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
  }
}

export default Task;
