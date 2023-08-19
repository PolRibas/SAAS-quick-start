import './styles.css';
import { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { NextIntlProvider } from 'next-intl';
import { getTranslations } from '../messages';
import { ThemeProvider } from '@mui/material';
import { muiTheme } from '@saas-quick-start/platform/design/theme';
import { FrontOfficeContextApiBrowserAdapter } from '@saas-quick-start/platform/context/infrastructure/browser';
import { AuthProvider } from '@saas-quick-start/platform/context/presentation/react';

const AuthServices = new FrontOfficeContextApiBrowserAdapter('http://localhost:5011')

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Admin Page</title>
      </Head>
      <NextIntlProvider messages={pageProps.messages}>
        <ThemeProvider theme={muiTheme}>
          <main>
            <AuthProvider
              services={AuthServices}
              defaultPrivateRoute="/dashboard"
              defaultPublicRoute="/login"
            >
              <Component {...pageProps} />
            </AuthProvider>
          </main>
        </ThemeProvider>
      </NextIntlProvider>
    </>
  );
};

CustomApp.getInitialProps = async (context: AppContext) => {
  return {
    pageProps: {
      messages: getTranslations(context?.router?.locale || 'en'),
    },
  };
};

export default CustomApp;
