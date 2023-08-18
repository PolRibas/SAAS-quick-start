import { withAuth } from "@saas-quick-start/platform/context/presentation/react";
import { AdminTableView } from '@saas-quick-start/platform/views/table/presentation/react';

export function TableSlug() {
  return <AdminTableView baseUrl={'http://localhost:5011'} />;
}

export default withAuth(TableSlug, { requiresAuth: true });
