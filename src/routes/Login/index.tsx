import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userAtom } from 'atoms/userAtoms';
import { useAtomValue } from 'jotai';
import { Button, Card, Typography } from 'antd';

const { Paragraph, Title } = Typography;

const Login = () => {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      navigate('/home');
    }
  }, [navigate, user]);

  const handleLogin = () => {
    window.sessionStorage.setItem('post_login_redirect', '/home');
    window.location.href = new URL('/v1/app-users/discourse/login', process.env.API_URL).toString();
  };

  return (
    <div className='flex items-center h-screen justify-center'>
      <Card className='max-w-md m-auto'>
        <div className='flex flex-col items-center gap-y-4 p-4 text-center'>
          <Title level={3} className='!mb-0'>
            Zeus 管理后台
          </Title>
          <Paragraph className='!mb-0 text-gray-500'>
            使用 `blog-server-go` 的 Discourse 单点登录进入后台。
          </Paragraph>
          <Button type='primary' size='large' onClick={handleLogin}>
            使用 Discourse 登录
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default Login;
