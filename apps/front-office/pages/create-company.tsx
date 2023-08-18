import { withAuth } from '@saas-quick-start/platform/context/presentation/react';
import { CreateCompanyView } from '@saas-quick-start/platform/views/create-company/presentation/react';

export function CreateCompanyPage() {
  return <CreateCompanyView baseUrl={'http://localhost:5011'} />;
}

export default withAuth(CreateCompanyPage, { requiresAuth: true });
