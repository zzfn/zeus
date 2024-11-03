import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommonLayout from 'layout/CommonLayout';
import Login from './Login';
import Register from './register';
import { useSetAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import useSWR from 'swr';
import { createElement, lazy, Suspense, useEffect } from 'react';
import { Empty, Result, Spin } from 'antd';
import Home from './Home';
import useMenu from '../hooks/useMenu';
import SubscriptionBoardPage from './subscription/subscriptionboard.admin.page';
import FriendList from './friend/FriendList';

export default function Router() {
  const setUser = useSetAtom(userAtom);
  const menus = useMenu();
  const { data, isLoading } = useSWR({
    url: '/v1/app-users/me',
  });

  useEffect(() => {
    setUser(data);
  }, [data]);

  if (isLoading) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <Spin size='large' />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/' element={data?.id ? <CommonLayout /> : <Navigate to='/login' replace />}>
          <Route path='/home' element={<Home />} />
          {menus.map((item: any) => (
            <Route
              key={item.path}
              path={item.path}
              element={
                item.componentPath.includes('.admin.') && !data?.isAdmin ? (
                  <Result
                    status='403'
                    title='403'
                    subTitle='Sorry, you are not authorized to access this page.'
                  />
                ) : (
                  <Suspense fallback={<div>Loading...</div>}>
                    {createElement(lazy(() => import(`./${item.componentPath}`)))}
                    {/*{createElement(item.component)}*/}
                  </Suspense>
                )
              }
            />
          ))}
          <Route path='/subscriptionboard' element={<SubscriptionBoardPage />} />
          <Route path='/friends' element={<FriendList />} />
          <Route path='*' element={<Empty />} />
        </Route>
        <Route path='*' element={<Empty />} />
      </Routes>
    </BrowserRouter>
  );
}
