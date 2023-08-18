export interface UserEntityInterface {
  id?: string;
  firstName?: string;
  username?: string;
  password?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity implements UserEntityInterface {
  public id?: string;
  public email: string;
  public firstName?: string;
  public lastName?: string;
  public phoneNumber?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public username?: string;
  public password?: string;

  constructor(params: UserEntityInterface) {
    this.id = params.id;
    this.email = params.email;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.username = params.username;
    this.password = params.password;
    this.phoneNumber = params.phoneNumber;
  }
}
