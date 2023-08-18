// company.controller.ts
import { Controller } from '@nestjs/common';
import { CompanyCrudService } from '../services';
import { CrudControllerMixin } from '@saas-quick-start/common/abstract/controller';
import { CompanyEntityDto, CompanyFindByCriteriaResponseDtoClass } from '@saas-quick-start/domain/company';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('company-crud')
@Controller('company-crud')
export class CompanyCrudController extends CrudControllerMixin(
  CompanyEntityDto,
  CompanyFindByCriteriaResponseDtoClass,
  'back-office',
  'company'
) {
  constructor(private readonly companyService: CompanyCrudService) {
    super(companyService);
  }
}
