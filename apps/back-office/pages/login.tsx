import { withAuth } from "@saas-quick-start/platform/context/presentation/react";
import { LoginView } from "@saas-quick-start/platform/views/login/presentation/react";

export const LoginPage = () => {
  return <LoginView />;
};

export default withAuth(LoginPage, { requiresAuth: false });
