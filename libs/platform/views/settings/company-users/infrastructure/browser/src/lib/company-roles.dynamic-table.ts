
import { CompanyRoleCrudApi, CompanyUsersDto, UserFindByCriteriaResponseDtoClass } from '@saas-quick-start/infrastructure/open-api';
import { DynamicFormApiParams, DynamicFormFormTypeEnum } from '@saas-quick-start/platform/design/components/dynamic-form';
import { DynamicTableColumnInterface, DynamicTableInterface, DynamicTableItemInterface } from '@saas-quick-start/platform/design/components/dynamic-table';
import { CompanyRolePresenter } from '@saas-quick-start/platform/views/settings/company-users/presenters';
import { FindByCriteriaPresenterOperationEnum, FindByCriteriaPresenterRequest, FindByCriteriaPresenterResponse } from '@saas-quick-start/platform/views/table/presenters';
import { AxiosResponse } from 'axios';


const getCompanyRolesApi = (apiParams: DynamicFormApiParams) =>
  new CompanyRoleCrudApi(undefined, apiParams.baseUrl, apiParams.axiosInstance);

const CompanyRolesAttributes: DynamicTableColumnInterface[] = [
  {
    id: 'id',
    label: 'label-id',
    field: 'id',
    unEditable: true,
    type: DynamicFormFormTypeEnum.hidden,
    defaultValue: '',
    value: '',
    hiddenHeader: true,
  },
  {
    id: 'companyId',
    label: 'label-companyId',
    field: 'companyId',
    unEditable: true,
    type: DynamicFormFormTypeEnum.hidden,
    defaultValue: '',
    value: '',
    hiddenHeader: true,
  },
  {
    id: 'name',
    label: 'label-name',
    field: 'name',
    disabled: false,
    type: DynamicFormFormTypeEnum.string,
    defaultValue: '',
    sortable: true,
    value: '',
  },
  {
    id: 'permissions',
    label: 'label-permissions',
    field: 'permissions',
    disabled: false,
    type: DynamicFormFormTypeEnum.permissions,
    defaultValue: '',
    sortable: false,
    value: '',
  },
];

export const getCompanyRolesDataBase = (selectedCompany): DynamicTableInterface => ({
  title: 'company-roles',
  subtitle: 'table-company-roles-subtitle',
  itemTitle: (item: DynamicTableItemInterface) => `${item['name']}`,
  itemSubtitle: (item: DynamicTableItemInterface) => `${item['name']}`,
  columns: CompanyRolesAttributes,
  canDelete: selectedCompany.permissions?.includes('delete-company-role') || selectedCompany.permissions?.includes('root-permission'),
  canUpdate: selectedCompany.permissions?.includes('update-company-role') || selectedCompany.permissions?.includes('root-permission'),
  canCreate: selectedCompany.permissions?.includes('create-company-role') || selectedCompany.permissions?.includes('root-permission'),
  filters: [{
    type: 'text',
    key: 'name',
  }],
  createFunction: async (apiParams: DynamicFormApiParams, item: DynamicTableItemInterface) => {
    item.companyId = selectedCompany.id;
    const result = await getCompanyRolesApi(apiParams).companyRoleCrudControllerCreate(
      item as unknown as CompanyUsersDto);
    return result as unknown as AxiosResponse<DynamicTableItemInterface>;
  },
  deleteFunction: async (apiParams: DynamicFormApiParams, id: string) => {
    const result = await getCompanyRolesApi(apiParams).companyRoleCrudControllerDelete(id);
    return result as unknown as AxiosResponse<void>;
  },
  updateFunction: async (apiParams: DynamicFormApiParams, item: DynamicTableItemInterface) => {
    const result = await getCompanyRolesApi(apiParams).companyRoleCrudControllerUpdate(
      (item as unknown as CompanyRolePresenter).id || '', item as unknown as CompanyUsersDto);
    return result as unknown as AxiosResponse<DynamicTableItemInterface>;
  },
  findByIdFunction: async (apiParams: DynamicFormApiParams, id: string) => {
    const result = await getCompanyRolesApi(apiParams).companyRoleCrudControllerFindOne(id);
    return result as unknown as AxiosResponse<DynamicTableItemInterface>;
  },
  findByCriteriaFunction: async (apiParams: DynamicFormApiParams, criteria: FindByCriteriaPresenterRequest) => {
    criteria.conditions = criteria.conditions || [];
    criteria.join = undefined;
    criteria.conditions.push({
      key: 'companyId',
      operation: FindByCriteriaPresenterOperationEnum.EQ,
      value: selectedCompany.id,
    });
    const result = await getCompanyRolesApi(apiParams).companyRoleCrudControllerFindByCriteria(
      criteria as UserFindByCriteriaResponseDtoClass,
    );
    return result as unknown as AxiosResponse<FindByCriteriaPresenterResponse<DynamicTableItemInterface>>;
  },
});



