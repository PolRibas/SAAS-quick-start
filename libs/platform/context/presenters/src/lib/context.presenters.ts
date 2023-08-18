import { UserEntityInterface } from "@saas-quick-start/domain/user";
import { Request } from 'express';

export interface IStoredTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface RegisterContextRequestType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
}

export interface AuthContextBackEndFunctionsType {
  login: (
    email: string,
    password: string,
    req?: Request
  ) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
  registerService?: (object: RegisterContextRequestType) => Promise<boolean>;
}

export interface AuthContextType extends AuthContextBackEndFunctionsType {
  user: UserEntityInterface | null;
  loading: boolean;
  defaultPublicRoute: string;
  defaultPrivateRoute: string;
  userTokens: IStoredTokens
}

// export interface AuthProviderProps {
//   children: ReactNode;
//   services: ApplicationsSheeredAuthServices;
//   defaultPublicRoute: string;
//   defaultPrivateRoute: string;
// }
