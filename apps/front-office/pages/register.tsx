import { withAuth } from "@saas-quick-start/platform/context/presentation/react";
import {RegisterView} from "@saas-quick-start/platform/views/register/presentation/react";

export function RegisterPage() {
  return (
    <RegisterView />
  );
}

export default withAuth(RegisterPage, { requiresAuth: false });
