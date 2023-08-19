import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractCrudService, } from '@saas-quick-start/common/abstract/service';
import { CompanyRoleEntity, } from '@saas-quick-start/domain/company';
import { CompanyRoleFactory } from '@saas-quick-start/infrastructure/database/adapters';
import { CompanyRoleSchemaInterface } from '@saas-quick-start/infrastructure/database/models';
import { CompanyRolePresenter } from '@saas-quick-start/platform/views/settings/company-users/presenters';
import { Model } from 'mongoose';


@Injectable()
export class CompanyRoleCrudService extends AbstractCrudService<
  CompanyRoleEntity,
  CompanyRoleSchemaInterface
> {
  constructor(
    @InjectModel('CompanyRole')
    private companyPermissions: Model<CompanyRoleSchemaInterface>,
  ) {
    super(companyPermissions, new CompanyRoleFactory())
  }

  async create(entity: CompanyRolePresenter): Promise<CompanyRolePresenter> {
    return super.create(entity)
  }
}

