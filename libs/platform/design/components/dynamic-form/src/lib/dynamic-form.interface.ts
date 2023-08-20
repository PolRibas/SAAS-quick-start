import { AxiosInstance, AxiosResponse } from "axios";

export interface DynamicFormBackOfficeComboDto {
  value: string;
  description: string;
}

export enum DynamicFormFormTypeEnum {
  string = 'string',
  date = 'date',
  number = 'number',
  boolean = 'boolean',
  combo = 'combo',
  many = 'many',
  select = 'select',
  autocomplete = 'autocomplete',
  rating = 'rating',
  file = 'file',
  image = 'image',
  color = 'color',
  textarea = 'textarea',
  richText = 'richText',
  checkbox = 'checkbox',
  radio = 'radio',
  hidden = 'hidden',
  permissions = 'permissions',
}

export interface DynamicFormApiParams {
  baseUrl: string;
  axiosInstance: AxiosInstance;
}

export interface ValidationRule {
  rule: string | RegExp | ((value: unknown) => boolean);
  errorCode: string;
  error: boolean;
}
export interface DynamicFormBaseField {
  id: string;
  label: string;
  field: string;
  defaultValue: unknown;
  value: unknown;
  disabled?: boolean;
  titleKey?: string;
  placeholder?: string;
  floatRight?: boolean;
  unEditable?: boolean;
  notRequired?: boolean;
  getCombo?: () => Promise<
    DynamicFormBackOfficeComboDto[]
  >;
  type: DynamicFormFormTypeEnum;
  many?: boolean;
  manyItems?: DynamicFormBaseField[][];
  manyItemsConfig?: DynamicFormBaseField[];
  positionX?: number;
  positionY?: number;
  hidden?: boolean;
  validationRules?: ValidationRule[];
  selectorOptions?: DynamicFormBackOfficeComboDto[];
  helperText?: string;
}
