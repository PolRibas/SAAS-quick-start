import React from 'react';
import {
  DynamicFormBaseField,
  DynamicFormFormTypeEnum,
} from '../dynamic-form.interface';
import { DynamicFormStringField } from './dynamic-text-field';
import { DynamicFormNumberField } from './dynamic-number-field';
import { DynamicFormSelectField } from './dynamic-select-field';
import { DynamicFormBooleanField } from './dynamic-boolean-field';
import { DynamicFormDateField } from './dynamic-date-field';
import { DynamicFormManyField } from './dynamic-many-field';
import { DynamicFormAutocompleteField } from './dynamic-autocomplete-field';
import { DynamicFormComboField } from './dynamic-combo-field';
import { DynamicFormPermissionsField } from './dynamic-permissions-field';

export const DynamicFormField: React.FC<{
  field: DynamicFormBaseField;
}> = ({ field }) => {
  switch (field.type) {
    case DynamicFormFormTypeEnum.string:
      return <DynamicFormStringField field={field} />;
    case DynamicFormFormTypeEnum.number:
      return <DynamicFormNumberField field={field} />;
    case DynamicFormFormTypeEnum.select:
      return <DynamicFormSelectField field={field} />;
    case DynamicFormFormTypeEnum.autocomplete:
      return <DynamicFormAutocompleteField field={field} />;
    case DynamicFormFormTypeEnum.boolean:
      return <DynamicFormBooleanField field={field} />;
    case DynamicFormFormTypeEnum.date:
      return <DynamicFormDateField field={field} />;
    case DynamicFormFormTypeEnum.many:
      return <DynamicFormManyField field={field} />;
    case DynamicFormFormTypeEnum.combo:
      return <DynamicFormComboField field={field} />;
    case DynamicFormFormTypeEnum.permissions:
      return <DynamicFormPermissionsField field={field} />;
    default:
      return <p>Unknown type</p>;
  }
};
