import { Provider } from 'react-redux';
import { store } from './store';
import Router from './routes';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App(): JSX.Element {
  useEffect(() => {
    store.dispatch.user.updateUserState();
  }, []);
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Provider store={store}>
          <Router />
        </Provider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export { App };
