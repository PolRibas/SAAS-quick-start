import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MenuDto } from './user-menu.dto';
import { UserEntityDto } from '@saas-quick-start/domain/user';

export class RefreshAccessTokenRequestDto {
  @ApiProperty({
    description: 'uuid for refresh token',
    format: 'uuid',
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsUUID()
  readonly refreshToken: string;
}

export class RefreshAccessTokenResponseDto {
  @ApiProperty({
    type: UserEntityDto,
  })
  user: UserEntityDto;

  @ApiProperty()
  accessToken: string;

  @ApiProperty({ type: MenuDto, isArray: true, required: false })
  userMenu?: MenuDto[];
}
