import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommonLayout from 'layout/CommonLayout';
import Login from './Login';
import Register from './register';
import ArticleList from './article/ArticleList';
import ArticleDetail from './article/ArticleDetail';
import { useSetAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import useSWR from 'swr';
import { createElement, lazy, Suspense, useEffect } from 'react';
import { Empty, Result, Spin } from 'antd';
import List from './snap/List';
import Home from './Home';
import useMenu from '../hooks/useMenu';

export default function Router() {
  const setUser = useSetAtom(userAtom);
  const menus = useMenu();
  const { data, isLoading } = useSWR({
    url: '/v1/app-users/me',
  });

  useEffect(() => {
    setUser(data);
    console.log(menus);
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
          <Route path='/article' element={<ArticleList />} />
          <Route path='/article/detail' element={<ArticleDetail />} />
          <Route
            path='/snap'
            element={
              data?.isAdmin ? (
                <List />
              ) : (
                <Result
                  status='403'
                  title='403'
                  subTitle='Sorry, you are not authorized to access this page.'
                />
              )
            }
          />
          {menus.map((item: any) => (
            <Route
              key={item.path}
              path={item.path.replace('.tsx', '')}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {createElement(lazy(() => import(`./${item.path}`)))}
                  {/*{createElement(item.component)}*/}
                </Suspense>
              }
            />
          ))}
          <Route path='*' element={<Empty />} />
        </Route>
        <Route path='*' element={<Empty />} />
      </Routes>
    </BrowserRouter>
  );
}
