import { withAuth } from "@saas-quick-start/platform/context/presentation/react";

export function SettingsPage() {
  return (
    <>
      <h2>Dashboard Home</h2>
    </>
  );
}

export default withAuth(SettingsPage, { requiresAuth: true, requiresCompany: true });
