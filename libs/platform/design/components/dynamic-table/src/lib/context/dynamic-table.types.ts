import {
  FindByCriteriaPresenterFilterCondition,
  FindByCriteriaPresenterResponse,
  FindByCriteriaPresenterRequest
} from "@saas-quick-start/platform/views/table/presenters";import { DynamicTableColumnInterface, DynamicTableInterface, DynamicTableItemInterface } from "../dynamic-table.interface";

export interface DataTableContextProps {
  tableData: DynamicTableItemInterface[];
  loading: boolean;
  tableHeaders: DynamicTableColumnInterface[]
  tableHeadersOptions: DynamicTableColumnInterface[]
  page: number;
  limit: number;
  total: number;
  sort: {
    key: string;
    order: "asc" | "desc" | undefined
  } | undefined;
  setPage: (item: number) => void;
  setLimit: (item: number) => void;
  setSort: (item: {
    key: string;
    order: 'asc' | 'desc' | undefined;
  } | undefined) => void;
  setSelectedRow: (item: number | undefined) => void;
  selectedRow: number | undefined;
  creatingItem: boolean;
  setCreatingItem: (item: boolean) => void;
  callDynamicTableSetData: () => void;
  fullConfig: DynamicTableInterface;
  selectedData: DynamicTableItemInterface;
  onCloseItem: () => void;
  deleteSelectedItem: () => Promise<void>;
  submitFormItem: (form: DynamicTableItemInterface) => Promise<void>;
  setConditions: (conditions: FindByCriteriaPresenterFilterCondition[] | undefined) => void;
}

export interface DataTableProviderProps {
  children: React.ReactNode;
  tableConfig: DynamicTableInterface;
  baseUrl: string;
  token: string | undefined;
}

export interface DataTableCacheItem {
  criteria: FindByCriteriaPresenterRequest['conditions'],
  page: number;
  limit: number;
  sort: {
    key: string;
    order: "asc" | "desc" | undefined
  } | undefined;
  result: FindByCriteriaPresenterResponse<DynamicTableItemInterface>
  conditions: FindByCriteriaPresenterFilterCondition[] | undefined
}
