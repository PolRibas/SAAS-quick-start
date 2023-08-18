import { Injectable } from '@nestjs/common';
import { IAbstractMongooseFactory } from '@saas-quick-start/common/abstract/factory';
import { UserCompanyRoleEntity } from '@saas-quick-start/domain/company';
import {
  UserCompanyRoleSchemaInterface,
  UserCompanyRoleModel
} from '@saas-quick-start/infrastructure/database/models';

@Injectable()
export class UserCompanyRoleFactory
  implements IAbstractMongooseFactory<UserCompanyRoleEntity, UserCompanyRoleSchemaInterface>
{
  domainToMongoose(domainPermissions: UserCompanyRoleEntity): UserCompanyRoleSchemaInterface {
    const { id, companyId, role, userId } = domainPermissions;
    return new UserCompanyRoleModel({
      _id: id,
      companyId,
      userId,
      role
    });
  }

  mongooseToDomain(mongoosePermissions: UserCompanyRoleSchemaInterface): UserCompanyRoleEntity {
    const { _id, companyId, userId, role } = mongoosePermissions;
    return new UserCompanyRoleEntity({
      id: _id,
      userId: userId.toString(),
      companyId: companyId.toString(),
      role: role.toString(),
    });
  }
}

