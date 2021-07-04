import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

class User {
  public id: string;
  public name: string;
  public login: string;
  public password: string;

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
