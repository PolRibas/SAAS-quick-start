import { Injectable } from '@nestjs/common';
import { IAbstractMongooseFactory } from '@saas-quick-start/common/abstract/factory';
import { CompanyRoleEntity } from '@saas-quick-start/domain/company';
import {
  CompanyRoleSchemaInterface,
  CompanyRoleModel
} from '@saas-quick-start/infrastructure/database/models';

@Injectable()
export class CompanyRoleFactory
  implements IAbstractMongooseFactory<CompanyRoleEntity, CompanyRoleSchemaInterface>
{
  domainToMongoose(domainPermissions: CompanyRoleEntity): CompanyRoleSchemaInterface {
    const { id, companyId, name, permissions, createdAt, updatedAt } = domainPermissions;
    return new CompanyRoleModel({
      _id: id,
      companyId,
      name,
      permissions,
      createdAt,
      updatedAt,
    });
  }

  mongooseToDomain(mongoosePermissions: CompanyRoleSchemaInterface): CompanyRoleEntity {
    const { _id, companyId, name, permissions, createdAt, updatedAt } = mongoosePermissions;
    return new CompanyRoleEntity({
      id: _id,
      companyId: companyId.toString(),
      name,
      permissions,
      createdAt,
      updatedAt,
    });
  }
}

