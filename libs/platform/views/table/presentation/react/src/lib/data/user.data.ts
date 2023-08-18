
import { UserCrudApi, UserEntityDto, UserFindByCriteriaResponseDtoClass } from '@saas-quick-start/infrastructure/open-api';
import { DynamicFormApiParams, DynamicFormFormTypeEnum } from '@saas-quick-start/platform/design/components/dynamic-form';
import { DynamicTableFilter, DynamicTableColumnInterface, DynamicTableInterface, DynamicTableItemInterface } from '@saas-quick-start/platform/design/components/dynamic-table';
import { FindByCriteriaPresenterRequest, FindByCriteriaPresenterResponse } from '@saas-quick-start/platform/views/table/presenters';
import { AxiosResponse } from 'axios';

const getUserApi = (apiParams: DynamicFormApiParams) =>
  new UserCrudApi(undefined, apiParams.baseUrl, apiParams.axiosInstance);

const UserAttributes: DynamicTableColumnInterface[] = [
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
    id: 'userEmail',
    label: 'label-email',
    field: 'email',
    disabled: true,
    type: DynamicFormFormTypeEnum.string,
    defaultValue: '',
    sortable: true,
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
    sortable: true,
    type: DynamicFormFormTypeEnum.string,
    defaultValue: '',
    value: '',
  },
  {
    id: 'first-name',
    label: 'label-first-name',
    field: 'firstName',
    sortable: true,
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
    sortable: true,
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
    value: '',
    placeholder: '+343943...',
    notRequired: false,
    type: DynamicFormFormTypeEnum.string,
    positionX: 6,
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

export const UserDataBase: DynamicTableInterface = {
  title: 'table-user',
  subtitle: 'table-user-subtitle',
  itemTitle: (item: DynamicTableItemInterface) => `@${item['username']}`,
  itemSubtitle: (item: DynamicTableItemInterface) => `${item['email']}`,
  columns: UserAttributes,
  canUpdate: true,
  canCreate: true,
  canDelete: false,
  filters: UserAttributes.filter(
    item => item.type === DynamicFormFormTypeEnum.string).map((item) => {
      return {
        type: 'text',
        key: item.field,
      } as DynamicTableFilter
    }),
  findByCriteriaFunction: async (apiParams: DynamicFormApiParams, criteria: FindByCriteriaPresenterRequest) => {
    try {
      const result = await getUserApi(apiParams).userCrudControllerFindByCriteria(
        criteria as UserFindByCriteriaResponseDtoClass,
      );
      return result as unknown as AxiosResponse<FindByCriteriaPresenterResponse<DynamicTableItemInterface>>;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  findByIdFunction: async (apiParams: DynamicFormApiParams, id: UserEntityDto['id']) => {
    const result = await getUserApi(apiParams).userCrudControllerFindOne(id || '');
    return result as unknown as AxiosResponse<DynamicTableItemInterface>;
  },
  deleteFunction: async (apiParams: DynamicFormApiParams, id: UserEntityDto['id']) => {
    const result = await getUserApi(apiParams).userCrudControllerDelete(id || '');
    return result as unknown as AxiosResponse<void>;
  },
  updateFunction: async (apiParams: DynamicFormApiParams, item: unknown) => {
    if (!(item as unknown as UserEntityDto).id) throw new Error('User ID is required');
    const result = await getUserApi(apiParams).userCrudControllerUpdate(
      (item as unknown as UserEntityDto).id || '', item as unknown as UserEntityDto);
    return result as unknown as AxiosResponse<DynamicTableItemInterface>;
  },
  createFunction: async (apiParams: DynamicFormApiParams, item: unknown) => {
    const result = await getUserApi(apiParams).userCrudControllerCreate(
      item as unknown as UserEntityDto
    );
    return result as unknown as AxiosResponse<DynamicTableItemInterface>;
  },
};

