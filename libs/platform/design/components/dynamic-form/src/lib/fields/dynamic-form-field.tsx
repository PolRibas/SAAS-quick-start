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

// TextArea: Para entradas de texto más largas o descripciones.
// File: Para cargar archivos, imágenes, documentos, etc.
// Range: Para seleccionar un valor dentro de un rango usando un control deslizante.
// RadioButtons: Para elegir una opción de un conjunto limitado de opciones.
// CheckboxGroup: Para seleccionar múltiples opciones de un conjunto.
// DateTime: Una combinación de fecha y hora, especialmente útil cuando se necesita precisión hasta el nivel de minutos.
// Time: Solo para seleccionar una hora.
// ColorPicker: Para seleccionar colores.
// Rating: Para permitir a los usuarios calificar algo con estrellas o cualquier otro ícono.

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
    default:
      return <p>Unknown type</p>;
  }
};
