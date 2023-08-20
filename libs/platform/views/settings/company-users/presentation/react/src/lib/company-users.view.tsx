import { Card, Tabs, Tab, Box, CardHeader, Typography } from '@mui/material';
import { AuthContext } from '@saas-quick-start/platform/context/presentation/react';
import { ContextCompanyPresenter } from '@saas-quick-start/platform/context/presenters';
import { DynamicTable } from '@saas-quick-start/platform/design/components/dynamic-table';
import {
  getCompanyRolesDataBase,
  getCompanyUsersDataBase,
} from '@saas-quick-start/platform/views/settings/company-users/infrastructure/browser';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { FC, SyntheticEvent, useContext, useMemo, useState } from 'react';

export const CompanyUsersView: FC<{ baseUrl: string }> = (props) => {
  const router = useRouter();
  const { selectedCompany } = useContext(AuthContext);


  const [currentTab, setCurrentTab] = useState(router.query.tab || 'users');
  const t = useTranslations('settings');

  const companyUserTable = useMemo(() => {
    return getCompanyUsersDataBase(selectedCompany as ContextCompanyPresenter, props.baseUrl);
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
    <Card sx={{ marginTop: 4 }}>
      <CardHeader
        sx={{
          backgroundColor: 'primary.main',
          color: 'secondary.main',
          padding: 2,
          // cursor: slug !== query.slug ? 'pointer' : 'default',
          transition: 'color 0.5s ease-in-out',
        }}
        title={
          <Box>
            <Typography variant="h5" color="white" component="div">
              {t('settings-company-users-title')}
            </Typography>
            <Typography variant="caption" component="div">
              {t('settings-company-users-subtitle')}
            </Typography>
          </Box>
        }
      />
      <Tabs
        value={currentTab}
        onChange={handleChange}
        // orientation="vertical"
        variant="scrollable"
      >
        <Tab label="Users" value="users" />
        <Tab label="Roles" value="roles" />
      </Tabs>
      <DynamicTable
        dynamicTable={
          currentTab === 'users' ? companyUserTable : companyRolesTable
        }
        baseUrl={props.baseUrl}
        token={selectedCompany?.accessToken || undefined}
      />
    </Card>
  );
};
