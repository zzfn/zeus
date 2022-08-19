import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import styles from './common.module.less';
import TopHeader from './TopHeader';
import { useEffect, useState } from 'react';
import WaterMark from '../components/WaterMark';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../store';
import { list2tree } from '../utils/list2tree';

const { Header, Footer, Sider, Content } = Layout;

const CommonLayout = () => {
  let menu = useSelector((state: RootState) => state.menu);
  let user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<Dispatch>();
  const [selectKey, setSelectKey] = useState<string[]>(['']);
  const navigate = useNavigate();
  const location = useLocation();
  const handleMenuClick = ({ keyPath }: { keyPath: string[] }) => {
    const paths = keyPath.reverse().join('/');
    navigate(paths);
  };
  useEffect(() => {
    dispatch.menu.updateMenuInfo();
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
              items={list2tree(
                menu
                  ?.filter((item) => item.isShow)
                  .sort((a, b) => a.orderNum - b.orderNum)
                  .map((item) => ({
                    key: item.path,
                    label: item.name,
                    pid: item.parentId,
                    id: item.id,
                  })),
              )}
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
