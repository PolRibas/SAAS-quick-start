import { withAuth } from "@saas-quick-start/platform/context/presentation/react";

export function Index() {
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}

export default withAuth(Index, { requiresAuth: false });
