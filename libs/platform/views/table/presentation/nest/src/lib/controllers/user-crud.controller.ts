import { Controller } from '@nestjs/common';
import { CrudControllerMixin } from '@saas-quick-start/common/abstract/controller';
import { ApiTags } from '@nestjs/swagger';
import { UserEntityDto, UserFindByCriteriaResponseDtoClass } from '@saas-quick-start/domain/user';
import { UserCrudService } from '../services';

@ApiTags('user-crud')
@Controller('user-crud')
export class UserCrudController extends CrudControllerMixin(
  UserEntityDto,
  UserFindByCriteriaResponseDtoClass,
  'back-office',
  'user'
) {
  constructor(private readonly userService: UserCrudService) {
    super(userService);
  }
}
