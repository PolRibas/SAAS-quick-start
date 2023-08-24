import { DynamicTableInterface } from "@saas-quick-start/platform/design/components/dynamic-table";
import { UserDataBase } from "./user.data";
import { CompanyDataBase } from "./company.data";

export const databaseData: {
  [key: string]: DynamicTableInterface & { icon: string }
} = {
  user: { ...UserDataBase, icon: 'ManageAccounts' },
  company: { ...CompanyDataBase, icon: 'WorkspacePremium' },
}
