import { AuthContextType, IStoredTokens } from "@saas-quick-start/platform/context/presenters";

export const TOKENS_KEYS = '*/--';

export const defaultContext: AuthContextType = {
  user: null,
  loading: true,
  login: async (email: string, password: string) => {
    console.info('login')
  },
  logout: () => {
    return;
  },
  userTokens: {
    accessToken: null,
    refreshToken: null,
  },
  defaultPublicRoute: '/',
  defaultPrivateRoute: '/admin',
  getMe: async () => undefined,
  selectedCompany: null,
  companies: [],
};

export const getStoredTokens = (): IStoredTokens | null => {
  const item = localStorage.getItem(TOKENS_KEYS);
  return item ? JSON.parse(item) as IStoredTokens : null;
}

export const setStoredTokens = (tokens: IStoredTokens) => {
  localStorage.setItem(TOKENS_KEYS, JSON.stringify(tokens));
}

export const removeStoredTokens = () => {
  localStorage.removeItem(TOKENS_KEYS);
}
