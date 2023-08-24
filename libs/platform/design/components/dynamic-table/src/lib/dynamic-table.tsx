import React from 'react';
import { DataTableProvider } from './context';
import {
  DynamicTableComponent,
  DynamicTableFiltersComponent,
  DynamicTableItemComponent,
  DynamicTablePaginationComponent,
} from './components';
import { DynamicTableInterface } from './dynamic-table.interface';

export const DynamicTable: React.FC<{
  dynamicTable: DynamicTableInterface;
  baseUrl: string;
  token: string | undefined;
  filterSlot?: React.ReactNode;
}> = ({ dynamicTable, baseUrl, token, filterSlot }) => {
  return (
    <DataTableProvider
      tableConfig={dynamicTable}
      baseUrl={baseUrl}
      token={token}
    >
      <DynamicTableFiltersComponent filterSlot={filterSlot} />
      <DynamicTableComponent />
      <DynamicTablePaginationComponent />
      <DynamicTableItemComponent />
    </DataTableProvider>
  );
};
