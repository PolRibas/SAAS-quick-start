import { Box, Container, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@saas-quick-start/platform/context/presentation/react';
import { RegisterContextRequestType } from '@saas-quick-start/platform/context/presenters';
import { DynamicForm } from '@saas-quick-start/platform/design/components/dynamic-form';
import { registerDynamicForm } from '@saas-quick-start/platform/views/register/infrastructure/browser';

/* eslint-disable-next-line */
export interface RegisterViewProps {}

export const RegisterView = (props: RegisterViewProps) => {
  const { registerService } = useContext(AuthContext);
  const { push } = useRouter();
  if (!registerService) return null;

  const handleSubmit = async (form: {
    [key: string]: unknown;
  }): Promise<void> => {
    return registerService(form as unknown as RegisterContextRequestType)
      .then((res) => {
        push('/login');
      })
      .catch((err) => {
        console.log(err);
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
            Registrate
          </Typography>
        </Toolbar>
        <DynamicForm
          formConfig={registerDynamicForm}
          onSubmit={handleSubmit}
          // loading={loading}
        />
      </Box>
    </Container>
  );
};
