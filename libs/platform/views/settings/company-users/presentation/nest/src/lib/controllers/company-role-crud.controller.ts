import { Controller } from '@nestjs/common';
import { CrudControllerMixin } from '@saas-quick-start/common/abstract/controller';
import { ApiTags } from '@nestjs/swagger';
import { CompanyUsersDto, FindByCriteriaCompanyUsersDto } from './data';
import { CompanyRoleCrudService } from '../services';

@ApiTags('company-role-crud')
@Controller('company-role-crud')
export class CompanyRoleCrudController extends CrudControllerMixin(
  CompanyUsersDto,
  FindByCriteriaCompanyUsersDto,
  'front-office',
  'company-role'
) {
  constructor(private readonly companyRoleService: CompanyRoleCrudService) {
    super(
      companyRoleService
    );
  }
}
