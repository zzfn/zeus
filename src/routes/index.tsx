import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommonLayout from 'layout/CommonLayout';
import Login from './Login';
import Register from './register';
import ApplyFriend from './ApplyFriend';
import ArticleList from './article/ArticleList';
import { Blankslate } from '@primer/react/drafts';
import { BookIcon } from '@primer/octicons-react';
import ArticleDetail from './article/ArticleDetail';
import { useSetAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import useSWR from 'swr';
import { Spinner } from '@primer/react';
import { useEffect } from 'react';

export default function Router() {
  const setUser = useSetAtom(userAtom);
  const { data, isLoading } = useSWR({
    endpoint: '/v1/app-users/me',
  });

  useEffect(() => {
    setUser(data);
  }, [data]);

  if (isLoading) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <Spinner size='large' />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/apply-friend' element={<ApplyFriend />} />
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/' element={data?.id ? <CommonLayout /> : <Navigate to='/login' replace />}>
          <Route path='/article' element={<ArticleList />} />
          <Route path='/article/:id' element={<ArticleDetail />} />

          {/*{[].map((item: any) => (*/}
          {/*  <Route*/}
          {/*    key={item.id}*/}
          {/*    path={item.path}*/}
          {/*    element={*/}
          {/*      <Suspense fallback={<div>Loading...</div>}>*/}
          {/*        {React.createElement(React.lazy(() => import(`./${item.component}`)))}*/}
          {/*      </Suspense>*/}
          {/*    }*/}
          {/*  />*/}
          {/*))}*/}
          <Route
            path='*'
            element={
              <Blankslate>
                <Blankslate.Visual>
                  <BookIcon size='medium' />
                </Blankslate.Visual>
                <Blankslate.Heading>Welcome to the mona wiki!</Blankslate.Heading>
                <Blankslate.Description>
                  Wikis provide a place in your repository to lay out the roadmap of your project,
                  show the current status, and document software better, together.
                </Blankslate.Description>
                <Blankslate.PrimaryAction href='#'>Create the first page</Blankslate.PrimaryAction>
                <Blankslate.SecondaryAction href='#'>
                  Learn more about wikis
                </Blankslate.SecondaryAction>
              </Blankslate>
            }
          />
        </Route>
        <Route
          path='*'
          element={
            <Blankslate>
              <Blankslate.Visual>
                <BookIcon size='medium' />
              </Blankslate.Visual>
              <Blankslate.Heading>Welcome to the mona wiki!</Blankslate.Heading>
              <Blankslate.Description>
                Wikis provide a place in your repository to lay out the roadmap of your project,
                show the current status, and document software better, together.
              </Blankslate.Description>
              <Blankslate.PrimaryAction href='#'>Create the first page</Blankslate.PrimaryAction>
              <Blankslate.SecondaryAction href='#'>
                Learn more about wikis
              </Blankslate.SecondaryAction>
            </Blankslate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
