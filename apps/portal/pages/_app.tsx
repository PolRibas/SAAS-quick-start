import './styles.css';
import { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { NextIntlProvider } from 'next-intl';
import { getTranslations } from '../messages';
// import { AuthProvider } from '@sports-mind/platform/context/auth';
// import { ThemeProvider } from '@mui/material/styles';
// import { getTranslations } from '../messages';
// import { muiTheme } from '@sports-mind/design/theme';
// import { AdminAuthServices } from '@sports-mind/platform/services/admin';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Portal Page</title>
      </Head>
      <NextIntlProvider messages={pageProps.messages}>
        {/* <ThemeProvider theme={muiTheme}>
          <main>
            <AuthProvider
              services={new AdminAuthServices('http://localhost:5011')}
              defaultPrivateRoute="/dashboard"
              defaultPublicRoute="/login"
            >
              <Component {...pageProps} />
            </AuthProvider>
          </main>
        </ThemeProvider> */}
        <Component {...pageProps} />
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
