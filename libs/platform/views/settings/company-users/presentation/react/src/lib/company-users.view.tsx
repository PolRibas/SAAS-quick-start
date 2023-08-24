import {
  Card,
  Tabs,
  Tab,
  Box,
  CardHeader,
  Typography,
  Divider,
} from '@mui/material';
import { AuthContext } from '@saas-quick-start/platform/context/presentation/react';
import { ContextCompanyPresenter } from '@saas-quick-start/platform/context/presenters';
import { getIconByName } from '@saas-quick-start/platform/design/assets/react';
import { DynamicTable } from '@saas-quick-start/platform/design/components/dynamic-table';
import {
  getCompanyRolesDataBase,
  getCompanyUsersDataBase,
} from '@saas-quick-start/platform/views/settings/company-users/infrastructure/browser';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { FC, SyntheticEvent, useContext, useMemo, useState } from 'react';

const UserIcon = getIconByName('ManageAccounts');

export const CompanyUsersView: FC<{ baseUrl: string }> = (props) => {
  const router = useRouter();
  const { selectedCompany } = useContext(AuthContext);

  const [currentTab, setCurrentTab] = useState(router.query.tab || 'users');
  const t = useTranslations('settings');

  const companyUserTable = useMemo(() => {
    return getCompanyUsersDataBase(
      selectedCompany as ContextCompanyPresenter,
      props.baseUrl
    );
  }, [selectedCompany, props.baseUrl]);

  const companyRolesTable = useMemo(() => {
    return getCompanyRolesDataBase(selectedCompany as ContextCompanyPresenter);
  }, [selectedCompany]);

  const handleChange = (_: SyntheticEvent<Element, Event>, value: string) => {
    if (value === 'users') {
      router.push({
        pathname: router.pathname,
        query: {},
      });
      setCurrentTab(value);
    } else {
      router.push({
        pathname: router.pathname,
        query: { tab: value },
      });
    }
    setCurrentTab(value);
  };

  return (
    <Card sx={{ marginTop: 0, borderRadius: '0.5rem' }}>
      <CardHeader
        sx={{
          padding: 3,
          transition: 'color 0.5s ease-in-out',
        }}
        title={
          <Box display="flex">
            <Card
              sx={{
                height: 54,
                width: 54,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 1.5,
                backgroundColor: (t) => t.palette.primary.main,
              }}
            >
              <UserIcon fontSize="large" sx={{ fill: 'white' }} />
            </Card>
            <Box>
              <Typography variant="h5" color="primary" component="div">
                {t('settings-company-users-title')}
              </Typography>
              <Typography variant="caption" component="div">
                {t('settings-company-users-subtitle')}
              </Typography>
            </Box>
          </Box>
        }
      />
      <Divider
        sx={{
          border: 0,
          height: '2px',
          background:
            'linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.1), rgba(52, 71, 103, 0))',
        }}
      />

      <DynamicTable
        filterSlot={
          <Tabs
            value={currentTab}
            onChange={handleChange}
            variant="scrollable"
            sx={{
              height: '3rem',
              // borderRadius: '0.5rem',
            }}
          >
            {[
              {
                label: 'Users',
                value: 'users',
              },
              {
                label: 'Roles',
                value: 'roles',
              },
            ].map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                sx={{
                  borderRadius: '0.5rem',
                  textTransform: 'none',
                }}
              />
            ))}
          </Tabs>
        }
        dynamicTable={
          currentTab === 'users' ? companyUserTable : companyRolesTable
        }
        baseUrl={props.baseUrl}
        token={selectedCompany?.accessToken || undefined}
      />
    </Card>
  );
};
