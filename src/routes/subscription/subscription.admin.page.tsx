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
import useSWRMutation from 'swr/mutation';
import { mutateData } from '../../models/api';
import useSWR from 'swr';
import dayjs from 'dayjs';
import SubscriptionBoardPage from './subscriptionboard.admin.page';

const SubscriptionAdminPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();
  const { trigger } = useSWRMutation(`v1/task`, mutateData);
  const {
    data: tasks,
    isLoading,
    mutate,
  } = useSWR({
    url: '/v1/task',
  });
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
      render: (cycle: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'ONCE') => {
        const cycleMap = {
          DAILY: '每天',
          WEEKLY: '每周',
          MONTHLY: '每月',
          QUARTERLY: '每季',
          YEARLY: '每年',
          ONCE: '一次性',
        };
        return cycleMap[cycle] || cycle;
      },
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-'),
    },
    {
      title: '到期日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'PENDING' | 'ONGOING' | 'COMPLETED') => {
        const statusConfig = {
          PENDING: { color: 'orange', text: '待处理' },
          ONGOING: { color: 'blue', text: '进行中' },
          COMPLETED: { color: 'green', text: '已完成' },
        };

        return (
          <Tag color={statusConfig[status]?.color || 'default'}>
            {statusConfig[status]?.text || status}
          </Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Task) => (
        <Space>
          <Button type='link' onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type='link' danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    form.setFieldsValue({
      ...task,
      dueDate: task.dueDate ? dayjs(task.dueDate) : null,
      startDate: task.startDate ? dayjs(task.startDate) : null,
    });
    setIsModalVisible(true);
  };
  async function handleOk(values) {
    await trigger({
      method: editingTask ? 'put' : 'post',
      body: editingTask ? { ...values, id: editingTask.id } : values,
    });
    setIsModalVisible(false);
    setEditingTask(null);
    form.resetFields();
    mutate();
  }
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingTask(null);
    form.resetFields();
  };
  const [viewType, setViewType] = useState('table');

  return (
    <div className='p-6'>
      <div className='mb-4 flex justify-between'>
        <div className='flex items-center gap-4'>
          <h1 className='text-2xl font-bold'>任务管理</h1>
          <Radio.Group value={viewType} onChange={(e) => setViewType(e.target.value)}>
            <Radio.Button value='table'>表格视图</Radio.Button>
            <Radio.Button value='board'>看板视图</Radio.Button>
          </Radio.Group>
        </div>
        <Button type='primary' onClick={() => setIsModalVisible(true)}>
          新建任务
        </Button>
      </div>

      {viewType === 'table' ? (
        <Table columns={columns} dataSource={tasks} />
      ) : (
        <SubscriptionBoardPage
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={async (task) => {
            // 处理删除逻辑
          }}
          onStatusChange={async (taskId, newStatus) => {
            await trigger({
              method: 'put',
              body: { id: taskId, status: newStatus },
            });
            // 处理状态变更逻辑
          }}
        />
      )}

      <Modal
        title={editingTask ? '编辑任务' : '新建任务'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleOk} layout='vertical'>
          <Form.Item label='标题' name='title' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label='类型' name='type' rules={[{ required: true }]}>
            <Select>
              <Select.Option value='TODO'>待办事项</Select.Option>
              <Select.Option value='SUBSCRIPTION'>订阅</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='金额' name='amount'>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label='周期' name='cycle' initialValue='ONCE'>
            <Select>
              <Select.Option value='DAILY'>每天</Select.Option>
              <Select.Option value='WEEKLY'>每周</Select.Option>
              <Select.Option value='MONTHLY'>每月</Select.Option>
              <Select.Option value='QUARTERLY'>每季</Select.Option>
              <Select.Option value='YEARLY'>每年</Select.Option>
              <Select.Option value='ONCE'>一次性</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='开始日期' name='startDate' initialValue={dayjs()}>
            <DatePicker
              format='YYYY-MM-DD HH:mm:ss'
              showTime={{ format: 'HH:mm:ss' }}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item label='到期日期' name='dueDate' initialValue={dayjs().add(1, 'day')}>
            <DatePicker
              format='YYYY-MM-DD HH:mm:ss'
              showTime={{ format: 'HH:mm:ss' }}
              style={{ width: '100%' }}
            />
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
