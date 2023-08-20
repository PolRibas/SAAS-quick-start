import axios from "axios";
import { DynamicTableColumnInterface, DynamicTableInterface, DynamicTableItemInterface } from "../dynamic-table.interface";
import { DataTableCacheItem } from "./dynamic-table.types";
import {
  FindByCriteriaPresenterFilterCondition,
  FindByCriteriaPresenterResponse,
  FindByCriteriaPresenterJoinEnum
} from "@saas-quick-start/platform/views/table/presenters";
import { DynamicFormBackOfficeComboDto, DynamicFormFormTypeEnum } from "@saas-quick-start/platform/design/components/dynamic-form";

const getAxiosInstance = (token: string | undefined) => {
  return axios.create(
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
}

const getTableCacheItem = (
  tableCacheData: DataTableCacheItem[],
  page: number,
  limit: number,
  sort: {
    key: string; order: "asc" | "desc" | undefined
  } | undefined,
  conditions: FindByCriteriaPresenterFilterCondition[] | undefined,
) => {
  const result = tableCacheData.find(item => {
    if (item.sort === undefined) {
      return false
    }
    const principalCondition = item.page === page && item.limit === limit && (!sort && !item.sort || (sort && item.sort.key === sort.key && item.sort.order === sort.order))
    if (!principalCondition) {
      return false
    }
    let result = true
    item.conditions?.forEach(condition => {
      if (!conditions) {
        result = false
        return false
      }
      if (!conditions?.find(c => c.key === condition.key && c.operation === condition.operation && c.value === condition.value)) {
        result = false
        return false
      }
    })
    conditions?.forEach(condition => {
      if (!item.conditions) {
        result = false
        return false
      }
      if (!item.conditions?.find(c => c.key === condition.key && c.operation === condition.operation && c.value === condition.value)) {
        result = false
        return false
      }
    })
    return result
  })
  return result
}

export const DynamicTableSetStartSettings = async (
  {
    tableConfig,
    baseUrl,
    token,
    page,
    limit,
    sort,
    setLoading,
    setTableData,
    setTotal,
    setTablaCacheData,
    tableCacheData,
    setTableHeadersOptions,
    tableHeaders,
    skipCache,
    conditions,
    setTableHeaders,
    callback,
    setComboData
  }: {
    tableConfig: DynamicTableInterface,
    baseUrl: string, token: string | undefined,
    page: number, limit: number,
    skipCache: boolean,
    conditions: FindByCriteriaPresenterFilterCondition[] | undefined,
    sort: {
      key: string; order: "asc" | "desc" | undefined
    } | undefined,
    setLoading: (loading: boolean) => void,
    setTablaCacheData: (data: DataTableCacheItem[]) => void,
    setTotal: (total: number) => void,
    tableCacheData: DataTableCacheItem[],
    tableHeaders: DynamicTableColumnInterface[],
    setTableHeadersOptions: (options: DynamicTableColumnInterface[]) => void,
    setTableData: (data: DynamicTableItemInterface[]) => void,
    setTableHeaders: (headers: DynamicTableColumnInterface[]) => void,
    callback: () => void,
    setComboData: React.Dispatch<React.SetStateAction<{
      [columnId: string]: DynamicFormBackOfficeComboDto[];
    }>>
  }
) => {
  setLoading(true)
  const cacheItem = getTableCacheItem(tableCacheData, page, limit, sort, conditions)
  let data: FindByCriteriaPresenterResponse<DynamicTableItemInterface>
  if (cacheItem !== undefined && !skipCache && tableConfig.title === cacheItem.title) {
    data = cacheItem.result
  } else {
    const response = await tableConfig.findByCriteriaFunction({
      baseUrl,
      axiosInstance: getAxiosInstance(token)
    }, {
      page,
      limit,
      sortKey: sort && sort.key,
      sortOrder: sort && sort.order,
      conditions: conditions ?? undefined,
      join: conditions ? FindByCriteriaPresenterJoinEnum.OR : undefined
    })
    data = response.data
  }
  await Promise.all(tableConfig.columns.map(async column => {
    if (column.type === DynamicFormFormTypeEnum.combo && column.getCombo) {
      const comboData = await column.getCombo()
      setComboData(prevState => ({
        ...prevState,
        [column.id]: comboData
      }))
    }
  }))
  setTableHeaders(tableConfig.columns)
  setTableHeadersOptions(tableConfig.columns)
  const newCacheItem = {
    page,
    limit,
    sort,
    conditions: (conditions ?? undefined),
    result: data,
    title: tableConfig.title
  } as DataTableCacheItem

  setTablaCacheData([...tableCacheData, newCacheItem])
  setTableData(data.items)
  setTotal(data.total)
  setLoading(false)
  callback()
}

export const DynamicTableCreateItem = async (
  {
    tableConfig,
    baseUrl,
    token,
    onFinish,
    selectedData,
  }: {
    tableConfig: DynamicTableInterface;
    baseUrl: string;
    token: string | undefined;
    onFinish: () => void;
    selectedData: DynamicTableItemInterface;
  }
) => {
  if (tableConfig.createFunction === undefined) {
    throw new Error('Create function is not defined')
  }
  if (!tableConfig.canCreate) {
    throw new Error('Create function is not allowed')
  }
  await tableConfig.createFunction({
    baseUrl,
    axiosInstance: getAxiosInstance(token)
  }, selectedData)
  onFinish()
}

export const DynamicTableDeleteItem = async (
  {
    tableConfig,
    baseUrl,
    token,
    onFinish,
    selectedData,
  }: {
    tableConfig: DynamicTableInterface;
    baseUrl: string;
    token: string | undefined;
    onFinish: () => void;
    selectedData: DynamicTableItemInterface;
  }
) => {
  if (tableConfig.deleteFunction === undefined) {
    throw new Error('Delete function is not defined')
  }
  if (!tableConfig.canDelete) {
    throw new Error('Delete function is not allowed')
  }
  await tableConfig.deleteFunction({
    baseUrl,
    axiosInstance: getAxiosInstance(token)
  }, selectedData.id as string)
  onFinish()
}

export const DynamicTableUpdateItem = async (
  {
    tableConfig,
    baseUrl,
    token,
    onFinish,
    selectedData,
  }: {
    tableConfig: DynamicTableInterface;
    baseUrl: string;
    token: string | undefined;
    onFinish: () => void;
    selectedData: DynamicTableItemInterface;
  }
) => {
  if (tableConfig.updateFunction === undefined) {
    throw new Error('Update function is not defined')
  }
  if (!tableConfig.canUpdate) {
    throw new Error('Update function is not allowed')
  }
  await tableConfig.updateFunction({
    baseUrl,
    axiosInstance: getAxiosInstance(token)
  }, selectedData)
  onFinish()
}

export const DynamicTableFindById = async (
  {
    tableConfig,
    baseUrl,
    token,
    id,
    setLoading,
    tableData,
    onFinish,
    setSelectedData,
    pushId
  }
    : {
      tableConfig: DynamicTableInterface;
      baseUrl: string;
      token: string | undefined;
      id: string;
      setLoading: (loading: boolean) => void;
      tableData: DynamicTableItemInterface[];
      onFinish: () => void;
      setSelectedData: (data: DynamicTableItemInterface) => void;
      pushId: (id: string) => void;
    }
) => {
  if (tableConfig.findByIdFunction === undefined) {
    const item = tableData.find(item => item.id === id)
    setSelectedData(item || {})
  } else {
    setLoading(true)
    const { data } = await tableConfig.findByIdFunction({
      baseUrl,
      axiosInstance: getAxiosInstance(token)
    }, id)
    setSelectedData(data)
    setLoading(false)
    onFinish()
  }
  pushId(id)
}
