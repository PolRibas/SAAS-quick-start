import { ApiProperty } from '@nestjs/swagger';
import { FindByCriteriaResponseDto } from '@saas-quick-start/common/abstract/service';
import { CompanyRoleEntityDto, UserCompanyRoleDto } from '@saas-quick-start/domain/company';
import { CompanyRolePresenter, CompanyUsersPresenter } from '@saas-quick-start/platform/views/settings/company-users/presenters';

export class UserCompanyRolePresenterDto extends UserCompanyRoleDto implements CompanyUsersPresenter {
  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'user First Name' })
  firstName?: string;

  @ApiProperty({ description: 'user Last Name' })
  lastName?: string;

  @ApiProperty({ description: 'user username' })
  username?: string;
}

export class CompanyUsersDto extends CompanyRoleEntityDto implements CompanyRolePresenter { }

export class FindByCriteriaUserCompanyRolePresenterDto extends FindByCriteriaResponseDto {
  @ApiProperty({ description: 'Array of resulting items', type: [UserCompanyRolePresenterDto] })
  items: UserCompanyRolePresenterDto[];
}

export class FindByCriteriaCompanyUsersDto extends FindByCriteriaResponseDto {
  @ApiProperty({ description: 'Array of resulting items', type: [CompanyUsersDto] })
  items: CompanyUsersDto[];
}
