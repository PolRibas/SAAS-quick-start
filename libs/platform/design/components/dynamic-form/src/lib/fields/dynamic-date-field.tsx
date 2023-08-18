import React from 'react';
import TextField from '@mui/material/TextField';
import { DynamicFormBaseField } from '../dynamic-form.interface';
import { useDynamicFormContext } from '../context';
import { useTranslations } from 'next-intl';

interface DynamicFormDateFieldProps {
  field: DynamicFormBaseField;
  index?: number;
}

export const DynamicFormDateField: React.FC<DynamicFormDateFieldProps> = ({
  field,
  index,
}) => {
  const { updateField, getFieldValue, disabled } = useDynamicFormContext();
  const translation = useTranslations('error');
  const t = useTranslations('labels')


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(field.id, event.target.value, false);
  };

  const handleBlur = () => {
    updateField(field.id, getFieldValue(field.id), false);
  };

  return (
    <TextField
      label={t(field.label)}
      disabled={disabled || !!field.disabled}
      type="date"
      variant="outlined"
      color="primary"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      value={getFieldValue(field.id) || ''}
      onBlur={handleBlur}
      onChange={handleChange}
      error={!!field.helperText}
      helperText={field.helperText ? translation(field.helperText) : undefined}
    />
  );
};
