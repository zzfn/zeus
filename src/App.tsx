import { Provider } from 'react-redux';
import { store } from './store';
import Router from './routes';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient();

function App(): JSX.Element {
  useEffect(() => {
    store.dispatch.user.updateUserState();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#158bb8',
              colorInfo: '#158bb8',
            },
          }}
        >
          <Router />
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export { App };
