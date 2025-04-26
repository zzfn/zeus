import { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Card,
  Space,
  Avatar,
  Tag,
  Popconfirm,
  message,
  Table,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { mutateData } from 'models/api';
interface FriendLink {
  id: number;
  name: string;
  logo: string;
  url: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

const FriendList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);
  const { trigger } = useSWRMutation(`/v1/friend-links`, mutateData);
  const {
    data = [],
    isLoading,
    mutate,
  } = useSWR<FriendLink[]>({
    url: '/v1/friend-links',
  });
  const columns: TableProps<FriendLink>['columns'] = [
    {
      title: '友链信息',
      dataIndex: 'name',
      width: '30%',
      render: (_, record) => (
        <Space>
          <Avatar
            src={record.logo}
            size='large'
            shape='square'
            className='border border-gray-200'
          />
          <div>
            <div className='font-medium'>{record.name}</div>
            <div className='text-gray-500 text-sm'>{record.description}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '链接',
      dataIndex: 'url',
      width: '25%',
      render: (url) => (
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 hover:text-blue-800 hover:underline'
        >
          {url}
        </a>
      ),
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      width: '15%',
      render: (isActive) => (
        <Tag color={isActive ? 'success' : 'default'}>{isActive ? '已启用' : '已禁用'}</Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: '15%',
      render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      width: '15%',
      render: (_, record) => (
        <Space>
          <Button type='text' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title='确定要删除这个友链吗？'
            description='删除后将无法恢复'
            onConfirm={() => handleDelete(record.id)}
            okText='确定'
            cancelText='取消'
          >
            <Button type='text' danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: FriendLink) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/v1/friend-links/${id}`, { method: 'DELETE' });
      message.success('删除成功');
      mutate();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await trigger({
        method: 'POST',
        body: {
          id: editingId || '',
          ...values,
        },
      });

      message.success(`${editingId ? '更新' : '创建'}成功`);
      setIsModalOpen(false);
      form.resetFields();
      setEditingId(null);
      mutate();
    } catch (error) {
      message.error(`${editingId ? '更新' : '创建'}失败`);
    }
  };

  return (
    <Card className='shadow-xs'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h4 className='text-lg font-medium mb-1'>友链管理</h4>
          <span className='text-gray-500'>管理网站友情链接</span>
        </div>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingId(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          新增友链
        </Button>
      </div>

      <Table<FriendLink>
        columns={columns}
        dataSource={data}
        rowKey='id'
        loading={isLoading}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          defaultPageSize: 10,
        }}
      />

      <Modal
        title={`${editingId ? '编辑' : '新增'}友链`}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingId(null);
        }}
        okText='确定'
        cancelText='取消'
      >
        <Form form={form} layout='vertical' className='mt-4'>
          <Form.Item
            name='name'
            label='网站名称'
            rules={[{ required: true, message: '请输入网站名称' }]}
          >
            <Input placeholder='请输入网站名称' />
          </Form.Item>

          <Form.Item
            name='logo'
            label='网站Logo'
            rules={[{ required: true, message: '请输入Logo地址' }]}
          >
            <Input placeholder='请输入Logo地址' />
          </Form.Item>

          <Form.Item
            name='url'
            label='网站链接'
            rules={[
              { required: true, message: '请输入网站链接' },
              { type: 'url', message: '请输入有效的URL' },
            ]}
          >
            <Input placeholder='请输入网站链接' />
          </Form.Item>

          <Form.Item name='description' label='网站描述'>
            <Input.TextArea rows={3} placeholder='请输入网站描述' />
          </Form.Item>

          <Form.Item name='isActive' label='状态' valuePropName='checked'>
            <Switch checkedChildren='启用' unCheckedChildren='禁用' />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default FriendList;
