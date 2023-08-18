import { UserEntityInterface, UserMenuEntityInterface } from '@saas-quick-start/domain/user';
import { ContextApi } from '@saas-quick-start/infrastructure/open-api';
import { ContextCompanyPresenter } from '@saas-quick-start/platform/context/presenters';
import axios from 'axios';

export class ContextApiBrowserAdapter {
  private contextApi: ContextApi

  constructor(
    private baseURL: string,
  ) {
    ;
    this.baseURL = baseURL
    this.contextApi = new ContextApi(
      undefined,
      baseURL,
      axios.create(),
    )
  }

  register = async ({
    firstName,
    lastName,
    email,
    phoneNumber,
    username,
    password,
  }): Promise<boolean> => {
    throw new Error('Method not implemented.');
    await this.contextApi.contextControllerCreate({
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password,
    })

    return true
  };


  loginFunction = async (email: string, password: string): Promise<{
    tokens: {
      accessToken: string | null;
      refreshToken: string | null;
    };
    user: UserEntityInterface;
    userMenu: UserMenuEntityInterface[];
    userCompanies?: ContextCompanyPresenter[];
  }> => {
    const response = await this.contextApi.contextControllerAdminLogin({ email, password })
    const { accessToken, refreshToken, user, userMenu } = response.data;

    return {
      tokens: { accessToken, refreshToken },
      user: {
        ...user,
        updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined,
        createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
      },
      userMenu: userMenu || [],
    };
  };

  getMeFunction = async (refreshToken: string): Promise<{
    user: UserEntityInterface;
    accessToken: string;
    userMenu: UserMenuEntityInterface[];
    userCompanies?: ContextCompanyPresenter[];
  }> => {
    const response = await this.contextApi.contextControllerAdminRefreshAccessToken({ refreshToken })
    const { user, accessToken, userMenu } = response.data;

    return {
      accessToken: accessToken,
      user: {
        ...user,
        updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined,
        createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
      },
      userMenu: userMenu || [],
    };
  }
}
