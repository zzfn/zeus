import { Button, Card, Form, Input, message, Space } from 'antd';
import MarkdownEditor from 'components/MarkdownEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';
import { isExist } from '../../utils/isExist';
import { changelogOne, changelogSave } from '../../service/changelog';

const ArticleDetail = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const access = useAccess();
  const onFinish = async (values: Record<string, any>): Promise<void> => {
    const { data } = await changelogSave({ ...values, id: params.id === '_' ? '' : params.id });
    data && message.success('操作成功');
    data && navigate(`/article/${data}`);
  };
  const handleFetchArticle = async (id: string) => {
    const { data, success } = await changelogOne({ id });
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
            label='内容'
            name='content'
            rules={[
              {
                required: true,
                message: '请输入内容',
              },
            ]}
          >
            <MarkdownEditor articleId={params.id} />
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
