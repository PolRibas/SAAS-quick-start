import { IAbstractMongooseFactory } from "@saas-quick-start/common/abstract/factory";
import { UserFactory } from "@saas-quick-start/infrastructure/database/adapters";
import { UserCompanyRoleModel, UserCompanyRoleSchemaInterface, UserSchemaInterface } from "@saas-quick-start/infrastructure/database/models";
import { CompanyUsersPresenter } from "@saas-quick-start/platform/views/settings/company-users/presenters";

export class CompanyUserCrudFactory
  implements IAbstractMongooseFactory<CompanyUsersPresenter, UserCompanyRoleSchemaInterface>
{
  domainToMongoose(domainCompany: CompanyUsersPresenter): UserCompanyRoleSchemaInterface {
    const { id, userId, companyId, role } =
      domainCompany;

    return new UserCompanyRoleModel({
      _id: id,
      userId,
      role,
      companyId,
    });
  }

  mongooseToDomain(mongooseCompany: UserCompanyRoleSchemaInterface): CompanyUsersPresenter {
    const { _id, userId, companyId, role } =
      mongooseCompany;

    if (!userId._id) {
      throw new Error('userId._id is not defined need to populate user')
    }

    const domainUser = new UserFactory().mongooseToDomain(userId as unknown as UserSchemaInterface)

    const item: CompanyUsersPresenter = {
      id: _id,
      userId: domainUser.id,
      companyId: companyId.toString(),
      role: role.toString(),
      email: domainUser.email,
      firstName: domainUser.firstName,
      lastName: domainUser.lastName,
      username: domainUser.username,
    }
    return item
  }
}
