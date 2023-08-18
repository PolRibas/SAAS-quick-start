import {
  DynamicFormApiParams,
  DynamicFormBaseField
} from "@saas-quick-start/platform/design/components/dynamic-form";
import { FindByCriteriaPresenterRequest, FindByCriteriaPresenterResponse } from "@saas-quick-start/platform/views/table/presenters";
import { AxiosResponse } from "axios";

export interface DynamicTableItemInterface {
  [key: string]: unknown;
}

export interface DynamicTableColumnInterface
  extends DynamicFormBaseField {
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  hiddenHeader?: boolean;
}

export type FilterType = 'text' | 'date' | 'dropdown' | 'range';

export interface DynamicTableBaseFilter {
  type: FilterType;
  key: string;
  label?: string;
}

export interface DynamicTableTextFilter extends DynamicTableBaseFilter {
  type: 'text';
  placeholder?: string;
}

export interface DynamicTableDateFilter extends DynamicTableBaseFilter {
  type: 'date';
  minDate?: Date;
  maxDate?: Date;
}

export interface DynamicTableDropdownFilter extends DynamicTableBaseFilter {
  type: 'dropdown';
  options: { value: string; label: string }[];
}

export interface DynamicTableRangeFilter extends DynamicTableBaseFilter {
  type: 'range';
  min: number;
  max: number;
}

export type DynamicTableFilter =
  DynamicTableTextFilter | DynamicTableDateFilter
  | DynamicTableDropdownFilter | DynamicTableRangeFilter;


export interface DynamicTableInterface {
  title: string;
  subtitle: string;
  columns: DynamicTableColumnInterface[];
  filters?: DynamicTableFilter[];
  findByCriteriaFunction: (
    apiParams: DynamicFormApiParams, params: FindByCriteriaPresenterRequest
  ) => Promise<AxiosResponse<FindByCriteriaPresenterResponse<DynamicTableItemInterface>>>;
  itemTitle?: (item: DynamicTableItemInterface) => string;
  itemSubtitle?: (item: DynamicTableItemInterface) => string;
  canUpdate?: boolean;  /* set permission to update */
  canDelete?: boolean;  /* set permission to delete */
  canCreate?: boolean;  /* set permission to create */
  updateFunction?: (apiParams: DynamicFormApiParams, item: DynamicTableItemInterface) => Promise<AxiosResponse<DynamicTableItemInterface>>;
  createFunction?: (apiParams: DynamicFormApiParams, item: DynamicTableItemInterface) => Promise<AxiosResponse<DynamicTableItemInterface>>;
  deleteFunction?: (apiParams: DynamicFormApiParams, id: string) => Promise<AxiosResponse<void>>;
  findByIdFunction?: (apiParams: DynamicFormApiParams, id: string) => Promise<AxiosResponse<DynamicTableItemInterface>>;
}
