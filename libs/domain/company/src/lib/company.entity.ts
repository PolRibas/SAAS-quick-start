export interface CompanyEntityInterface {
  id?: string;
  name: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CompanyEntity implements CompanyEntityInterface {
  public id?: string;
  public name: string;
  public address?: string;
  public email?: string;
  public phoneNumber?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(params: CompanyEntityInterface) {
    this.id = params.id;
    this.name = params.name;
    this.address = params.address;
    this.email = params.email;
    this.phoneNumber = params.phoneNumber;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
