import { Button, Card, Form, Input, message, Space, Switch } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';
import { menuOne, menuSave } from '../../service/menu';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 22 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 11 },
    sm: { span: 10, offset: 11 },
  },
};
const MenuDetail = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const access = useAccess();
  const onFinish = async (values: Record<string, any>): Promise<void> => {
    const { data } = await menuSave({ ...values, id: params.id === '_' ? '' : params.id });
    data && message.success('操作成功');
    data && navigate(`/menu/${data}`);
  };
  const handleFetchArticle = async (id: string) => {
    const { data, msg } = await menuOne({ id });
    if (msg === 'success') {
      form.setFieldsValue(data);
    } else {
      message.error('未知错误');
    }
  };
  useEffect(() => {
    params.id && handleFetchArticle(params.id).then();
  }, [params.id]);
  return (
    <>
      <Card bordered={false}>
        <Form {...formItemLayout} style={{ marginTop: 8 }} form={form} onFinish={onFinish}>
          <Form.Item label={'菜单名称'} name='name'>
            <Input placeholder={'请输入菜单名称'} />
          </Form.Item>
          <Form.Item label={'菜单路径'} name='path'>
            <Input placeholder={'请输入菜单路径'} />
          </Form.Item>
          <Form.Item label={'菜单组件地址'} name='component'>
            <Input placeholder={'请输入菜单组件'} />
          </Form.Item>
          <Form.Item label={'排序号'} name='orderNum'>
            <Input placeholder={'请输入排序号'} />
          </Form.Item>
          <Form.Item label={'是否显示在侧边栏'} name='isShow' valuePropName='checked'>
            <Switch />
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Access accessible={access.isAdmin}>
              <Space>
                <Button type='primary' htmlType='submit'>
                  确认
                </Button>
              </Space>
            </Access>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default MenuDetail;
