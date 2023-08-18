import { withAuth } from "@saas-quick-start/platform/context/presentation/react";

export function DashboardHome() {
  return (
    <>
      <h2>Dashboard Home</h2>
    </>
  );
}

export default withAuth(DashboardHome, { requiresAuth: true, requiresCompany: true });
