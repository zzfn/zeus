import { Button, Card, Form, Input, message, Space, Switch } from 'antd';
import SelectCode from 'components/SelectCode';
import MarkdownEditor from 'components/MarkdownEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { articleOne, saveArticle } from 'service/article';
import { useEffect } from 'react';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';
import { isExist } from '../../utils/isExist';
import ZeusUpload from '../../components/ZeusUpload';

const ArticleDetail = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const access = useAccess();
  const onFinish = async (values: Record<string, any>): Promise<void> => {
    const { data } = await saveArticle({ ...values, id: params.id === '_' ? '' : params.id });
    data && message.success('操作成功');
    data && navigate(`/article/${data}`);
  };
  const handleFetchArticle = async (id: string) => {
    const { data, success } = await articleOne({ id });
    if (success) {
      form.setFieldsValue(data);
    } else {
      message.error('未知错误');
    }
  };
  useEffect(() => {
    params.id && isExist(params.id) && handleFetchArticle(params.id).then();
  }, [params.id]);
  return (
    <>
      <Card bordered={false}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ marginTop: 8 }}
          form={form}
          onFinish={onFinish}
          initialValues={{ isRelease: true }}
        >
          <Form.Item
            label='标题'
            name='title'
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
            label='标签'
            name='tagId'
            rules={[
              {
                required: true,
                message: '请选择标签',
              },
            ]}
          >
            <SelectCode placeholder='请选择标签' code='TAG' />
          </Form.Item>
          <Form.Item
            label='排序号'
            name='orderNum'
            rules={[
              {
                required: true,
                message: '请输入排序号',
              },
            ]}
          >
            <Input placeholder='请输入排序号' />
          </Form.Item>
          <Form.Item label='LOGO' name='logo'>
            <ZeusUpload />
          </Form.Item>
          <Form.Item
            label='摘要'
            name='summary'
            rules={[
              {
                required: true,
                message: '请输入摘要',
              },
            ]}
          >
            <Input.TextArea placeholder='请输入摘要' />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
            label='是否发布'
            name='isRelease'
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label='文章'
            name='content'
            rules={[
              {
                required: true,
                message: '请选择标签',
              },
            ]}
          >
            <MarkdownEditor />
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
