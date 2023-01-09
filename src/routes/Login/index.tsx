import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { login } from 'service/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useEffect } from 'react';

const Login = () => {
  let user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    const { data, code } = await login(values);
    if (code === 0) {
      sessionStorage.setItem('uid', data.token);
      dispatch({ type: 'user/updateUserState' });
      dispatch({ type: 'user/updateUserInfo' });
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (user.loginState) {
      navigate('/home');
    }
  }, [user]);

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gradient-to-r from-slate-100 to-gray-300'>
      <h1>Sign In</h1>
      <Form
        className='rounded-lg bg-white/30 p-5 backdrop-opacity-80'
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='USERNAME'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder='test' />
        </Form.Item>

        <Form.Item
          label='PASSWORD'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder='test' />
        </Form.Item>

        <Form.Item>
          <div className='flex justify-center gap-x-2'>
            <Button type='primary' htmlType='submit'>
              登录
            </Button>
            <Link to='/register'>
              <Button>注册</Button>
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
