import {Outlet, useNavigate, useResolvedPath} from 'react-router-dom';
import WaterMark from '../components/WaterMark';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/userAtoms';
import { Avatar, Layout, Menu, theme } from 'antd';
import { useState } from 'react';

const { Content, Footer, Sider } = Layout;
// const useCurrent = function (to: string) {
//   const resolved = useResolvedPath(to);
//   const isCurrent = useMatch({ path: resolved.pathname, end: true });
// };
const CommonLayout = () => {
  const resolved = useResolvedPath(location.pathname)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([resolved.pathname]);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <WaterMark content={user?.username}>
      <Layout hasSider>
        <Sider
          className='fixed left-0 top-0 bottom-0'
          breakpoint='lg'
          collapsedWidth='0'
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className='h-screen flex flex-col justify-between items-center py-10'>
            <Menu
              onClick={(item) => {
                setSelectedKeys(item.keyPath);
                navigate(item.key)
              }}
              selectedKeys={selectedKeys}
              theme='dark'
              mode='inline'
              items={[
                { path: '/home', name: 'Home' },
                { path: '/article', name: 'Article' },
              ].map((menu) => ({
                key: menu.path,
                label: menu.name,
              }))}
            />
            <Avatar
              style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }}
              size='large'
              gap={4}
            >
              {user?.username}
            </Avatar>
          </div>
        </Sider>
        <Layout className='min-h-screen'>
          <Content style={{ margin: '24px 16px 0' }}>
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
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </WaterMark>
  );
};
export default CommonLayout;
