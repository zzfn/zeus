import {Provider} from 'react-redux';
import {store} from './store';
import Router from "./routes";
import {useEffect} from "react";
import {QueryClient, QueryClientProvider,} from 'react-query'

const queryClient = new QueryClient()

function App(): JSX.Element {
    useEffect(() => {
        store.dispatch.user.updateUserState()
    }, [])
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Router/>
            </Provider>
        </QueryClientProvider>
    );
}

export {App};
