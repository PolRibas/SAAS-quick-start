import { DynamicFormBaseField, DynamicFormFormTypeEnum } from "@saas-quick-start/platform/design/components/dynamic-form"


export const registerDynamicForm: DynamicFormBaseField[] = [
  {
    id: 'username',
    label: 'label-username',
    defaultValue: '',
    field: 'username',
    placeholder: 'user_23',
    value: '',
    notRequired: false,
    type: DynamicFormFormTypeEnum.string,
    positionX: 12,
    positionY: 1,
    validationRules: [
      {
        rule: /^[a-zA-Z0-9_-]{3,22}$/,
        errorCode: 'invalid-username',
        error: false,
      }
    ]
  },
  {
    id: 'email',
    label: 'label-email',
    defaultValue: '',
    positionX: 12,
    positionY: 1,
    value: '',
    field: 'email',
    placeholder: 'example@domain.com',
    notRequired: false,
    validationRules: [
      {
        rule: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        errorCode: 'invalid-email',
        error: false,
      }
    ],
    type: DynamicFormFormTypeEnum.string,
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
    positionX: 12,
    positionY: 1,
    validationRules: [
      {
        rule: /^\+?[1-9]\d{5,14}$/,
        errorCode: 'invalid-phone-number',
        error: false,
      }
    ]
  },
  {
    id: 'password',
    label: 'label-password',
    defaultValue: '',
    value: '',
    field: 'password',
    placeholder: '********',
    notRequired: false,
    type: DynamicFormFormTypeEnum.string,
    positionX: 12,
    positionY: 1,
    validationRules: [
      {
        rule: (value: unknown): boolean => {
          return (value as string).length > 7
        },
        errorCode: 'invalid-password',
        error: false,
      }
    ]
  },
]
