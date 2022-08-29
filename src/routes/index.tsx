import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommonLayout from 'layout/CommonLayout';
import Login from './Login';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Spin } from 'antd';
import React, { Suspense } from 'react';
import Register from './register';

export default function Router() {
  let user = useSelector((state: RootState) => state.user);
  let menu = useSelector((state: RootState) => state.menu);

  return (
    <Spin spinning={user.loading} tip='Loading...'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route
            path='/'
            element={
              user.loginState === false ? <Navigate to='/login' replace /> : <CommonLayout />
            }
          >
            {menu.map((item: any) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    {React.createElement(React.lazy(() => import(`./${item.component}`)))}
                  </Suspense>
                }
              />
            ))}
            {/*<Route path='log' element={<LogList />} />*/}
            {/*<Route path='article' element={<ArticleList />} />*/}
            {/*<Route path='device' element={<DeviceList />} />*/}
            {/*<Route path='user' element={<UserList />} />*/}
            {/*<Route path='menu' element={<MenuList />} />*/}
            {/*<Route path='menu/:id' element={<MenuDetail />} />*/}
            {/*<Route path='device/:id' element={<DeviceDetail />} />*/}
            {/*<Route path='article/:id' element={<ArticleDetail />} />*/}
            {/*<Route path=':id' element={<Detail />} />*/}
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
