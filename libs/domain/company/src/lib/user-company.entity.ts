import { CompanyEntity } from "./company.entity";

export interface UserCompanyRoleEntityInterface {
  id?: string;
  userId: string;
  companyId: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  company?: CompanyEntity;
}

export class UserCompanyRoleEntity implements UserCompanyRoleEntityInterface {
  public id?: string;
  public userId: string;
  public companyId: string;
  public role: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public company?: CompanyEntity;

  constructor(params: UserCompanyRoleEntityInterface) {
    this.id = params.id;
    this.userId = params.userId;
    this.companyId = params.companyId;
    this.role = params.role;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.company = params.company;
  }
}

