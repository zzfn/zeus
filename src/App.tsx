import Router from './routes';
import { ReactElement } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseStyles, ThemeProvider } from '@primer/react';
import { SWRConfig } from 'swr';
import { fetchData } from './models/api';

function App(): ReactElement {
  return (
    <ThemeProvider>
      <BaseStyles>
        <SWRConfig
          value={{
            fetcher: fetchData,
          }}
        >
          <NextUIProvider>
            <ToastContainer />
            <Router />
          </NextUIProvider>
        </SWRConfig>
      </BaseStyles>
    </ThemeProvider>
  );
}

export { App };
