import { Link, useNavigate } from 'react-router-dom';
import { login } from 'service/user';
import { useEffect } from 'react';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { userAtom } from '../../atoms/userAtoms';
import { useAtomValue } from 'jotai';
import { TextInput } from '@primer/react';

type Inputs = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  let user = useAtomValue(userAtom);

  const navigate = useNavigate();
  useEffect(() => {
    if (user?.id) {
      navigate('/home');
    }
  }, [user]);
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const { data, code } = await login(values);
    if (code === 2000) {
      localStorage.setItem('uid', data);
    }
  };

  return (
    <div className='flex items-center h-screen'>
      <Card className='max-w-md m-auto'>
        <CardHeader>
          <h1>ZEUS中台</h1>
        </CardHeader>
        <CardBody>
          <form className='flex flex-col gap-y-3' onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              isRequired
              validationState={errors.username ? 'invalid' : 'valid'}
              autoFocus
              {...register('username', { required: true })}
              label='username'
              placeholder='test'
            />

            <TextInput
              isRequired
              validationState={errors.password ? 'invalid' : 'valid'}
              {...register('password', { required: true })}
              label='password'
              type='password'
              placeholder='test'
            />

            <div className='flex justify-center gap-x-2'>
              <Button color='primary' type='submit'>
                登录
              </Button>
              <Link to='/register'>
                <Button>注册</Button>
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Login;
