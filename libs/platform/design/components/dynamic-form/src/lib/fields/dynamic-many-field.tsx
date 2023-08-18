import React, { memo } from 'react';
import { DynamicFormBaseField } from '../dynamic-form.interface';
import { useDynamicFormContext } from '../context';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Box,
  Collapse,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DynamicFormField } from './dynamic-form-field';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslations } from 'next-intl';

interface DynamicFormManyFieldProps {
  field: DynamicFormBaseField;
}

const findError = (fields: DynamicFormBaseField[]): boolean => {
  return fields.some((field) => {
    if (field.manyItems) {
      return field.manyItems.some((item) => findError(item));
    }
    return field.validationRules?.some((rule) => rule.error);
  });
};

const ItemCard: React.FC<{
  item: DynamicFormBaseField[];
  index: number;
  fieldLabel: string;
  onRemove: (index: number) => void;
  titleKey?: string;
  disabled?: boolean;
}> = memo(({ item, index, fieldLabel, onRemove, titleKey, disabled }) => {
  const [expanded, setExpanded] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const t = useTranslations('labels');
  const tErrors = useTranslations('error');

  const haveError = findError(item);
  const title: string | undefined =
    titleKey && (item.find((item) => item.field === titleKey)?.value as string);

  const handleDelete = () => {
    onRemove(index);
    setOpenDialog(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: 2,
        borderColor: haveError ? 'error.main' : undefined,
      }}
    >
      {haveError ? (
        <Box sx={{ backgroundColor: 'error.main', color: 'white', padding: 1 }}>
          <Typography variant="body2">{tErrors('error-many-item')}</Typography>
        </Box>
      ) : null}
      <CardHeader
        title={
          <Box>
            <Typography variant="body1" component="div">
              {title && title !== '' ? title : `${index + 1}. ${fieldLabel}`}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="div">
              {t('message-many-subtitle')}
            </Typography>
          </Box>
        }
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              color="error"
              onClick={() => setOpenDialog(true)}
              disabled={disabled}
            >
              <DeleteIcon />
            </IconButton>
            <Button
              variant="contained"
              endIcon={
                <ExpandMoreIcon
                  sx={{
                    transform: expanded ? 'rotate(-180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.5s',
                  }}
                />
              }
              onClick={() => setExpanded(!expanded)}
              size="small"
              sx={{
                textTransform: 'none',
                backgroundColor: !expanded ? 'primary.main' : 'primary.light',
              }}
            >
              {expanded ? t('label-hide') : t('label-show')}
            </Button>
          </Box>
        }
      />
      <Collapse in={expanded}>
        <CardContent>
          <Grid container direction="column" spacing={2}>
            {item.map((innerItem) => (
              <Grid item key={innerItem.id}>
                <DynamicFormField field={innerItem} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Collapse>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{t('message-delete-confirmation')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('message-delete-confirmation-message')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            {t('label-cancel')}
          </Button>
          <Button onClick={handleDelete} color="error" disabled={disabled }>
            {t('label-delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
});

export const DynamicFormManyField: React.FC<DynamicFormManyFieldProps> = ({
  field,
}) => {
  const { addManyItem, removeManyItem, disabled } = useDynamicFormContext();
  const t = useTranslations('labels');

  return (
    <Box my={2}>
      <Box
        sx={{
          padding: 2,
          borderRadius: 2,
          backgroundColor: 'background.default',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
          marginBottom: 3,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Typography variant="h6">{t(field.label)}</Typography>
            <Typography color="textSecondary">{field.placeholder}</Typography>
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'right' }}>
            <Button
              startIcon={<AddCircleOutlineIcon />}
              variant="contained"
              color="primary"
              disabled={disabled || !!field.disabled}
              onClick={() => addManyItem(field.id)}
            >
              {t('label-add')}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {field.manyItems?.map((item, i) => (
        <ItemCard
          key={i + field.id}
          item={item}
          index={i}
          disabled={disabled || !!field.disabled}
          fieldLabel={t(field.label)}
          onRemove={(index) => removeManyItem(index, field.id)}
          titleKey={field.titleKey}
        />
      ))}
    </Box>
  );
};
