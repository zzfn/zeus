import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Dropdown, Menu, Tag } from 'antd';
import { RootState } from '../../store';
import styles from './index.module.less';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getCdn } from '../../utils/getCdn';

const TopHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      sessionStorage.removeItem('uid');
      dispatch({ type: 'user/updateUser', payload: { loginState: undefined, info: undefined } });
      navigate('/login');
    }
  };
  useEffect(() => {
    dispatch({ type: 'user/updateUserInfo' });
  }, []);
  return (
    <div className={styles.topHeader}>
      <img className='w-14 h-14' src={getCdn('/assets/logo.png')} alt='' />
      <div>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu
              onClick={handleMenuClick}
              items={[
                {
                  key: 'logout',
                  label: (
                    <>
                      <LogoutOutlined /> 退出登录
                    </>
                  ),
                },
              ]}
            />
          }
        >
          <a>
            {user.info?.nickname} <DownOutlined />
          </a>
        </Dropdown>
        <Tag color='orange'>{process.env.APP_ENV}</Tag>
      </div>
    </div>
  );
};
export default TopHeader;
