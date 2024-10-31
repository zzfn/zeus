import {
  Table,
  Tag,
  Button,
  Space,
  DatePicker,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Radio,
} from 'antd';
import { useState, useEffect } from 'react';
import type { Task } from './types';

const SubscriptionAdminPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: number) => (
        <Tag color={type === 1 ? 'blue' : 'green'}>{type === 1 ? '待办事项' : '订阅'}</Tag>
      ),
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '周期',
      dataIndex: 'cycle',
      key: 'cycle',
    },
    {
      title: '到期日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: '状态',
      dataIndex: 'isCompleted',
      key: 'isCompleted',
      render: (completed: boolean) => (
        <Tag color={completed ? 'green' : 'orange'}>{completed ? '已完成' : '进行中'}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Task) => (
        <Space>
          <Button type='link'>编辑</Button>
          <Button type='link' danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='p-6'>
      <div className='mb-4 flex justify-between'>
        <div className='flex items-center gap-4'>
          <h1 className='text-2xl font-bold'>任务管理</h1>
          <Radio.Group defaultValue='table'>
            <Radio.Button value='table'>表格视图</Radio.Button>
            <Radio.Button value='board'>看板视图</Radio.Button>
          </Radio.Group>
        </div>
        <Button type='primary' onClick={() => setIsModalVisible(true)}>
          新建任务
        </Button>
      </div>

      <Table columns={columns} dataSource={tasks} />

      <Modal
        title='新建任务'
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout='vertical'>
          <Form.Item label='标题' name='title' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label='类型' name='type' rules={[{ required: true }]}>
            <Select>
              <Select.Option value={1}>待办事项</Select.Option>
              <Select.Option value={2}>订阅</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='金额' name='amount'>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label='周期' name='cycle'>
            <Select>
              <Select.Option value='monthly'>每月</Select.Option>
              <Select.Option value='yearly'>每年</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='到期日期' name='dueDate'>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubscriptionAdminPage;
