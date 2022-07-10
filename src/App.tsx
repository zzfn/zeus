import {Provider} from 'react-redux';
import {store} from './store';
import Router from "./routes";
import {useEffect} from "react";

function App(): JSX.Element {
    useEffect(() => {
        store.dispatch({type: 'user/updateUserState'})
    }, [])
    return (
        <Provider store={store}>
            <Router/>
        </Provider>
    );
}

export {App};
