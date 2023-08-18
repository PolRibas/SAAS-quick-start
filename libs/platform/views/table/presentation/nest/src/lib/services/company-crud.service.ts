import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractCrudService } from '@saas-quick-start/common/abstract/service';
import { CompanyEntity } from '@saas-quick-start/domain/company';
import { CompanyFactory } from '@saas-quick-start/infrastructure/database/adapters';
import { CompanySchemaInterface } from '@saas-quick-start/infrastructure/database/models';
import { Model } from 'mongoose';


@Injectable()
export class CompanyCrudService extends AbstractCrudService<
  CompanyEntity,
  CompanySchemaInterface
> {
  constructor(
    @InjectModel('Company')
    companyModel: Model<CompanySchemaInterface>,
  ) {
    super(companyModel, new CompanyFactory());
  }

  async create(entity: CompanyEntity): Promise<CompanyEntity> {
    throw new ConflictException('Register Company for create: ' + entity.name);
  }
}
