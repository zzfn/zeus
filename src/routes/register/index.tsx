import { Alert, Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from 'service/user';
import styles from './index.module.less';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useEffect } from 'react';

const Register = () => {
  let user = useSelector((state: RootState) => state.user);
  const onFinish = async (values: any) => {
    const { data, code } = await userRegister(values);
    console.log(data, code);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (user.loginState) {
      navigate('/home');
    }
  }, [user]);

  return (
    <div className={styles.loginContainer}>
      <Alert message='访客账号密码 test/test' type='info' />
      <Form className={styles.loginForm} onFinish={onFinish} autoComplete='off'>
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button block type='primary' htmlType='submit'>
            注册
          </Button>
        </Form.Item>
      </Form>
      <Link to='/login'>去登录</Link>
    </div>
  );
};
export default Register;
