
import { CompanyRoleCrudApi, UserFindByCriteriaResponseDtoClass } from '@saas-quick-start/infrastructure/open-api';
import { DynamicFormApiParams, DynamicFormFormTypeEnum } from '@saas-quick-start/platform/design/components/dynamic-form';
import { DynamicTableColumnInterface, DynamicTableInterface, DynamicTableItemInterface } from '@saas-quick-start/platform/design/components/dynamic-table';
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
    disabled: true,
    type: DynamicFormFormTypeEnum.string,
    defaultValue: '',
    sortable: true,
    value: '',
    validationRules: [
      {
        rule: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        errorCode: 'invalid-role',
        error: false,
      },
    ],
  },
];

export const getCompanyRolesDataBase = (selectedCompany): DynamicTableInterface => ({
  title: 'company-roles',
  subtitle: 'table-company-roles-subtitle',
  itemTitle: (item: DynamicTableItemInterface) => `${item['name']}`,
  itemSubtitle: (item: DynamicTableItemInterface) => `${item['name']}`,
  columns: CompanyRolesAttributes,
  filters: [{
    type: 'text',
    key: 'name',
  }],
  findByCriteriaFunction: async (apiParams: DynamicFormApiParams, criteria: FindByCriteriaPresenterRequest) => {
    try {
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
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
});



