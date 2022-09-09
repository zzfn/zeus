import { Button, Card, Form, Input, message, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { deviceOne, saveDevice } from 'service/device';
import { useEffect } from 'react';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';

const ArticleDetail = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const access = useAccess();
  const onFinish = async (values: Record<string, any>): Promise<void> => {
    const { data } = await saveDevice({ ...values, id: params.id === '_' ? '' : params.id });
    data && message.success('操作成功');
    data && navigate(`/device/${data}`);
  };
  const handleFetchArticle = async (id: string) => {
    const { data, msg } = await deviceOne({ id });
    if (msg === 'success') {
      form.setFieldsValue(data);
    } else {
      message.error('未知错误');
    }
  };
  useEffect(() => {
    params.id && params.id !== '_' && handleFetchArticle(params.id).then();
  }, [params.id]);
  return (
    <>
      <Card bordered={false}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ marginTop: 8 }}
          form={form}
          onFinish={onFinish}
          initialValues={{ isRelease: true }}
        >
          <Form.Item
            label='资源名称'
            name='name'
            rules={[
              {
                required: true,
                message: '88',
              },
            ]}
          >
            <Input placeholder='请输入标题' />
          </Form.Item>
          <Form.Item
            label='资源类型'
            name='type'
            rules={[
              {
                required: true,
                message: '请选择标签',
              },
            ]}
          >
            <Input placeholder='请输入标题' />
          </Form.Item>
          <Form.Item
            label='连接地址'
            name='url'
            rules={[
              {
                required: true,
                message: '请输入排序号',
              },
            ]}
          >
            <Input placeholder='请输入排序号' />
          </Form.Item>
          <Form.Item label='到期时间' name='dueDate'>
            <Input placeholder='请输入LOGO' />
          </Form.Item>
          <Form.Item
            label='备注'
            name='remark'
            rules={[
              {
                required: true,
                message: '请输入备注',
              },
            ]}
          >
            <Input.TextArea placeholder='请输入备注' />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
            label='管理链接'
            name='PANEL'
          >
            <Input placeholder='请输入LOGO' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 12 }} style={{ marginTop: 32 }}>
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

export default ArticleDetail;
