import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AbstractCrudService } from '@saas-quick-start/common/abstract/service';
import { UserEntity } from '@saas-quick-start/domain/user';
import { UserSchemaInterface } from '@saas-quick-start/infrastructure/database/models';
import { UserFactory } from '@saas-quick-start/infrastructure/database/adapters';
import { AuthService } from '@saas-quick-start/platform/modules/security';

@Injectable()
export class ContextServices extends AbstractCrudService<
  UserEntity,
  UserSchemaInterface
> {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserSchemaInterface>,
    private readonly authService: AuthService,
  ) {
    super(userModel, new UserFactory());
  }

  async adminLogin(req: Request, loginUserDto: { email: string; password: string }) {
    const user = await this.findUserByEmail(loginUserDto.email);
    if (!user) {
      throw new BadRequestException('Bad request');
    }
    if (!user.admin) {
      throw new UnauthorizedException();
    }
    if(!user.password){
      throw new UnauthorizedException();
    }
    const correctPassword = await this.checkPassword(
      loginUserDto.password,
      user.password,
    );
    if (!correctPassword) {
      throw new UnauthorizedException();
    }
    return {
      user: this.transformToPlatformUser(user),
      accessToken: await this.authService.createAccessToken(user._id),
      refreshToken: await this.authService.createRefreshToken(req, user._id),
      // userMenu: this.userMenuService.getUserMenu(user, 'admin')
    };
  }

  async login(req: Request, loginUserDto: { email: string; password: string }) : Promise<{
    user: UserEntity;
    accessToken: string;
    refreshToken: string;
}> {
    const user = await this.findUserByEmail(loginUserDto.email);
    if (!user || !user.password) {
      throw new BadRequestException('Bad request');
    }
    const correctPassword = await this.checkPassword(
      loginUserDto.password,
      user.password,
    );
    if (!correctPassword) {
      throw new UnauthorizedException();
    }
    return {
      user: this.transformToPlatformUser(user),
      accessToken: await this.authService.createAccessToken(user._id),
      refreshToken: await this.authService.createRefreshToken(req, user._id),
      // userMenu: this.userMenuService.getUserMenu(user, 'saas')
    };
  }

  async refreshAccessToken(refreshAccessTokenDto: { refreshToken: string }) {
    const userId = await this.authService.findRefreshToken(
      refreshAccessTokenDto.refreshToken,
    );
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('Bad request');
    }
    return {
      user: this.transformToPlatformUser(user),
      accessToken: await this.authService.createAccessToken(user._id),
      // userMenu: this.userMenuService.getUserMenu(user, 'saas')
    };
  }

  async adminRefreshAccessToken(refreshAccessTokenDto: { refreshToken: string }) {
    const userId = await this.authService.findRefreshToken(
      refreshAccessTokenDto.refreshToken,
    );
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('Bad request');
    }
    if (!user.admin) {
      throw new UnauthorizedException();
    }

    return {
      user: this.transformToPlatformUser(user),
      accessToken: await this.authService.createAccessToken(user._id),
      // userMenu: this.userMenuService.getUserMenu(user, 'admin')
    };
  }

  override async create(createUserDto: UserEntity): Promise<UserEntity> {
    const user = await this.userModel.findOne({
      $or: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });
    if (user) {
      throw new NotAcceptableException();
    }
    let hashedPassword: string | undefined;
    if (createUserDto.password) {
      hashedPassword = await this.encryptPassword(createUserDto.password);
    }
    const userToSave = { ...createUserDto, password: hashedPassword };
    const newUser = new this.userModel(this.factory.domainToMongoose(userToSave));
    await newUser.save();
    return this.factory.mongooseToDomain(newUser);
  }

  //! Do never Change this function !!!important!!!
  private async encryptPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  }

  private async findUserByEmail(
    emailOrUsername: string,
  ): Promise<UserSchemaInterface> {
    const user = await this.userModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }


  private async checkPassword(
    attemptPass: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(attemptPass, userPassword);
  }

  private transformToPlatformUser(user: UserSchemaInterface): UserEntity {
    const domainUser = this.factory.mongooseToDomain(user);
    return {
      ...domainUser,
      password: undefined,
    }
  }
}
