import { ApiProperty } from "@nestjs/swagger";
import { CompanyEntityDto } from "@saas-quick-start/domain/company";

export class FrontOfficeCompanyCreateRequestDto extends CompanyEntityDto { }

export class FrontOfficeCompanyCreateResponseDto {
  @ApiProperty({ type: CompanyEntityDto })
  company: CompanyEntityDto;

  @ApiProperty()
  role: string;

  @ApiProperty()
  permissions: string[];
}

