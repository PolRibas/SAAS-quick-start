import { ReactNode } from "react";
import { DynamicFormBaseField } from "../dynamic-form.interface";

export interface DynamicFormContextProps {
  formData: DynamicFormBaseField[];
  updateField: (
    fieldId: string,
    value: unknown,
    withValidation?: boolean,
  ) => void;
  getFieldValue: (fieldId: string) => unknown;
  addManyItem: (fieldId: string) => unknown;
  removeManyItem: (index: number, fieldId: string) => unknown;
  formLoading: boolean;
  disabled?: boolean;
}

export interface DynamicFormProviderProps {
  children: ReactNode;
  props: {
    formConfig: DynamicFormBaseField[]
    parentSubmit: (form: { [key: string]: unknown }) => Promise<void>
    disabled?: boolean
  }
}
