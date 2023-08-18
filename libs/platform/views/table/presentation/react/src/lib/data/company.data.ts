
import { CompanyCrudApi, CompanyEntityDto, CompanyFindByCriteriaResponseDtoClass } from '@saas-quick-start/infrastructure/open-api';
import { DynamicFormApiParams, DynamicFormFormTypeEnum } from '@saas-quick-start/platform/design/components/dynamic-form';
import { DynamicTableColumnInterface, DynamicTableInterface, DynamicTableItemInterface } from '@saas-quick-start/platform/design/components/dynamic-table';
import { FindByCriteriaPresenterRequest, FindByCriteriaPresenterResponse } from '@saas-quick-start/platform/views/table/presenters';
import { AxiosResponse } from 'axios';

const getCompanyApi = (apiParams: DynamicFormApiParams) =>
  new CompanyCrudApi(undefined, apiParams.baseUrl, apiParams.axiosInstance);

const CompanyAttributes: DynamicTableColumnInterface[] = [
  {
    id: 'companyId',
    label: 'label-id',
    field: 'id',
    unEditable: true,
    type: DynamicFormFormTypeEnum.hidden,
    defaultValue: '',
    value: '',
    hiddenHeader: true,
  },
  {
    id: 'companyName',
    label: 'label-name',
    field: 'name',
    type: DynamicFormFormTypeEnum.string,
    defaultValue: '',
    sortable: true,
    value: '',
  },
  {
    id: 'address',
    label: 'label-address',
    field: 'address',
    type: DynamicFormFormTypeEnum.string,
    defaultValue: '',
    value: '',
    sortable: true,
  },
  {
    id: 'email',
    label: 'label-email',
    field: 'email',
    type: DynamicFormFormTypeEnum.string,
    defaultValue: '',
    value: '',
    validationRules: [
      {
        rule: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        errorCode: 'invalid-email',
        error: false,
      },
    ],
    sortable: true,
  },
  {
    id: 'phoneNumber',
    label: 'label-phone',
    defaultValue: '',
    field: 'phoneNumber',
    value: '',
    placeholder: '+343943...',
    notRequired: false,
    type: DynamicFormFormTypeEnum.string,
    validationRules: [
      {
        rule: /^\+?[1-9]\d{5,14}$/,
        errorCode: 'invalid-phone-number',
        error: false,
      },
    ],
  },
];

export const CompanyDataBase: DynamicTableInterface = {
  title: 'table-company',
  subtitle: 'table-company-subtitle',
  itemTitle: (item: DynamicTableItemInterface) => `${item['name']}`,
  itemSubtitle: (item: DynamicTableItemInterface) => `${item['address']}`,
  columns: CompanyAttributes,
  canUpdate: true,
  canCreate: true,
  canDelete: true,
  filters: CompanyAttributes.filter(
    item => item.type === DynamicFormFormTypeEnum.string).map((item) => {
      return {
        type: 'text',
        key: item.field,
      }
    }),
  findByIdFunction: async (apiParams: DynamicFormApiParams, id: CompanyEntityDto['id']) => {
    const result = await getCompanyApi(apiParams).companyCrudControllerFindOne(id || '');
    return result as unknown as AxiosResponse<DynamicTableItemInterface>;
  },
  findByCriteriaFunction: async (apiParams: DynamicFormApiParams, criteria: FindByCriteriaPresenterRequest) => {
    const result = await getCompanyApi(apiParams).companyCrudControllerFindByCriteria(
      criteria as CompanyFindByCriteriaResponseDtoClass
    );
    return result as unknown as AxiosResponse<FindByCriteriaPresenterResponse<DynamicTableItemInterface>>;
  },
  deleteFunction: async (apiParams: DynamicFormApiParams, id: CompanyEntityDto['id']) => {
    const result = await getCompanyApi(apiParams).companyCrudControllerDelete(id || '');
    return result as unknown as AxiosResponse<void>;
  },
  updateFunction: async (apiParams: DynamicFormApiParams, item: unknown) => {
    if (!(item as unknown as CompanyEntityDto).id) throw new Error('Company ID is required');
    const result = await getCompanyApi(apiParams).companyCrudControllerUpdate(
      (item as unknown as CompanyEntityDto).id || '', item as unknown as CompanyEntityDto);
    return result as unknown as AxiosResponse<DynamicTableItemInterface>;
  },
  createFunction: async (apiParams: DynamicFormApiParams, item: unknown) => {
    const result = await getCompanyApi(apiParams).companyCrudControllerCreate(
      item as unknown as CompanyEntityDto
    );
    return result as unknown as AxiosResponse<DynamicTableItemInterface>;
  },
};
