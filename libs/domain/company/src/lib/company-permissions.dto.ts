import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyPermissionsEntityDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  permissions: string[];

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt?: Date;
}
