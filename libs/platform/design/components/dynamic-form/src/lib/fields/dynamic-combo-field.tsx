import React from 'react';
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { DynamicFormBaseField } from '../dynamic-form.interface';
import { useDynamicFormContext } from '../context';
import { useTranslations } from 'next-intl';

interface DynamicFormComboFieldProps {
  field: DynamicFormBaseField;
}

export const DynamicFormComboField: React.FC<DynamicFormComboFieldProps> = ({
  field,
}) => {
  const { updateField, getFieldValue, disabled } = useDynamicFormContext();
  const translation = useTranslations('error');
  const t = useTranslations('labels');
  const [options, setOptions] = React.useState(field.selectorOptions || []);

  React.useEffect(() => {
    async function fetchOptions() {
      if (field.getCombo) {
        await field.getCombo().then((res) => {
          setOptions(res);
        });
      }else{
        throw new Error('getCombo must be defined');
      }
    }
    fetchOptions();
  }, [field]);

  const handleChange = (
    event: SelectChangeEvent<{
      name?: string | undefined;
    }>
  ) => {
    updateField(field.id, event.target.value, true);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id={`${field.id}-label`}>{t(field.label)}</InputLabel>
      {
        <Select
          labelId={`${field.id}-label`}
          id={field.id}
          value={getFieldValue(field.id) || ''}
          onChange={handleChange}
          label={field.label}
          error={!!field.helperText}
          disabled={
            disabled || !!field.disabled || !options?.length
          }
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.description}
            </MenuItem>
          ))}
        </Select>
      }
      {field.helperText && (
        <FormHelperText>{translation(field.helperText)}</FormHelperText>
      )}
    </FormControl>
  );
};
