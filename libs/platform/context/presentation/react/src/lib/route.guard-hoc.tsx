import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from './auth.context';

type WithAuthProps = {
  requiresAuth?: boolean;
  requiresCompany?: boolean;
};

export const withAuth = (
  WrappedComponent: React.FC,
  { requiresAuth = false, requiresCompany = false }: WithAuthProps
) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const [pageReady, setPageReady] = useState<boolean>(false);
    const {
      user,
      defaultPublicRoute,
      defaultPrivateRoute,
      loading,
      selectedCompany,
    } = React.useContext(AuthContext);

    React.useEffect(() => {
      if (requiresAuth && !user) {
        router.push(defaultPublicRoute);
      } else if (!requiresAuth && user) {
        router.push(defaultPrivateRoute);
      } else if (requiresCompany && user && !selectedCompany) {
        router.push('/create-company');
      } else {
        setPageReady(true);
      }
    }, [
      user,
      router,
      defaultPublicRoute,
      defaultPrivateRoute,
      selectedCompany,
    ]);

    return !loading && pageReady && <WrappedComponent {...props} />;
  };

  return Wrapper;
};
