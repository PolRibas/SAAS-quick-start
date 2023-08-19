import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntityDto } from './company.entity.dto';

export class UserCompanyRoleDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({ required: false, type: CompanyEntityDto })
  @IsOptional()
  company?: CompanyEntityDto;
}

