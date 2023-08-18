import {
  Delete,
  Param,
  Post,
  Put,
  Body,
  Req,
  UseGuards,
  NotFoundException,
  Controller,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  LoginUserRequestDto,
  LoginUserResponseDto,
  UserCreateRequestDto,
  UserCreateResponseDto,
  UserUpdateRequestDto,
  UserUpdateResponseDto,
  RefreshAccessTokenRequestDto,
  RefreshAccessTokenResponseDto,
} from './data';
import { IAbstractCrud } from '@saas-quick-start/common/abstract/service';
import { UserEntity } from '@saas-quick-start/domain/user';
import { ContextServices } from '../services';

@ApiTags('context')
@Controller('context')
export class ContextController implements Partial<IAbstractCrud<UserEntity>> {
  constructor(private readonly contextService: ContextServices) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    type: UserCreateResponseDto,
    description: 'The user has been successfully created.',
  })
  async create(
    @Body() createUserDto: UserCreateRequestDto,
  ): Promise<UserCreateResponseDto> {
    return this.contextService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({
    status: 200,
    type: LoginUserResponseDto,
    description: 'This user is Logged in.',
  })
  async login(
    @Req() req: Request,
    @Body() loginUserDto: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    return await this.contextService.login(req, loginUserDto);
  }

  @Post('admin-login')
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({
    status: 200,
    type: LoginUserResponseDto,
    description: 'This user is Logged in.',
  })
  async adminLogin(
    @Req() req: Request,
    @Body() loginUserDto: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    return await this.contextService.adminLogin(req, loginUserDto);
  }

  @Post('refresh-access-token')
  @ApiOperation({
    summary: 'Refresh Access Token with refresh token',
  })
  @ApiResponse({
    status: 200,
    type: RefreshAccessTokenResponseDto,
    description: 'The access token has been successfully refreshed.',
  })
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenRequestDto,
  ) {
    return await this.contextService.refreshAccessToken(refreshAccessTokenDto);
  }
  @Post('admin-refresh-access-token')
  @ApiOperation({
    summary: 'Refresh Access Token with refresh token',
  })
  @ApiResponse({
    status: 200,
    type: RefreshAccessTokenResponseDto,
    description: 'The access token has been successfully refreshed.',
  })
  async adminRefreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenRequestDto,
  ) {
    return await this.contextService.adminRefreshAccessToken(refreshAccessTokenDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserUpdateResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserUpdateRequestDto,
  ): Promise<UserUpdateResponseDto> {
    const user = await this.contextService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 404, description: 'User not found.' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.contextService.delete(id);
  }
}
