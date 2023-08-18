import { Box, Container, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';

import { useRouter } from 'next/router';
import { AuthContext } from '@saas-quick-start/platform/context/presentation/react';
import {
  CreateCompanyApiBrowserAdapter,
  createCompanyDynamicForm,
} from '@saas-quick-start/platform/views/create-company/infrastructure/browser';
import { DynamicForm } from '@saas-quick-start/platform/design/components/dynamic-form';

/* eslint-disable-next-line */
export interface CreateCompanyViewProps {
  baseUrl: string;
}

export const CreateCompanyView = (props: CreateCompanyViewProps) => {
  const { userTokens, getMe } = useContext(AuthContext);
  const { push } = useRouter();

  const handleSubmit = async (form: { [key: string]: unknown }) => {
    const companyService = new CreateCompanyApiBrowserAdapter(
      props.baseUrl,
      userTokens.accessToken || ''
    );
    return companyService
      .createCompany(
        form as unknown as {
          name: string;
          address: string;
          phoneNumber: string;
          email: string;
        }
      )
      .then(async (response) => {
        await getMe();
        push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'primary',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          boxShadow: 5,
          borderRadius: 2,
        }}
      >
        <Toolbar>
          <Typography component="h1" variant="h5">
            Create Your Company
          </Typography>
        </Toolbar>
        <DynamicForm
          formConfig={createCompanyDynamicForm}
          onSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
};
