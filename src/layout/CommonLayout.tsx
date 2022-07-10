import {Outlet, useNavigate} from 'react-router-dom';
import {Layout, Menu, MenuProps} from "antd";
import styles from './common.module.less';
import TopHeader from "./TopHeader";

const {Header, Footer, Sider, Content} = Layout;
const menuItems: MenuProps['items'] = [
    {key: 'workspace', label: '工作台'},
    {key: 'article', label: '文章管理'},
    {key: 'favorite', label: '收藏管理'},
    {key: 'dictionary', label: '字典管理'},
    {key: 'log', label: '日志管理'},
    {
        key: 'cloud', label: '云盘管理', children: [
            {key: 'cloud-file', label: '文件管理'},
            {key: 'cloud-image', label: '图床管理'},
        ]
    },
]
const CommonLayout = () => {
    const navigate = useNavigate();
    const handleMenuClick = ({keyPath}: { keyPath: string[] }) => {
        const paths = keyPath.reverse().join('/');
        navigate(paths)
    }

    return (
        <Layout>
            <Header><TopHeader/></Header>
            <Layout className={styles.layout}>
                <Sider>
                    <Menu
                        onClick={handleMenuClick}
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%'}}
                        items={menuItems}
                    />
                </Sider>
                <Layout>
                    <Content>
                        <Outlet/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©{new Date().getFullYear()} Created by Ant
                        UED</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default CommonLayout;
