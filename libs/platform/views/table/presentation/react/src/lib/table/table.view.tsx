import React from 'react';
import { useRouter } from 'next/router';
import { databaseData } from '../data';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { AuthContext } from '@saas-quick-start/platform/context/presentation/react';
import { DynamicTable } from '@saas-quick-start/platform/design/components/dynamic-table';

export const AdminTableView = ({ baseUrl }: { baseUrl: string }) => {
  const { userTokens } = React.useContext(AuthContext);
  const { query, push } = useRouter();
  const t = useTranslations('tables');

  return Object.entries(databaseData).map(([slug, data]) =>
    !query.slug || query.slug === slug ? (
      <Card
        sx={{
          marginTop: '1rem',
          paddingBottom: 0,
          maxHeight: slug === query.slug ? 'auto' : '83px',
          transition: 'max-height 0.5s ease-in-out',
        }}
      >
        <CardHeader
          onClick={slug === query.slug ? null : () => push(`/table/${slug}`)}
          sx={{
            backgroundColor: 'primary.main',
            color: 'secondary.main',
            padding: 2,
            cursor: slug !== query.slug ? 'pointer' : 'default',
            transition: 'color 0.5s ease-in-out',
          }}
          title={
            <Box>
              <Typography variant="h5" color="white" component="div">
                {t(data.title)}
              </Typography>
              <Typography variant="caption" component="div">
                {t(data.subtitle)}
              </Typography>
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
  );
};
