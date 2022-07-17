import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';
import CommonLayout from '../layout/CommonLayout';
import Login from "./Login";
import ArticleList from "./article/ArticleList";
import ArticleDetail from './article/ArticleDetail';
import {useSelector} from "react-redux";
import {RootState} from "../store";

export default function Router() {
    let user = useSelector((state: RootState) => state.user);
    return (
        user.loading ? <div>loading</div> : <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={user.loginState ? <CommonLayout/> :
                    <Navigate to="/login" replace/>
                }>
                    <Route path='home' element={<Home/>}/>
                    <Route path='article' element={<ArticleList/>}/>
                    <Route path='article/:id' element={<ArticleDetail/>}/>
                    <Route path=':id' element={<Detail/>}/>
                    <Route
                        path='*'
                        element={
                            <main style={{padding: '1rem'}}>
                                <p>There's nothing here!</p>
                            </main>
                        }
                    />
                </Route>
                <Route
                    path='*'
                    element={
                        <main style={{padding: '1rem'}}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
