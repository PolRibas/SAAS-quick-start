import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  defaultContext,
  getStoredTokens,
  setStoredTokens,
  removeStoredTokens,
} from './auth.context.constants';
import { useRouter } from 'next/router';
import { DesignLayout } from './layout';
import { UserEntityInterface, UserMenuEntityInterface } from '@saas-quick-start/domain/user';
import { AuthContextType } from '@saas-quick-start/platform/context/presenters';
import { ContextApiBrowserAdapter, FrontOfficeContextApiBrowserAdapter } from '@saas-quick-start/platform/context/infrastructure/browser';

export interface AuthProviderProps {
  children: ReactNode;
  services: ContextApiBrowserAdapter | FrontOfficeContextApiBrowserAdapter;
  defaultPublicRoute: string;
  defaultPrivateRoute: string;
}
export const AuthContext = createContext<AuthContextType>(defaultContext);

const noneLayoutRoutes = ['/create-company'];

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  services,
  defaultPublicRoute,
  defaultPrivateRoute,
}) => {
  const [user, setUser] = useState<UserEntityInterface | null>(null);
  // const [companies, setCompanies] = useState<companiesRoles[]>([]);
  // const [selectedCompany, setSelectedCompany] = useState<
  //   companiesRoles | undefined
  // >(undefined);
  const [userMenu, setUserMenu] = useState<UserMenuEntityInterface[]>([]);
  const { pathname } = useRouter();

  const [userTokens, setUserTokens] = useState<{
    accessToken: string | null;
    refreshToken: string | null;
  }>({
    accessToken: null,
    refreshToken: null,
  });

  const [loading, setLoading] = useState<boolean>(true);

  const getMe = useCallback(() => {
    const storedTokens = getStoredTokens();
    if (storedTokens && storedTokens.refreshToken) {
      return services
        .getMeFunction(storedTokens.refreshToken)
        .then(({ user, accessToken, userMenu }) => {
          if (user) {
            const tokens = {
              accessToken,
              refreshToken: storedTokens.refreshToken,
            };
            setUser(user);
            setUserTokens(tokens);
            setStoredTokens(tokens);
            setUserMenu(userMenu);
            // if (companies) {
            //   setCompanies(companies);
            //   if (companies.length > 0) {
            //     setSelectedCompany(companies[0]);
            //   }
            // }
          } else {
            setUser(null);
            removeStoredTokens();
          }
        })
        .catch((error) => {
          setUser(null);
          removeStoredTokens();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      return Promise.resolve();
    }
  }, [services]);

  useEffect(() => {
    getMe();
  }, [getMe]);

  const login = useCallback(
    async (email: string, password: string) => {
      services
        .loginFunction(email, password)
        .then(({ user, tokens, userMenu }) => {
          if (user) {
            setUser(user);
            setUserTokens(tokens);
            setStoredTokens(tokens);
            setUserMenu(userMenu);
            // if (companies) {
            //   setCompanies(companies);
            //   if (companies.length > 0) {
            //     setSelectedCompany(companies[0]);
            //   }
            // }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [services]
  );

  const logout = useCallback(() => {
    setUser(null);
    removeStoredTokens();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        userTokens,
        defaultPublicRoute,
        defaultPrivateRoute,
        // companies,
        getMe,
        // selectedCompany,
        registerService: services.register ?? undefined,
      }}
    >
      {loading ? null : user && !noneLayoutRoutes.includes(pathname) ? (
        <DesignLayout userMenu={userMenu}>{children}</DesignLayout>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
