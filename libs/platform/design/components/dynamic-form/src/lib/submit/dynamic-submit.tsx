import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useDynamicFormContext } from '../context';

interface DynamicSubmitProps {
  label?: string;
}

export const DynamicSubmit: React.FC<DynamicSubmitProps> = ({ label = 'Submit' }) => {
  const { formLoading } = useDynamicFormContext();


  return (
    <Button
      variant="contained"
      color="primary"
      type='submit'
      disabled={formLoading}
      endIcon={formLoading ? <CircularProgress size={20} /> : null}
      sx={{
        marginTop: 2,
        width: '100%',
      }}
    >
      {label}
    </Button>
  );
};

