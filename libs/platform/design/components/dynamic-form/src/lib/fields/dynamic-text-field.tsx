import React from 'react';
import TextField from '@mui/material/TextField';
import { DynamicFormBaseField } from '../dynamic-form.interface';
import { useDynamicFormContext } from '../context';
import { useTranslations } from 'next-intl';

interface DynamicFormStringFieldProps {
  field: DynamicFormBaseField;
}

export const DynamicFormStringField: React.FC<DynamicFormStringFieldProps> = ({
  field,
}) => {
  const { updateField, getFieldValue, disabled } = useDynamicFormContext();
  const translation = useTranslations('error');
  const t = useTranslations('labels')

  const type = field?.field.toLowerCase().includes('password')
    ? 'password'
    : field?.field.toLowerCase().includes('email')
    ? 'email'
    : 'text';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(field.id, event.target.value, false);
  };

  const handleBlur = () => {
    updateField(field.id, getFieldValue(field.id), true);
  };

  return (
    <TextField
      label={t(field.label)}
      type={type}
      variant="outlined"
      color="primary"
      disabled={disabled || !!field.disabled}
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
