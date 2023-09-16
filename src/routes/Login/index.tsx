import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userAtom } from 'atoms/userAtoms';
import { useAtomValue } from 'jotai';
import { Button, Card, Form, Input } from 'antd';
import useSWRMutation from 'swr/mutation';
import { mutateData } from 'models/api';

const Login = () => {
  let user = useAtomValue(userAtom);
  const { trigger } = useSWRMutation('/v1/app-users/login', mutateData);

  const navigate = useNavigate();
  useEffect(() => {
    if (user?.id) {
      navigate('/home');
    }
  }, [user]);
  const onSubmit = async (values:any) => {
    console.log(values);
    const data = await trigger({
      body: values,
      method: 'POST',
    });
    localStorage.setItem('uid', data as string);
  };

  return (
    <div className='flex items-center h-screen justify-center'>
      <Card className='max-w-md m-auto'>
        <Form className='flex flex-col gap-y-3' onFinish={onSubmit}>
          <Form.Item name='username'>
            <Input autoFocus placeholder='test' />
          </Form.Item>
          <Form.Item name='password'>
            <Input type='password' placeholder='test' />
          </Form.Item>
          <div className='flex justify-center gap-x-2'>
            <Link to='/register'>
              <Button>注册</Button>
            </Link>
            <Button type='primary' color='primary' htmlType='submit'>
              登录
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
