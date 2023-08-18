import { ApiProperty } from "@nestjs/swagger";
import { CompanyEntityDto } from "@saas-quick-start/domain/company";
import { ContextCompanyPresenter } from "@saas-quick-start/platform/context/presenters";
import { MenuDto } from "./user-menu.dto";
import { IsString } from "class-validator";

export class ContextCompanyDto extends CompanyEntityDto implements ContextCompanyPresenter {
  @ApiProperty({
    description: 'Permissions of the user for the company',
    isArray: true,
    type: 'string',
  })
  permissions: string[];

  @ApiProperty({
    description: 'Role of the user in the company',
    type: 'string',
  })
  @IsString()
  role: string;

  @ApiProperty({
    description: 'Role of the user in the company',
    type: [MenuDto],
  })
  menu: MenuDto[];
}
