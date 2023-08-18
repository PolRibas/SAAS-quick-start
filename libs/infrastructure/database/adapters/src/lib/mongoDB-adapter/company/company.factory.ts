import { Injectable } from '@nestjs/common';
import { IAbstractMongooseFactory } from '@saas-quick-start/common/abstract/factory';
import { CompanyEntity } from '@saas-quick-start/domain/company';
import { CompanySchemaInterface, CompanyModel } from '@saas-quick-start/infrastructure/database/models';

@Injectable()
export class CompanyFactory
  implements IAbstractMongooseFactory<CompanyEntity, CompanySchemaInterface>
{
  domainToMongoose(domainCompany: CompanyEntity): CompanySchemaInterface {
    const { id, name, address, email, phoneNumber, createdAt, updatedAt } =
      domainCompany;
    return new CompanyModel({
      _id: id,
      name,
      address,
      email,
      phoneNumber,
      createdAt,
      updatedAt,
    });
  }

  mongooseToDomain(mongooseCompany: CompanySchemaInterface): CompanyEntity {
    const { _id, name, address, email, phoneNumber, createdAt, updatedAt } =
      mongooseCompany;
    return new CompanyEntity({
      id: _id,
      name,
      address,
      email,
      phoneNumber,
      createdAt,
      updatedAt,
    });
  }
}
