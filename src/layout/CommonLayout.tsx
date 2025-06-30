import { Outlet, useNavigate, useResolvedPath } from 'react-router-dom';
import WaterMark from '../components/WaterMark';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/userAtoms';
import { Avatar, Button, Layout, Menu, Popover, theme } from 'antd';
import { useState } from 'react';

const { Content, Footer, Sider } = Layout;

const CommonLayout = () => {
  const resolved = useResolvedPath(location.pathname);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([resolved.pathname]);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <WaterMark content={user?.username}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className='h-screen flex flex-col justify-between items-center py-10'>
            <Menu
              onClick={(item) => {
                setSelectedKeys(item.keyPath);
                navigate(item.key);
              }}
              selectedKeys={selectedKeys}
              theme='dark'
              mode='inline'
              items={[
                { path: '/home', name: 'Home' },
                { path: '/article/ArticleList', name: 'Article' },
                { path: '/snap/List', name: 'Snap' },
                { path: '/user/Detail', name: 'Config' },
                { path: '/subscription/subscription', name: '订阅管理' },
                { path: '/friend/FriendList', name: '友链管理' },
                { path: '/calculator/AnnualReturnCalculator', name: '收益年化计算器' },
              ].map((menu) => ({
                key: menu.path,
                label: menu.name,
              }))}
            />
            <Popover
              placement='right'
              content={
                <Button
                  onClick={() => {
                    localStorage.removeItem('uid');
                    navigate(0);
                  }}
                >
                  logout
                </Button>
              }
            >
              <Avatar
                style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }}
                size='large'
                gap={4}
              >
                {user?.username}
              </Avatar>
            </Popover>
          </div>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                overflow: 'auto',
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </WaterMark>
  );
};
export default CommonLayout;
