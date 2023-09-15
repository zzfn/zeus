import Router from './routes';
import { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';
import { fetchData } from './models/api';
import { StyleProvider } from '@ant-design/cssinjs';

const fetcher = (options) => {
  const { url, ...args } = options;
  return fetchData(url, args);
};

function App(): ReactElement {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      <StyleProvider hashPriority='high'>
        <Router />
      </StyleProvider>
    </SWRConfig>
  );
}

export { App };
