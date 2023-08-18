import { DynamicFormBaseField, DynamicFormFormTypeEnum } from "@saas-quick-start/platform/design/components/dynamic-form"

export const createCompanyDynamicForm: DynamicFormBaseField[] = [
  {
    id: 'name',
    label: 'label-name',
    defaultValue: '',
    field: 'name',
    placeholder: 'My Company',
    notRequired: false,
    type: DynamicFormFormTypeEnum.string,
    value: '',
    validationRules: [
      {
        rule: (value: unknown) => {
          return (value as string).length > 3
        },
        errorCode: 'min-length-3',
        error: false,
      }
    ]
  },
  {
    id: 'address',
    label: 'label-address',
    defaultValue: '',
    field: 'address',
    placeholder: 'becker Street, 23',
    notRequired: false,
    type: DynamicFormFormTypeEnum.string,
    value: '',
    validationRules: [
      {
        rule: (value: unknown) => {
          return (value as string).length > 3
        },
        errorCode: 'min-length-3',
        error: false,
      }
    ]
  },
  {
    id: 'email',
    label: 'label-email',
    defaultValue: '',
    field: 'email',
    placeholder: 'example@domain.com',
    notRequired: false,
    type: DynamicFormFormTypeEnum.string,
    value: '',
    validationRules: [
      {
        rule: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        errorCode: 'invalid-email',
        error: false,
      }
    ],
  },
  {
    id: 'phoneNumber',
    label: 'label-phone',
    defaultValue: '',
    field: 'phoneNumber',
    placeholder: '(+34) 3943...',
    notRequired: false,
    type: DynamicFormFormTypeEnum.string,
    value: '',
    validationRules: [
      {
        rule: /^\+?[1-9]\d{5,14}$/,
        errorCode: 'invalid-phone-number',
        error: false,
      }
    ]
  },
]
