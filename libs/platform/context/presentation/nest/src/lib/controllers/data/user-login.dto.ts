import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MenuDto } from './user-menu.dto';
import { UserEntityDto } from '@saas-quick-start/domain/user';
import { ContextCompanyDto } from './company-roles.dto';

export class LoginUserRequestDto {
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

  @ApiProperty({
    example: 'secret password change me!',
    description: 'The password of the User',
    format: 'string',
    minLength: 5,
    maxLength: 1024,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  password: string;
}

export class LoginUserResponseDto {
  @ApiProperty({
    type: UserEntityDto,
  })
  user: UserEntityDto;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ type: MenuDto, isArray: true, required: false })
  userMenu?: MenuDto[];

  @ApiProperty({ type: ContextCompanyDto, isArray: true, required: false })
  userCompanies?: ContextCompanyDto[];
}
