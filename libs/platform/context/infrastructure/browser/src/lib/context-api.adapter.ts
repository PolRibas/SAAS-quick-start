import { UserEntityInterface, UserMenuEntityInterface } from '@saas-quick-start/domain/user';
import { ContextApi } from '@saas-quick-start/infrastructure/open-api';
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
  }> => {
    const response = await this.contextApi.contextControllerLogin({ email, password })
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
  }> => {
    const response = await this.contextApi.contextControllerRefreshAccessToken({ refreshToken })
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
