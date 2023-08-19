import { CompanyRoleEntityInterface, UserCompanyRoleEntityInterface } from "@saas-quick-start/domain/company";

export interface CompanyUsersPresenter extends UserCompanyRoleEntityInterface {
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}


export type CompanyRolePresenter = CompanyRoleEntityInterface
