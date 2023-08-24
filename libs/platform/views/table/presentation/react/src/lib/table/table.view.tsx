import React from 'react';
import { useRouter } from 'next/router';
import { databaseData } from '../data';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { AuthContext } from '@saas-quick-start/platform/context/presentation/react';
import { DynamicTable } from '@saas-quick-start/platform/design/components/dynamic-table';
import { getIconByName } from '@saas-quick-start/platform/design/assets/react';

const UserIcon = getIconByName('ManageAccounts');

export const AdminTableView = ({ baseUrl }: { baseUrl: string }) => {
  const { userTokens } = React.useContext(AuthContext);
  const { query, push } = useRouter();
  const t = useTranslations('tables');

  return query.slug ? (
    Object.entries(databaseData).map(([slug, data]) =>
      query.slug === slug ? (
        <Card sx={{ marginTop: 0, borderRadius: '0.5rem' }}>
          <CardHeader
            // onClick={slug === query.slug ? null : () => push(`/table/${slug}`)}
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
                    {t(data.title)}
                  </Typography>
                  <Typography variant="caption" component="div">
                    {t(data.subtitle)}
                  </Typography>
                </Box>
              </Box>
            }
          />
          <CardContent
            sx={{
              padding: 0,
              paddingBottom: '0px !important',
              maxHeight: slug === query.slug ? '1000px' : '0px',
              overflow: 'auto',
              transition: 'max-height 0.5s ease-in-out',
              margin: 0,
            }}
          >
            {query.slug && (
              <Divider
                sx={{
                  border: 0,
                  height: '2px',
                  background:
                    'linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.1), rgba(52, 71, 103, 0))',
                }}
              />
            )}
            {slug === query.slug ? (
              <DynamicTable
                dynamicTable={data}
                baseUrl={baseUrl}
                token={userTokens.accessToken || undefined}
              />
            ) : null}
          </CardContent>
        </Card>
      ) : null
    )
  ) : (
    <Grid container spacing={3}>
      {Object.entries(databaseData).map(([slug, data]) => {
        const SlugIcon = getIconByName(data.icon);
        return (
          <Grid item xs={12} sm={6} key={slug}>
            <Card
              onClick={() => push(`/table/${slug}`)}
              sx={{
                padding: 3,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: (t) => t.palette.grey[100],
                },
              }}
            >
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
                  <SlugIcon fontSize="large" sx={{ fill: 'white' }} />
                </Card>
                <Box>
                  <Typography variant="h6" color="primary" component="div">
                    {t(data.title)}
                  </Typography>
                  <Typography variant="caption" component="div">
                    {t(data.subtitle)}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
