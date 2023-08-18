import { Injectable } from '@nestjs/common';
import { IAbstractMongooseFactory } from '@saas-quick-start/common/abstract/factory';
import { CompanyPermissionsEntity } from '@saas-quick-start/domain/company';
import {
  CompanyPermissionsSchemaInterface,
  CompanyPermissionsModel
} from '@saas-quick-start/infrastructure/database/models';

@Injectable()
export class CompanyPermissionsFactory
  implements IAbstractMongooseFactory<CompanyPermissionsEntity, CompanyPermissionsSchemaInterface>
{
  domainToMongoose(domainPermissions: CompanyPermissionsEntity): CompanyPermissionsSchemaInterface {
    const { id, companyId, name, permissions, createdAt, updatedAt } = domainPermissions;
    return new CompanyPermissionsModel({
      _id: id,
      companyId,
      name,
      permissions,
      createdAt,
      updatedAt,
    });
  }

  mongooseToDomain(mongoosePermissions: CompanyPermissionsSchemaInterface): CompanyPermissionsEntity {
    const { _id, companyId, name, permissions, createdAt, updatedAt } = mongoosePermissions;
    return new CompanyPermissionsEntity({
      id: _id,
      companyId: companyId.toString(),
      name,
      permissions,
      createdAt,
      updatedAt,
    });
  }
}

