import { useState } from 'react';
import ZeusTable from 'components/ZeusTable';
import { Drawer, Form, Input, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';
import { addDns, dnsDomains, dnsList, removeDns, updateDns } from '../../service/dns';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const DnsList = () => {
  const { data = [] } = useQuery(['dnsDomains'], () =>
    dnsDomains(params).then(({ data }) => data.records),
  );
  const [form] = Form.useForm();
  const [RecordId, setRecordId] = useState('');
  const access = useAccess();
  const [params, setParams] = useState({ DomainName: 'zzfzzf.com' });
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const handleDelete = (RecordId: string) => async () => {
    await removeDns({ RecordId });
    navigate(0);
  };
  const columns = [
    {
      title: 'RR',
      dataIndex: 'RR',
    },
    {
      title: 'DomainName',
      dataIndex: 'DomainName',
    },
    {
      title: 'Value',
      dataIndex: 'Value',
    },
    {
      title: 'Type',
      dataIndex: 'Type',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (_: string, record: any) => (
        <Access accessible={access.isAdmin}>
          <Space>
            <Button
              onClick={() => {
                setVisible(true);
                setRecordId(record.RecordId);
                form.setFieldsValue(record);
              }}
            >
              修改
            </Button>
            <Button onClick={handleDelete(record.RecordId)}>删除</Button>
          </Space>
        </Access>
      ),
    },
  ];

  async function handleSubmit(values: any) {
    if (RecordId) {
      const { code } = await updateDns({ ...values, RecordId });
      if (code === 0) {
        toast.success('更新成功');
      } else {
        toast.warning('更新失败');
      }
    } else {
      const { code } = await addDns({ ...values, DomainName: params.DomainName });
      if (code === 0) {
        toast.success('添加成功');
      } else {
        toast.warning('添加失败');
      }
    }
  }

  return (
    <>
      {data.length !== 0 && (
        <Select
          style={{ width: '200px' }}
          onChange={(value) => setParams({ ...params, DomainName: value })}
          value={params.DomainName}
        >
          {data.map((item: any) => (
            <Select.Option key={item.DomainName} value={item.DomainName}>
              {item.DomainName}
            </Select.Option>
          ))}
        </Select>
      )}
      <Button
        onClick={() => {
          setVisible(true);
          setRecordId('');
        }}
      >
        新增
      </Button>
      <Drawer
        title={params.DomainName}
        placement='right'
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleSubmit}
          initialValues={{ Type: 'A' }}
        >
          <Form.Item
            label='记录类型'
            name='Type'
            rules={[{ required: true, message: 'Please input your Type!' }]}
          >
            <Select>
              <Select.Option value='A'>A记录</Select.Option>
              <Select.Option value='CNAME'>CNAME记录</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item required label='主机记录'>
            <Form.Item
              rules={[{ required: true, message: 'Please input your RR!' }]}
              name='RR'
              noStyle
            >
              <Input />
            </Form.Item>
            <span>{params.DomainName}</span>
          </Form.Item>
          <Form.Item
            label='记录值'
            name='Value'
            rules={[{ required: true, message: 'Please input your Value!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='submit'>Submit</Button>
          </Form.Item>
        </Form>
      </Drawer>
      <ZeusTable rowKey='RecordId' columns={columns} service={dnsList} params={params} />
    </>
  );
};

export default DnsList;
