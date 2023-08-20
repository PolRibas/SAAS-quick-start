import React, { useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  OutlinedInput,
} from '@mui/material';
import { useDynamicFormContext } from '../context';
import { useTranslations } from 'next-intl';
import { DynamicFormBaseField } from '../dynamic-form.interface';
import { CompanyPermissionsList } from '@saas-quick-start/common/permissions';

interface DynamicFormPermissionsFieldProps {
  field: DynamicFormBaseField;
}

export const DynamicFormPermissionsField: React.FC<
  DynamicFormPermissionsFieldProps
> = ({ field }) => {
  const { updateField, getFieldValue, disabled } = useDynamicFormContext();
  const translation = useTranslations('error');
  const t = useTranslations('labels');

  const [search, setSearch] = useState('');
  const permissions = Object.values(CompanyPermissionsList);

  const filteredPermissions = permissions.filter((permission) =>
    permission.toLowerCase().includes(search.toLowerCase())
  );

  const handlePermissionChange = (permission: string) => {
    let currentPermissions: string[] =
      (getFieldValue(field.id) as string[]) || [];
    if (currentPermissions.includes(permission)) {
      currentPermissions = currentPermissions.filter(
        (perm) => perm !== permission
      );
    } else {
      currentPermissions.push(permission);
    }
    updateField(field.id, currentPermissions, true);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <TextField
        variant="standard"
        placeholder="Search Permissions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TableContainer>
        <Table>
          <TableBody>
            {filteredPermissions.map((permission: string) => (
              <TableRow key={permission}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={(
                      (getFieldValue(field.id) as string[]) || []
                    ).includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    disabled={disabled || !!field.disabled}
                  />
                </TableCell>
                <TableCell>{permission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {field.helperText && (
        <FormHelperText>{translation(field.helperText)}</FormHelperText>
      )}
    </FormControl>
  );
};
