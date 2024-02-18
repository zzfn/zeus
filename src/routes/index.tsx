import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommonLayout from 'layout/CommonLayout';
import Login from './Login';
import Register from './register';
import ArticleList from './article/ArticleList';
import ArticleDetail from './article/ArticleDetail';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import useSWR from 'swr';
import { createElement, lazy, Suspense, useEffect } from 'react';
import { Empty, Spin } from 'antd';
import List from './snap/List';
import Home from './Home';
import { menuAtom } from '../atoms/menuAtoms';
import Detail from './user/Detail';

export default function Router() {
  const setUser = useSetAtom(userAtom);
  let [menu] = useAtom(menuAtom);
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
          <Route path='/article' element={<ArticleList />} />
          <Route path='/article/detail' element={<ArticleDetail />} />
          <Route path='/snap' element={<List />} />
          <Route path='/config' element={<Detail />} />

          {menu.map((item: any) => (
            <Route
              key={item.id}
              path={item.path}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {createElement(lazy(() => import(`./${item.component}`)))}
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
