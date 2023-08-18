import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  DataTableCacheItem,
  DataTableContextProps,
  DataTableProviderProps,
} from './dynamic-table.types';
import {
  DynamicTableColumnInterface,
  DynamicTableItemInterface,
} from '../dynamic-table.interface';
import {
  DynamicTableFindById,
  DynamicTableSetStartSettings,
  DynamicTableCreateItem,
  DynamicTableDeleteItem,
  DynamicTableUpdateItem,
} from './dynamic-table.factory';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { FindByCriteriaResponse } from '@saas-quick-start/common/abstract/service';
import { FindByCriteriaPresenterFilterCondition } from '@saas-quick-start/platform/views/table/presenters';

const defaultContextValue = {
  tableData: [],
  loading: false,
  tableHeaders: [],
  tableHeadersOptions: [],
  page: 0,
  limit: 10,
  total: 0,
  sort: undefined,
  setPage: () => undefined,
  setLimit: () => undefined,
  setSort: () => undefined,
  onCloseItem: () => undefined,
  setSelectedRow: () => undefined,
  callDynamicTableSetData: () => undefined,
  selectedRow: undefined,
  creatingItem: false,
  setCreatingItem: () => undefined,
  setConditions: () => undefined,
  fullConfig: {
    title: '',
    subtitle: '',
    columns: [],
    findByCriteriaFunction: () =>
      undefined as unknown as Promise<
        AxiosResponse<FindByCriteriaResponse<DynamicTableItemInterface>>
      >,
  },
  selectedData: {},
  deleteSelectedItem: async () => undefined,
  submitFormItem: async () => undefined,
};

const DataTableContext =
  createContext<DataTableContextProps>(defaultContextValue);

export const DataTableProvider: React.FC<DataTableProviderProps> = ({
  children,
  tableConfig,
  baseUrl,
  token,
}) => {
  const [tableData, setTableData] = useState<DynamicTableItemInterface[]>([]);
  const [tableHeaders, setTableHeaders] = useState<
    DynamicTableColumnInterface[]
  >([]);
  const [tableCacheData, setTablaCacheData] = useState<DataTableCacheItem[]>(
    []
  );
  const [tableHeadersOptions, setTableHeadersOptions] = useState<
    DynamicTableColumnInterface[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [selectedData, setSelectedData] = useState<DynamicTableItemInterface>(
    {}
  );
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);
  const [creatingItem, setCreatingItem] = useState<boolean>(false);
  const [conditions, setConditions] = useState<FindByCriteriaPresenterFilterCondition[] | undefined>(undefined);
  const [sort, setSort] = useState<
    | {
        key: string;
        order: 'asc' | 'desc' | undefined;
      }
    | undefined
  >({ key: tableConfig.columns[0].field, order: 'asc' });
  const router = useRouter();

  const callDynamicTableSetStartSettings = (skipCache?: boolean) => {
    DynamicTableSetStartSettings({
      tableConfig,
      baseUrl,
      token,
      limit,
      skipCache: !!skipCache,
      page,
      sort,
      setLoading,
      setTablaCacheData,
      setTotal,
      tableHeaders,
      setTableHeadersOptions,
      tableCacheData,
      setTableData,
      setTableHeaders,
      conditions,
      callback: () => {
        if (router.query.id) {
          const index = tableData.findIndex(
            (item) => item.id === router.query.id
          );
          if (index !== -1) {
            onSetSelectedRow(index);
          }
        }
      },
    });
  };

  useEffect(() => {
    callDynamicTableSetStartSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl, limit, page, sort, tableConfig, token, tableHeaders, conditions]);

  const onCloseItem = () => {
    router.push({
      pathname: router.pathname,
      query: Object.keys(router.query).reduce(
        (acc: { [key: string]: string }, key: string) => {
          if (key !== 'id') {
            acc[key] = router.query[key] as string;
          }
          return acc;
        },
        {}
      ),
    });
    setSelectedRow(undefined);
  };

  const deleteSelectedItem = async () => {
    if (selectedRow || selectedRow === 0) {
      DynamicTableDeleteItem({
        tableConfig,
        baseUrl,
        token,
        selectedData,
        onFinish: () => {
          setTablaCacheData([]);
          onCloseItem();
        },
      });
    }
  };
  const submitFormItem = async (data: DynamicTableItemInterface) => {
    const onFinishFunction = () => {
      setTablaCacheData([]);
      setCreatingItem(false);
      setSelectedData({});
      onCloseItem();
    };
    setLoading(true);
    if (selectedRow || selectedRow === 0) {
      DynamicTableUpdateItem({
        tableConfig,
        baseUrl,
        token,
        selectedData: data,
        onFinish: onFinishFunction,
      });
    } else {
      DynamicTableCreateItem({
        selectedData: data,
        tableConfig,
        baseUrl,
        token,
        onFinish: onFinishFunction,
      });
    }
  };

  const onSetSelectedRow = (index?: number) => {
    if (index || index === 0) {
      DynamicTableFindById({
        tableConfig,
        baseUrl,
        token,
        id: tableData[index].id as string,
        setLoading,
        tableData,
        onFinish: () => setSelectedRow(index),
        setSelectedData,
        pushId: (id: string) => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, id },
          });
        },
      });
    } else {
      setSelectedRow(undefined);
    }
  };

  return (
    <DataTableContext.Provider
      value={{
        tableData,
        loading,
        tableHeaders,
        page,
        limit,
        total,
        tableHeadersOptions,
        sort,
        setPage,
        setLimit,
        setSort,
        setSelectedRow: onSetSelectedRow,
        selectedRow,
        creatingItem,
        setCreatingItem,
        fullConfig: tableConfig,
        selectedData,
        onCloseItem,
        submitFormItem,
        deleteSelectedItem,
        setConditions,
        callDynamicTableSetData: () => {
          callDynamicTableSetStartSettings(true)
        }
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};

export const useDataTableContext = (): DataTableContextProps => {
  return useContext(DataTableContext);
};
