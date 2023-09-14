import { Link, Outlet, useMatch, useResolvedPath } from 'react-router-dom';
import WaterMark from '../components/WaterMark';
import { Avatar, Header, NavList, Octicon, PageLayout } from '@primer/react';
import { MarkGithubIcon } from '@primer/octicons-react';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/userAtoms';
import { ReactNode } from 'react';

function NavItem({ to, children }: { to: string; children: ReactNode }) {
  const resolved = useResolvedPath(to);
  const isCurrent = useMatch({ path: resolved.pathname, end: true });
  return (
    <NavList.Item as={Link} to={to} aria-current={isCurrent ? 'page' : undefined}>
      {children}
    </NavList.Item>
  );
}

const CommonLayout = () => {
  const user = useAtomValue(userAtom);
  return (
    <WaterMark content={user?.username}>
      <div className='sticky top-0 z-50'>
        <PageLayout.Header>
          <Header>
            <Header>
              <Header.Link href='/'>
                <Octicon icon={MarkGithubIcon} size={32} sx={{ mr: 2 }} />
                <span>GitHub</span>
              </Header.Link>
            </Header>
            <Header.Item full>Menu</Header.Item>
            <Header.Item sx={{ mr: 0 }}>
              {user?.username}
              <Avatar src='https://github.com/octocat.png' size={20} square alt='@octocat' />
            </Header.Item>
          </Header>
        </PageLayout.Header>
      </div>
      <PageLayout padding='none' containerWidth='full'>
        <PageLayout.Content>
          <Outlet />
        </PageLayout.Content>
        <PageLayout.Pane position='start'>
          <NavList className='sticky top-0 z-50'>
            <NavItem to='/home' aria-current='page'>
              Home
            </NavItem>
            <NavItem to='/article'>Article</NavItem>
          </NavList>
        </PageLayout.Pane>
        <PageLayout.Footer>{new Date().getFullYear()} &copy; wawama</PageLayout.Footer>
      </PageLayout>
    </WaterMark>
  );
};
export default CommonLayout;
