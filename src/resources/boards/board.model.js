import { v4 as uuidv4 } from 'uuid';

class Board {
  constructor({
    id = uuidv4(),
    title = 'title',
  } = {}) {
    this.id = id;
    this.title = title;
  }

}

export default Board;
