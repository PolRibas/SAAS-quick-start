import React from 'react';
import { Autocomplete, AutocompleteChangeReason } from '@mui/material';
import { TextField, FormControl } from '@mui/material';
import {
  DynamicFormBackOfficeComboDto,
  DynamicFormBaseField,
} from '../dynamic-form.interface';
import { useDynamicFormContext } from '../context';
import { useTranslations } from 'next-intl';

interface DynamicFormAutocompleteFieldProps {
  field: DynamicFormBaseField;
}

export const DynamicFormAutocompleteField: React.FC<
  DynamicFormAutocompleteFieldProps
> = ({ field }) => {
  const { updateField, getFieldValue, disabled } = useDynamicFormContext();
  const translation = useTranslations('error');
  const t = useTranslations('labels');

  const handleAutocompleteChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: DynamicFormBackOfficeComboDto | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason === 'clear') {
      updateField(field.id, newValue?.value, true);
    } else {
      updateField(field.id, newValue?.value, true);
    }
  };

  return (
    <FormControl fullWidth variant="outlined">
      <Autocomplete
        id={field.id}
        options={field.selectorOptions || []}
        getOptionLabel={(option) => option.description}
        value={
          field.selectorOptions?.find(
            (option) => option.value === getFieldValue(field.id)
          ) || null
        }
        onChange={handleAutocompleteChange}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t(field.label)}
            variant="outlined"
            disabled={disabled || !!field.disabled}
            error={!!field.helperText}
            helperText={field.helperText && translation(field.helperText)}
          />
        )}
      />
    </FormControl>
  );
};
