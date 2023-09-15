import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import useSWR from 'swr';
import MarkdownEditor from 'components/MarkdownEditor';
import { Button, Form, FormInstance, Input, Switch } from 'antd';
import useSWRMutation from 'swr/mutation';
import { mutateData } from 'models/api';

const ArticleDetail = () => {
  const formRef = useRef<FormInstance>(null);
  const [searchParams] = useSearchParams();
  const { data } = useSWR({
    url: '/v1/articles/' + searchParams.get('id'),
  });
  const { trigger } = useSWRMutation(`/v1/articles/${searchParams.get('id')}`, mutateData);
  useEffect(() => {
    formRef.current?.setFieldsValue(data);
  }, [data]);
  const onFinish = async (values: any) => {
    await trigger({
      body: values,
      method: 'PUT',
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        ref={formRef}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Tag'
          name='tag'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='是否发布' name='isActive' valuePropName='checked'>
          <Switch />
        </Form.Item>
        <Form.Item name='content'>
          <MarkdownEditor />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ArticleDetail;
