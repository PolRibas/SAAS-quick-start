import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDataTableContext } from '../context';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import {
  DynamicFormGrid,
  DynamicFormProvider,
} from '@saas-quick-start/platform/design/components/dynamic-form';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    maxWidth: '1000px',
    padding: 0,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  '&:last-child': {
    marginRight: 0,
  },
}));

export const DynamicTableItemComponent: React.FC = () => {
  const {
    selectedRow,
    setSelectedRow,
    creatingItem,
    setCreatingItem,
    tableData,
    tableHeadersOptions,
    fullConfig,
    selectedData,
    onCloseItem,
    deleteSelectedItem,
    submitFormItem,
  } = useDataTableContext();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [pendingToDelete, setPendingToDelete] = React.useState(false);
  const [isDisable] = React.useState(false);

  const t = useTranslations('labels');

  const formConfig = React.useMemo(() => {
    if (selectedRow !== undefined && tableHeadersOptions) {
      return tableHeadersOptions.map((item) => {
        return {
          ...item,
          value: selectedData[item.field],
        };
      });
    }
    if (creatingItem && tableHeadersOptions) {
      return tableHeadersOptions.map((item) => {
        return {
          ...item,
          disabled: false,
        };
      });
    }
    return [];
  }, [creatingItem, tableHeadersOptions, selectedRow, selectedData]);

  const handleOpenCloseDialog = () => {
    if (!openDialog) {
      setOpenDialog(true);
    } else {
      handleClose();
    }
  };
  const handleClose = () => {
    setSelectedRow(undefined);
    setCreatingItem(false);
    setOpenDialog(false);
    onCloseItem();
  };

  const handlerDelete = async () => {
    setPendingToDelete(true);
  };

  const handlerSubmit = async (form: { [key: string]: unknown }) => {
    Object.keys(selectedData).forEach((key) => {
      if (form[key] !== undefined) {
        selectedData[key] = form[key];
      }
    });
    submitFormItem(form);
  };
  const confirmDelete = async () => {
    setSelectedRow(undefined);
    setCreatingItem(false);
    setOpenDialog(false);
    setPendingToDelete(false);
    deleteSelectedItem();
  };

  return (
    <StyledDrawer
      anchor="right"
      open={!!selectedRow || selectedRow === 0 || creatingItem}
      onClose={handleOpenCloseDialog}
    >
      <DynamicFormProvider
        props={{
          formConfig,
          parentSubmit: handlerSubmit,
          disabled:
            (!fullConfig.canCreate && creatingItem) ||
            (!fullConfig.canUpdate && (!!selectedRow || selectedRow === 0)),
        }}
      >
        <Card sx={{ height: '100%', overflow: 'auto', borderRadius: 0 }}>
          <CardHeader
            sx={{
              backgroundColor: 'primary.main',
              borderRadius: 0,
            }}
            title={
              <Toolbar
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    edge="end"
                    color="secondary"
                    onClick={handleClose}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  {(!!selectedRow || selectedRow === 0) &&
                  fullConfig.itemTitle &&
                  fullConfig.itemSubtitle ? (
                    <div
                      style={{
                        marginLeft: 30,
                      }}
                    >
                      <Box>
                        <Typography variant="h6" component="div" color="white">
                          {fullConfig.itemTitle(tableData[selectedRow])}
                        </Typography>
                        <Typography
                          variant="caption"
                          component="div"
                          color="secondary.light"
                        >
                          {fullConfig.itemSubtitle(tableData[selectedRow])}
                        </Typography>
                      </Box>
                    </div>
                  ) : null}
                </div>
                <div>
                  {creatingItem ? (
                    <StyledButton
                      color="secondary"
                      variant="outlined"
                      type="submit"
                      disabled={isDisable || !fullConfig.canCreate}
                    >
                      {t('label-create')}
                    </StyledButton>
                  ) : (
                    <>
                      <StyledButton
                        color="error"
                        variant="outlined"
                        onClick={handlerDelete}
                        disabled={isDisable || !fullConfig.canDelete}
                      >
                        {t('label-delete')}
                      </StyledButton>
                      <StyledButton
                        color="secondary"
                        variant="outlined"
                        type="submit"
                        disabled={isDisable || !fullConfig.canUpdate}
                      >
                        {t('label-update')}
                      </StyledButton>
                    </>
                  )}
                </div>
              </Toolbar>
            }
          ></CardHeader>
          <CardContent
            sx={{
              height: '100vh',
              overflow: 'auto',
              maxHeight: 'calc(100vh - 96px)',
            }}
          >
            <DynamicFormGrid />
          </CardContent>
        </Card>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{t('message-delete-confirmation')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('message-skip-confirmation')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="text"
              color="primary"
            >
              {t('label-cancel')}
            </Button>
            <Button onClick={handleClose} variant="text" color="error">
              {t('label-leave')}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={pendingToDelete}
          onClose={() => setPendingToDelete(false)}
        >
          <DialogTitle>{t('message-delete-confirmation')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('message-delete-confirmation-message')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setPendingToDelete(false)}
              variant="text"
              color="primary"
            >
              {t('label-cancel')}
            </Button>
            <Button onClick={confirmDelete} variant="text" color="error">
              {t('label-delete')}
            </Button>
          </DialogActions>
        </Dialog>
      </DynamicFormProvider>
    </StyledDrawer>
  );
};
