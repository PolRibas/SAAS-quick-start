import React from 'react';

import { DynamicFormProvider } from './context';
import { DynamicFormBaseField } from './dynamic-form.interface';
import { DynamicFormGrid } from './form-grid';
import { DynamicSubmit } from './submit';

export const DynamicForm: React.FC<{
  formConfig: DynamicFormBaseField[];
  onSubmit: (form: { [key: string]: unknown }) => Promise<void>;
}> = ({ formConfig, onSubmit }) => {
  return (
    <DynamicFormProvider props={{ formConfig, parentSubmit: onSubmit }}>
      <DynamicFormGrid />
      <DynamicSubmit />
    </DynamicFormProvider>
  );
};
