import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: String;
  name: String;
  login: String;
  password: String;
}

class User {
  public id: String;
  public name: String;
  public login: String;
  public password: String;

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
