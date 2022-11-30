import { Alert, Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from 'service/user';

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { code } = await userRegister(values);
    if (code === 0) {
      message.success('注册成功');
      navigate('/login');
    }
  };

  return (
    <div>
      <Alert message='访客账号密码 test/test' type='info' />
      <Form onFinish={onFinish} autoComplete='off'>
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
