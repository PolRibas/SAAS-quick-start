import { withAuth } from "@saas-quick-start/platform/context/presentation/react";

export function DashboardHome() {
  return (
    <>
      <h2>404</h2>
    </>
  );
}

export default withAuth(DashboardHome, { requiresAuth: true });
