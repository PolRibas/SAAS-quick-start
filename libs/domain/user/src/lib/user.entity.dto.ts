import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntityInterface } from './user.entity';
import { FindByCriteriaResponseDto } from '@saas-quick-start/common/abstract/service';

export class UserEntityDto implements UserEntityInterface {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    example: 'pejman@gmail.com',
    description: 'The email of the User',
    format: 'email',
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    required: false,
    example: 'secret password change me!',
    description: 'The password of the User',
    format: 'string',
    minLength: 5,
    maxLength: 1024,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  password?: string;
}

export class UserFindByCriteriaResponseDtoClass extends FindByCriteriaResponseDto {
  @ApiProperty({ description: 'Array of resulting items', type: [UserEntityDto] })
  items: UserEntityDto[];
}
