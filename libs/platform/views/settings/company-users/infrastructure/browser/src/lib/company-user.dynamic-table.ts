
import { CompanyUserCrudApi, UserCompanyRolePresenterDto, UserFindByCriteriaResponseDtoClass } from '@saas-quick-start/infrastructure/open-api';
import { ContextCompanyPresenter } from '@saas-quick-start/platform/context/presenters';
import { DynamicFormApiParams, DynamicFormFormTypeEnum } from '@saas-quick-start/platform/design/components/dynamic-form';
import { DynamicTableColumnInterface, DynamicTableInterface, DynamicTableItemInterface } from '@saas-quick-start/platform/design/components/dynamic-table';
import { CompanyUsersPresenter } from '@saas-quick-start/platform/views/settings/company-users/presenters';
import { FindByCriteriaPresenterOperationEnum, FindByCriteriaPresenterRequest, FindByCriteriaPresenterResponse } from '@saas-quick-start/platform/views/table/presenters';
import { AxiosResponse } from 'axios';


const getUserApi = (apiParams: DynamicFormApiParams) =>
  new CompanyUserCrudApi(undefined, apiParams.baseUrl, apiParams.axiosInstance);

const CompanyUsersAttributes: DynamicTableColumnInterface[] = [
  {
    id: 'userId',
    label: 'label-id',
    field: 'id',
    unEditable: true,
    type: DynamicFormFormTypeEnum.hidden,
    defaultValue: '',
    value: '',
    hiddenHeader: true,
  },
  {
    id: 'role',
    label: 'label-role',
    field: 'role',
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
  {
    id: 'userEmail',
    label: 'label-email',
    field: 'email',
    disabled: true,
    type: DynamicFormFormTypeEnum.string,
    defaultValue: '',
    sortable: false,
    value: '',
    validationRules: [
      {
        rule: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        errorCode: 'invalid-email',
        error: false,
      },
    ],
  },
  {
    id: 'username',
    label: 'label-username',
    field: 'username',
    sortable: false,
    disabled: true,
    type: DynamicFormFormTypeEnum.string,
    defaultValue: '',
    hiddenHeader: true,
    value: '',
  },
  {
    id: 'first-name',
    label: 'label-first-name',
    field: 'firstName',
    sortable: false,
    disabled: true,
    type: DynamicFormFormTypeEnum.string,
    defaultValue: '',
    value: '',
    positionX: 6,
    positionY: 1
  },
  {
    id: 'last-name',
    label: 'label-last-name',
    field: 'lastName',
    disabled: true,
    sortable: false,
    type: DynamicFormFormTypeEnum.string,
    defaultValue: '',
    value: '',
    positionX: 6,
    positionY: 1
  },
  {
    id: 'phoneNumber',
    label: 'label-phone',
    defaultValue: '',
    field: 'phoneNumber',
    disabled: true,
    value: '',
    placeholder: '+343943...',
    notRequired: false,
    type: DynamicFormFormTypeEnum.string,
    positionX: 6,
    sortable: false,
    positionY: 4,
    validationRules: [
      {
        rule: /^\+?[1-9]\d{5,14}$/,
        errorCode: 'invalid-phone-number',
        error: false,
      },
    ],
  },
];

export const getCompanyUsersDataBase = (selectedCompany: ContextCompanyPresenter): DynamicTableInterface => ({
  title: 'company-user',
  subtitle: 'table-company-user-subtitle',
  itemTitle: (item: DynamicTableItemInterface) => `@${item['username']}`,
  itemSubtitle: (item: DynamicTableItemInterface) => `${item['email']}`,
  columns: CompanyUsersAttributes,
  filters: undefined,
  canDelete: selectedCompany.permissions?.includes('delete-company-user') ||  selectedCompany.permissions?.includes('root-permission'),
  canUpdate: selectedCompany.permissions?.includes('update-company-user') ||  selectedCompany.permissions?.includes('root-permission'),
  canCreate: selectedCompany.permissions?.includes('create-company-user') ||  selectedCompany.permissions?.includes('root-permission'),
  findByIdFunction: async (apiParams: DynamicFormApiParams, id: string) => {
    const result = await getUserApi(apiParams).companyUserControllerFindOne(id);
    return result as unknown as AxiosResponse<DynamicTableItemInterface>;
  },
  deleteFunction: async (apiParams: DynamicFormApiParams, id: string) => {
    const result = await getUserApi(apiParams).companyUserControllerDelete(id);
    return result as unknown as AxiosResponse<void>;
  },
  updateFunction: async (apiParams: DynamicFormApiParams, item: DynamicTableItemInterface) => {
    const result = await getUserApi(apiParams).companyUserControllerUpdate(
      (item as unknown as CompanyUsersPresenter).id || '', item as unknown as UserCompanyRolePresenterDto);
    return result as unknown as AxiosResponse<DynamicTableItemInterface>;
  },
  findByCriteriaFunction: async (apiParams: DynamicFormApiParams, criteria: FindByCriteriaPresenterRequest) => {
    try {
      criteria.conditions = criteria.conditions || [];
      criteria.join = undefined;
      criteria.conditions.push({
        key: 'companyId',
        operation: FindByCriteriaPresenterOperationEnum.EQ,
        value: selectedCompany.id,
      });
      const result = await getUserApi(apiParams).companyUserControllerFindByCriteria(
        criteria as UserFindByCriteriaResponseDtoClass,
      );
      return result as unknown as AxiosResponse<FindByCriteriaPresenterResponse<DynamicTableItemInterface>>;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
});

