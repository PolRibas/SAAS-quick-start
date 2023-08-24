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
import { UserEntity, UserMenuEntity } from '@saas-quick-start/domain/user';
import { CompanyRoleSchemaInterface, CompanySchemaInterface, UserCompanyRoleSchemaInterface, UserSchemaInterface } from '@saas-quick-start/infrastructure/database/models';
import { CompanyFactory, UserFactory } from '@saas-quick-start/infrastructure/database/adapters';
import { AuthService } from '@saas-quick-start/platform/modules/security';
import { ContextCompanyPresenter, UserMenuPresenter } from '@saas-quick-start/platform/context/presenters';
import { messagesMenuCodes } from '@saas-quick-start/platform/messages';
import { CompanyPermissionsList } from '@saas-quick-start/domain/company';
import { IconNames } from '@saas-quick-start/platform/design/assets/constants';


@Injectable()
export class ContextServices extends AbstractCrudService<
  UserEntity,
  UserSchemaInterface
> {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserSchemaInterface>,
    @InjectModel('UserCompanyRole')
    private companyUser: Model<UserCompanyRoleSchemaInterface>,
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
    if (!user.password) {
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
      userMenu: this.getUserMenu(user)
    };
  }

  async login(req: Request, loginUserDto: { email: string; password: string }): Promise<{
    user: UserEntity;
    accessToken: string;
    refreshToken: string;
    userCompanies?: ContextCompanyPresenter[]
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
    const userCompanies = await this.findUserCompanies(user._id)
    return {
      user: this.transformToPlatformUser(user),
      accessToken: await this.authService.createAccessToken(user._id),
      refreshToken: await this.authService.createRefreshToken(req, user._id),
      userCompanies,
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
    const userCompanies = await this.findUserCompanies(userId)

    return {
      user: this.transformToPlatformUser(user),
      accessToken: await this.authService.createAccessToken(user._id),
      userCompanies,
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
      userMenu: this.getUserMenu(user)
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

  private async findUserCompanies(userId: string): Promise<ContextCompanyPresenter[]> {
    const userCompanies = await this.companyUser.find({ userId })
      .populate('companyId').populate('role');
    const companyFactory = new CompanyFactory()
    return await Promise.all(userCompanies.map(async (userCompany) => {
      const domainCompany = companyFactory.mongooseToDomain(userCompany.companyId as unknown as CompanySchemaInterface)
      const role = (userCompany.role as unknown as CompanyRoleSchemaInterface).name
      const permissions = (userCompany.role as unknown as CompanyRoleSchemaInterface).permissions
      return {
        ...domainCompany,
        role,
        permissions,
        accessToken: await this.authService.createCompanyAccessToken(userId, domainCompany.id),
        menu: this.getUserCompanyMenu({
          ...domainCompany,
          role,
          permissions,
          menu: []
        })
      }
    }))
  }

  // Todo Better to move this function to userMenuService
  private getUserMenu(user: UserSchemaInterface): UserMenuPresenter[] {
    const menus = [
      new UserMenuEntity({
        code: messagesMenuCodes.dashboard,
        order: 0,
        link: `/dashboard`,
        icon: 'Dashboard',
      }),
      new UserMenuEntity({
        code: messagesMenuCodes.tables,
        order: 1,
        link: `/table`,
        icon: 'ManageSearch',
      }),
    ]
    if (user.admin) {
      menus.push(
        new UserMenuEntity({
          code: messagesMenuCodes.user,
          order: 2,
          link: `/user`,
          icon: 'ManageAccounts',
        })
      )
    }
    return menus
  }

  // Todo Better to move this function to userMenuService
  private getUserCompanyMenu(company: ContextCompanyPresenter): UserMenuPresenter[] {
    const menus = [
      new UserMenuEntity({
        code: messagesMenuCodes.dashboard,
        order: 0,
        link: `/dashboard`,
        icon: 'Dashboard',
      }),
      new UserMenuEntity({
        code: messagesMenuCodes.settings,
        order: 10,
        link: `/settings`,
        icon: 'Settings',
      }),
    ]
    if (company.permissions.includes(CompanyPermissionsList.readCompanyAnalytics)) {
      menus.push(
        new UserMenuEntity({
          code: messagesMenuCodes.analytics,
          order: 9,
          link: `/analytics`,
          icon: 'Analytics',
        })
      )
    }
    return menus
  }
}
