import { DynamicFormBaseField } from '../dynamic-form.interface';

export const DynamicFormFindOnManyItems = (
  fields: DynamicFormBaseField[],
  fieldId: string
): DynamicFormBaseField | undefined =>
  fields.reduce(
    (acc: DynamicFormBaseField | undefined, item: DynamicFormBaseField) => {
      if (item.id === fieldId) {
        return item;
      }
      if (item.manyItems) {
        const response = item.manyItems.map((subArrayToUpdate) =>
          DynamicFormFindOnManyItems(subArrayToUpdate, fieldId)
        );
        if (response.some((item) => !!item)) {
          return response.find((item) => !!item);
        }
      }

      return acc;
    },
    undefined
  );

const getManyValues = (fields: DynamicFormBaseField[]) => {
  const values: { [key: string]: unknown } = {};
  fields.forEach((field) => {
    if (field.manyItems) {
      values[field.field as unknown as string] = field.manyItems.map(
        (innerItem) => getManyValues(innerItem)
      );
    } else {
      values[field.field as unknown as string] = field.value;
    }
  });
  return values;
};

export const DynamicFormFindAndUpdate = (
  fields: DynamicFormBaseField[],
  fieldId: string,
  value: unknown,
  withValidation = false
): DynamicFormBaseField[] => {
  return fields.map((field) => {
    if (field.id === fieldId) {
      if (withValidation) {
        return DynamicFormValidateField({ ...field, value });
      }
      return { ...field, value };
    }
    if (field.manyItems) {
      field.manyItems = field.manyItems.map((subArrayToUpdate) =>
        DynamicFormFindAndUpdate(
          subArrayToUpdate,
          fieldId,
          value,
          withValidation
        )
      );

      return {
        ...field,
        manyItems: field.manyItems,
        value: field.manyItems.map((item) => getManyValues(item)),
      };
    }
    return field;
  });
};
export const DynamicFormRemoveManyItem = (
  fields: DynamicFormBaseField[],
  fieldId: string,
  index: number
): DynamicFormBaseField[] => {
  return fields.map((field) => {
    if (field.id === fieldId) {
      const newItems = [...(field.manyItems || [])];
      newItems.splice(index, 1);
      return {
        ...field,
        manyItems: newItems,
        value: newItems.map((item) => getManyValues(item)),
      };
    }
    if (field.manyItems) {
      field.manyItems = field.manyItems.map((subArrayToUpdate) =>
        DynamicFormRemoveManyItem(subArrayToUpdate, fieldId, index)
      );
      return {
        ...field,
        manyItems: field.manyItems,
        value: field.manyItems.map((item) => getManyValues(item)),
      };
    }
    return field;
  });
};

export const DynamicFormAddManyItem = (
  fields: DynamicFormBaseField[],
  fieldId: string
): DynamicFormBaseField[] => {
  return fields.map((field) => {
    if (field.id === fieldId) {
      const newItems = [
        ...(field.manyItems || []),
        (field.manyItemsConfig as DynamicFormBaseField[]).map((item) => ({
          ...item,
          id: `${item.id}-${Math.random()}`,
        })),
      ];
      return {
        ...field,
        manyItems: newItems,
        value: newItems.map((item) => getManyValues(item)),
      };
    }
    if (field.manyItems) {
      field.manyItems = field.manyItems.map((subArrayToUpdate) =>
        DynamicFormAddManyItem(subArrayToUpdate, fieldId)
      );
      return {
        ...field,
        manyItems: field.manyItems,
        value: field.manyItems.map((item) => getManyValues(item)),
      };
    }
    return field;
  });
};

export const DynamicFormValidateField = (
  field: DynamicFormBaseField
): DynamicFormBaseField => {
  if (!field.validationRules) return field;

  for (const rule of field.validationRules) {
    let isValid: boolean;

    if (typeof rule.rule === 'string') {
      isValid = field.value === rule.rule;
    } else if (rule.rule instanceof RegExp) {
      isValid = rule.rule.test(field.value as string);
    } else {
      isValid = rule.rule(field.value);
    }

    if (!isValid) {
      return {
        ...field,
        helperText: rule.errorCode,
        validationRules: field.validationRules.map((r) =>
          r.errorCode === rule.errorCode
            ? { ...r, error: true }
            : { ...r, error: false }
        ),
      };
    }
  }

  return {
    ...field,
    helperText: undefined,
    validationRules: field.validationRules.map((r) => ({ ...r, error: false })),
  };
};

export const DynamicFormValidateEntireForm = (
  fields: DynamicFormBaseField[]
): {
  form: DynamicFormBaseField[];
  isValid: boolean;
} => {
  let isValid = true;

  const validatedFields = fields.map((field) => {
    const updatedField = DynamicFormValidateField(field);

    if (updatedField.helperText) {
      isValid = false;
    }

    if (updatedField.manyItems) {
      const response = updatedField.manyItems.map((item) =>
        DynamicFormValidateEntireForm(item)
      );

      if (!response.reduce((acc, item) => item.isValid && acc, true)) {
        isValid = false;
      }
      updatedField.manyItems = response.map((item) => item.form);
    }

    return updatedField;
  });

  if (isValid && validatedFields.some((field) => !!field.helperText)) {
    isValid = false;
  }

  return {
    form: validatedFields,
    isValid,
  };
};

export const DynamicFormConvertFieldsToObject = (
  fields: DynamicFormBaseField[]
): { [key: string]: unknown } => {
  const result: { [key: string]: unknown } = {};

  fields.forEach((field) => {
    result[field.field] = field.value;
  });

  return result;
};
