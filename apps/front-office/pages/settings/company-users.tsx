import { withAuth } from '@saas-quick-start/platform/context/presentation/react';
import { CompanyUsersView } from '@saas-quick-start/platform/views/settings/company-users/presentation/react';

export function SettingsPage() {
  return <CompanyUsersView baseUrl="http://localhost:5011" />;
}

export default withAuth(SettingsPage, {
  requiresAuth: true,
  requiresCompany: true,
});
