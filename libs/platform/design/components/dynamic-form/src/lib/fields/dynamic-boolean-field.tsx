import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DynamicFormBaseField } from '../dynamic-form.interface';
import { useDynamicFormContext } from '../context';
import { useTranslations } from 'next-intl';

interface DynamicFormBooleanFieldProps {
  field: DynamicFormBaseField;
}

export const DynamicFormBooleanField: React.FC<DynamicFormBooleanFieldProps> = ({
  field,
}) => {
  const { updateField, getFieldValue, disabled } = useDynamicFormContext();
  const t = useTranslations('labels')


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(field.id, event.target.checked, false);
  };

  const handleBlur = () => {
    updateField(field.id, getFieldValue(field.id), false);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={!!getFieldValue(field.id)}
          disabled={disabled || !!field.disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          color="primary"
          name={field.id}
          inputProps={{ 'aria-label': t(field.label) }}
        />
      }
      label={t(field.label)}
    />
  );
};

