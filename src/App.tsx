import Router from './routes';
import { ReactElement, useEffect } from 'react';
import { SWRConfig } from 'swr';
import { fetchData } from './models/api';
import { StyleProvider } from '@ant-design/cssinjs';

const fetcher = (options: any) => {
  const { url, ...args } = options;
  return fetchData(url, args);
};

function App(): ReactElement {
  useEffect(() => {
    console.log(`GIT_VERSION: ${process.env.GIT_VERSION}`);
    console.log(`GIT_AUTHOR_DATE: ${process.env.GIT_AUTHOR_DATE}`);
  });
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
