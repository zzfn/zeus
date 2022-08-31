import { useState } from 'react';
import ZeusTable from 'components/ZeusTable';
import { resourceList, resourceSave } from '../../service/resource';
import { Button, Form, Input, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const Resource = () => {
  const [params] = useState({});
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const columns = [
    {
      title: '唯一code',
      dataIndex: 'code',
    },
    {
      title: '资源名称',
      dataIndex: 'name',
    },
    {
      title: '资源类型',
      dataIndex: 'type',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
  ];
  async function handleSubmit(values: any) {
    const { code } = await resourceSave(values);
    if (code === 0) {
      setVisible(false);
      message.success('新增成功');
      navigate(0);
    }
  }
  return (
    <>
      <Button onClick={() => setVisible(true)}>新增</Button>
      <ZeusTable showPage={false} columns={columns} service={resourceList} params={params} />
      <Modal
        title='新增资源'
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
      >
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label='唯一code'
            name='code'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='资源名称'
            name='name'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='资源类型'
            name='type'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Resource;
