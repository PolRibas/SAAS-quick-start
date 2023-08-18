import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntityInterface } from './company.entity';
import { FindByCriteriaResponseDto } from '@saas-quick-start/common/abstract/service';

export class CompanyEntityDto implements CompanyEntityInterface {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: 'company@gmail.com',
    description: 'The email of the Company',
    format: 'email',
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
    required: false
  })
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  updatedAt?: Date;
}

export class CompanyFindByCriteriaResponseDtoClass extends FindByCriteriaResponseDto {
  @ApiProperty({ description: 'Array of resulting items', type: [CompanyEntityDto] })
  items: CompanyEntityDto[];
}
