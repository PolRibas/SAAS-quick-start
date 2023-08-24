import { Box, Card, CardHeader, Grid, Typography } from '@mui/material';
import { withAuth } from '@saas-quick-start/platform/context/presentation/react';
import { getIconByName } from '@saas-quick-start/platform/design/assets/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

const UserIcon = getIconByName('ManageAccounts');

export function SettingsPage() {
  const t = useTranslations('settings');
  const { push } = useRouter();

  return (
    <Card
      sx={{ marginTop: 0, borderRadius: '0.5rem', cursor: 'pointer' }}
      onClick={() => {
        push('/settings/company-users');
      }}
    >
      <CardHeader
        sx={{
          padding: 3,
          transition: 'color 0.5s ease-in-out',
        }}
        title={
          <Box display="flex">
            <Card
              sx={{
                padding: 1.5,
                marginRight: 1.5,
                backgroundColor: (t) => t.palette.primary.main,
              }}
            >
              <UserIcon fontSize="large" sx={{ fill: 'white' }} />
            </Card>
            <Box>
              <Typography variant="h6" color="primary" component="div">
                {t('settings-company-users-title')}
              </Typography>
              <Typography variant="caption" component="div">
                {t('settings-company-users-subtitle')}
              </Typography>
            </Box>
          </Box>
        }
      />
    </Card>
  );
}

export default withAuth(SettingsPage, {
  requiresAuth: true,
  requiresCompany: true,
});
