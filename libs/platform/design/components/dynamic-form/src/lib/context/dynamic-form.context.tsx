import React, { createContext, useContext } from 'react';
import {
  DynamicFormContextProps,
  DynamicFormProviderProps,
} from './dynamic-form.context.types';
import { DynamicFormBaseField } from '../dynamic-form.interface';
import {
  DynamicFormAddManyItem,
  DynamicFormConvertFieldsToObject,
  DynamicFormFindAndUpdate,
  DynamicFormFindOnManyItems,
  DynamicFormRemoveManyItem,
  DynamicFormValidateEntireForm,
} from './dynamic-form.factory';

const defaultContextValue: DynamicFormContextProps = {
  formData: [],
  updateField: () => undefined,
  getFieldValue: () => undefined,
  addManyItem: () => undefined,
  removeManyItem: () => undefined,
  formLoading: false,
};

const DynamicFormContext =
  createContext<DynamicFormContextProps>(defaultContextValue);

export const DynamicFormProvider: React.FC<DynamicFormProviderProps> = ({
  children,
  props,
}) => {
  const [formData, setFormData] = React.useState<DynamicFormBaseField[]>(
    props.formConfig
  );

  const [loading, setLoading] = React.useState<boolean>(false);

  const updateField = (
    fieldId: string,
    value: unknown,
    withValidation = false
  ) => {
    setFormData((prevData) =>
      DynamicFormFindAndUpdate(prevData, fieldId, value, withValidation)
    );
  };

  const getFieldValue = (fieldId: string) => {
    const field = DynamicFormFindOnManyItems(formData, fieldId);
    return field?.value;
  };

  const addManyItem = (fieldId: string) => {
    setFormData((prevData) => DynamicFormAddManyItem(prevData, fieldId));
  };
  const removeManyItem = (index: number, fieldId: string) => {
    setFormData((prevData) =>
      DynamicFormRemoveManyItem(prevData, fieldId, index)
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const { form, isValid } = DynamicFormValidateEntireForm(formData);
    setLoading(true);
    if (!isValid) {
      setFormData(form);
      setLoading(false);
    } else {
      await props.parentSubmit(DynamicFormConvertFieldsToObject(form));
      setLoading(false);
    }
  };

  return (
    <DynamicFormContext.Provider
      value={{
        formData,
        updateField,
        getFieldValue,
        addManyItem,
        removeManyItem,
        formLoading: loading,
        disabled: props.disabled
      }}
    >
      <form onSubmit={handleSubmit}>{children}</form>
    </DynamicFormContext.Provider>
  );
};

export const useDynamicFormContext = (): DynamicFormContextProps => {
  return useContext(DynamicFormContext);
};
