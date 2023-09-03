import { Link, useNavigate } from 'react-router-dom';
import { login } from 'service/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';

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
  let user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (user.loginState) {
      navigate('/home');
    }
  }, [user]);
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const { data, code } = await login(values);
    if (code === 0) {
      sessionStorage.setItem('uid', data.token);
      dispatch({ type: 'user/updateUserState' });
      dispatch({ type: 'user/updateUserInfo' });
    }
  };

  return (
    <Card className='max-w-md m-auto mt-28'>
      <CardHeader>
        <h1>ZEUS中台</h1>
      </CardHeader>
      <CardBody>
        <form className='flex flex-col gap-y-3' onSubmit={handleSubmit(onSubmit)}>
          <Input
            isRequired
            validationState={errors.username ? 'invalid' : 'valid'}
            autoFocus
            {...register('username', { required: true })}
            label='username'
            placeholder='test'
          />

          <Input
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
  );
};
export default Login;
