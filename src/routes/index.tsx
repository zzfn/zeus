import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';
import CommonLayout from 'layout/CommonLayout';
import Login from './Login';
import ArticleList from './article/ArticleList';
import ArticleDetail from './article/ArticleDetail';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Spin } from 'antd';
import LogList from './log/LogList';
import ResourceList from "./resource/ResourceList";

export default function Router() {
  let user = useSelector((state: RootState) => state.user);
  return (
    <Spin spinning={user.loading} tip='Loading...'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route
            path='/'
            element={
              user.loginState === false ? <Navigate to='/login' replace /> : <CommonLayout />
            }
          >
            <Route path='home' element={<Home />} />
            <Route path='log' element={<LogList />} />
            <Route path='article' element={<ArticleList />} />
            <Route path='resource' element={<ResourceList />} />
            <Route path='article/:id' element={<ArticleDetail />} />
            <Route path=':id' element={<Detail />} />
            <Route
              path='*'
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There&apos;s nothing here!</p>
                </main>
              }
            />
          </Route>
          <Route
            path='*'
            element={
              <main style={{ padding: '1rem' }}>
                <p>There&apos;s nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Spin>
  );
}
