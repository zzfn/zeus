import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';
import styles from './common.module.less';
import TopHeader from './TopHeader';
import { useEffect, useState } from 'react';
import WaterMark from "../components/WaterMark";
import {useSelector} from "react-redux";
import {RootState} from "../store";
const { Header, Footer, Sider, Content } = Layout;
const menuItems: MenuProps['items'] = [
  { key: 'home', label: '工作台' },
  { key: 'article', label: '文章管理' },
  { key: 'dictionary', label: '字典管理' },
  { key: 'log', label: '日志管理' },
  { key: 'device', label: '资源管理' },
  {
    key: 'cloud',
    label: '云盘管理',
    children: [
      { key: 'cloud-file', label: '文件管理' },
      { key: 'cloud-image', label: '图床管理' },
    ],
  },
];
const CommonLayout = () => {
  let user = useSelector((state: RootState) => state.user);
  const [selectKey, setSelectKey] = useState<string[]>(['']);
  const navigate = useNavigate();
  const location = useLocation();
  const handleMenuClick = ({ keyPath }: { keyPath: string[] }) => {
    const paths = keyPath.reverse().join('/');
    navigate(paths);
  };
  useEffect(() => {
    setSelectKey(location.pathname.split('/').filter(Boolean).slice(0, 1));
  }, [location.pathname]);
  return (
      <WaterMark content={user?.info?.nickName}>
        <Layout>
          <Header>
            <TopHeader />
          </Header>
          <Layout className={styles.layout}>
            <Sider>
              <Menu
                  selectedKeys={selectKey}
                  onClick={handleMenuClick}
                  mode='inline'
                  style={{ height: '100%' }}
                  items={menuItems}
              />
            </Sider>
            <Layout>
              <Content style={{ padding: '15px' }}>
                <Outlet />
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                 {new Date().getFullYear()} &copy; CocoPlums
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </WaterMark>
  );
};
export default CommonLayout;
