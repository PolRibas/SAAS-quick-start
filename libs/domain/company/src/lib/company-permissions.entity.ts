export interface CompanyRoleEntityInterface {
  id?: string;
  companyId: string;
  name: string;
  permissions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class CompanyRoleEntity implements CompanyRoleEntityInterface {
  public id?: string;
  public companyId: string;
  public name: string;
  public permissions: string[];
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(params: CompanyRoleEntityInterface) {
    this.id = params.id;
    this.companyId = params.companyId;
    this.name = params.name;
    this.permissions = params.permissions;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}

