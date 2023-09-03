import { Link, useNavigate } from 'react-router-dom';
import { login } from 'service/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
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

  console.log(watch('username')); // watch input value by passing the name of it
  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gradient-to-r from-slate-100 to-gray-300'>
      <h1>Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-lg bg-white/30 p-5 backdrop-opacity-80'
      >
        <Input
          validationState={errors.username ? 'invalid' : 'valid'}
          autoFocus
          {...register('username')}
          label='username'
          placeholder='test'
        />

        <Input
          validationState={errors.password ? 'invalid' : 'valid'}
          {...register('password')}
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
    </div>
  );
};
export default Login;
