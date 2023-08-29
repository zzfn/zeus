import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {Dropdown} from 'antd';
import {RootState} from '../../store';
import {DownOutlined, LogoutOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import Logo from "../../components/Logo";

const TopHeader = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const handleMenuClick = ({key}: { key: string }) => {
        if (key === 'logout') {
            sessionStorage.removeItem('uid');
            dispatch({type: 'user/updateUser', payload: {loginState: undefined, info: undefined}});
            navigate('/login');
        }
    };
    useEffect(() => {
        dispatch({type: 'user/updateUserInfo'});
    }, []);
    return (
        <div className='flex justify-between items-center'>
            <Logo width={90} height={30}/>
            <div>
                <Dropdown
                    trigger={['click']}
                    menu={{
                        onClick: handleMenuClick,
                        items: [
                            {
                                key: 'logout',
                                label: (
                                    <>
                                        <LogoutOutlined/> 退出登录
                                    </>
                                ),
                            },
                        ],
                    }}
                >
                    <a className='text-amber-50'>
                        {user.info?.nickname} <DownOutlined/>
                    </a>
                </Dropdown>
            </div>
        </div>
    );
};
export default TopHeader;
