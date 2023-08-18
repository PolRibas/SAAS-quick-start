import React from 'react';
import TextField from '@mui/material/TextField';
import { DynamicFormBaseField } from '../dynamic-form.interface';
import { useDynamicFormContext } from '../context';
import { useTranslations } from 'next-intl';

interface DynamicFormStringFieldProps {
  field: DynamicFormBaseField;
}

export const DynamicFormNumberField: React.FC<DynamicFormStringFieldProps> = ({
  field,
}) => {
  const { updateField, getFieldValue, disabled } = useDynamicFormContext();
  const translation = useTranslations('error');
  const t = useTranslations('labels')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(field.id, Number(event.target.value), false);
  };

  const handleBlur = () => {
    // updateField(field.id, getFieldValue(field.id), true);
    updateField(field.id, getFieldValue(field.id), false);
  };

  return (
    <TextField
      label={t(field.label)}
      type="number"
      variant="outlined"
      disabled={disabled || !!field.disabled}
      color="primary"
      placeholder={field.placeholder}
      fullWidth
      value={getFieldValue(field.id) || ''}
      onBlur={handleBlur}
      onChange={handleChange}
      error={!!field.helperText}
      helperText={field.helperText ? translation(field.helperText) : undefined}
    />
  );
};
