import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Textarea,
} from '@nextui-org/react';
import { friendSave } from '../service/friend';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

type Friends = {
  url: string;
  title: string;
  description: string;
  logo: string;
};
const ApplyFriend = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Friends>();
  const onSubmit: SubmitHandler<Friends> = async (values) => {
    const { get } = await FingerprintJS.load();
    const { visitorId } = await get();
    const { code } = await friendSave({ ...values, visitorId });
    if (code === 0) {
      toast.success('申请成功');
      reset();
    }
  };
  const onError = () => {
    toast.warning('请填写完整');
  };
  return (
    <>
      <Helmet>
        <title>友链申请</title>
      </Helmet>
      <Card className='max-w-md m-auto mt-20'>
        <CardHeader>
          <Chip>友链申请</Chip>
        </CardHeader>
        <CardBody>
          <form className='flex flex-col gap-y-3  px-6' onSubmit={handleSubmit(onSubmit, onError)}>
            <Input
              type='url'
              isRequired
              validationState={errors.url ? 'invalid' : 'valid'}
              autoFocus
              {...register('url', { required: true })}
              label='URL'
            />

            <Input
              isRequired
              validationState={errors.title ? 'invalid' : 'valid'}
              {...register('title', { required: true, })}
              label='TITLE'
              maxLength={10}
            />
            <Textarea
              isRequired
              validationState={errors.description ? 'invalid' : 'valid'}
              {...register('description', { required: true })}
              label='DESCRIPTION'
              maxLength={10}
            />
            <Input
              type='url'
              isRequired
              validationState={errors.logo ? 'invalid' : 'valid'}
              {...register('logo', { required: true })}
              label='LOGO'
            />
            <CardFooter>
              <Button className='w-full' color='primary' type='submit'>
                申请
              </Button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </>
  );
};
export default ApplyFriend;
