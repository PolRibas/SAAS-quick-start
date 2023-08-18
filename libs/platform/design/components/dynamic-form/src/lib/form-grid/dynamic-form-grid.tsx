import { Box, Divider, Grid } from '@mui/material';
import {
  DynamicFormBaseField,
  DynamicFormFormTypeEnum,
} from '../dynamic-form.interface';
import React from 'react';
import { useDynamicFormContext } from '../context';
import { DynamicFormField } from '../fields';

interface RenderFieldProps {
  field: DynamicFormBaseField;
}

const RenderField: React.FC<RenderFieldProps> = ({ field }) => {
  return (
    <Grid item xs={12} md={field.positionX || 12}>
      <DynamicFormField field={field} />
    </Grid>
  );
};

export const DynamicFormGrid: React.FC = () => {
  const { formData } = useDynamicFormContext();

  const groupedByY = formData
    .filter(
      (item) => !item.floatRight && item.type !== DynamicFormFormTypeEnum.hidden
    )
    .reduce((acc, item) => {
      const key = item.positionY || 0;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as Record<number, DynamicFormBaseField[]>);

  const groupedByYRight = formData
    .filter(
      (item) => item.floatRight && item.type !== DynamicFormFormTypeEnum.hidden
    )
    .reduce((acc, item) => {
      const key = item.positionY || 0;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as Record<number, DynamicFormBaseField[]>);

  return !Object.values(groupedByYRight).length ? (
    <Grid container direction="column" spacing={2}>
      {Object.values(groupedByY).map((row, index) => (
        <Grid container item key={index} spacing={2}>
          {row.map((field) => (
            <RenderField field={field} />
          ))}
        </Grid>
      ))}
    </Grid>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row', lg: 'row' },
        flexWrap: 'wrap',
      }}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        sx={{
          width: { xs: '100%', md: '49.5%' },
        }}
      >
        {Object.values(groupedByY).map((row, index) => (
          <Grid container item key={index} spacing={2}>
            {row.map((field) => (
              <RenderField field={field} />
            ))}
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          marginX: '1%',
        }}
      >
        <Divider orientation="vertical" />
      </Box>
      <Grid
        container
        item
        spacing={2}
        direction="column"
        sx={{
          width: { xs: '100%', md: '49.5%' },
        }}
      >
        {Object.values(groupedByYRight).map((row, index) => (
          <Grid container item key={index} spacing={2}>
            {row.map((field) => (
              <RenderField field={field} />
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
