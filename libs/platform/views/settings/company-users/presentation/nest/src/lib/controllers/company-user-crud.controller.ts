import { Controller } from '@nestjs/common';
import { CrudControllerMixin } from '@saas-quick-start/common/abstract/controller';
import { ApiTags } from '@nestjs/swagger';
import { FindByCriteriaUserCompanyRolePresenterDto, UserCompanyRolePresenterDto } from './data';
import { CompanyUserCrudService } from '../services';

@ApiTags('company-user-crud')
@Controller('company-user')
export class CompanyUserController extends CrudControllerMixin(
  UserCompanyRolePresenterDto,
  FindByCriteriaUserCompanyRolePresenterDto,
  'front-office',
  'company-user'
) {
  constructor(private readonly companyUserService: CompanyUserCrudService) {
    super(
      companyUserService
    );
  }
}
