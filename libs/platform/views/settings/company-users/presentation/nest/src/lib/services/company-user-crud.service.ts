import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractCrudService } from '@saas-quick-start/common/abstract/service';
import { UserCompanyRoleSchemaInterface, } from '@saas-quick-start/infrastructure/database/models';
import { CompanyUsersPresenter } from '@saas-quick-start/platform/views/settings/company-users/presenters';
import { Model } from 'mongoose';
import { CompanyUserCrudFactory } from '../functions';


@Injectable()
export class CompanyUserCrudService extends AbstractCrudService<
  CompanyUsersPresenter,
  UserCompanyRoleSchemaInterface
> {
  constructor(
    @InjectModel('UserCompanyRole')
    private companyUser: Model<UserCompanyRoleSchemaInterface>,
  ) {
    super(companyUser, new CompanyUserCrudFactory(), ['userId'])
  }

  async create(entity: CompanyUsersPresenter): Promise<CompanyUsersPresenter> {
    throw new Error('Method not implemented. use another method for create: ' + entity.email);
  }

  async findAll(): Promise<CompanyUsersPresenter[]> {
    throw new Error('Method not implemented.');
  }
}

