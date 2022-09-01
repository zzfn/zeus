import { useEffect, useState } from 'react';
import ZeusTable from 'components/ZeusTable';
import { roleList, roleSave } from '../../service/role';
import { Button, Checkbox, Form, Input, message, Modal, Space } from 'antd';
import { resourceById, resourceList } from '../../service/resource';
import { useQuery } from '@tanstack/react-query';

const Role = () => {
  const [params] = useState({});
  const [visible, setVisible] = useState(false);
  const [roleVisible, setRoleVisible] = useState(false);
  const [roleId, setRoleId] = useState('');
  const [form] = Form.useForm();
  const { data = [] } = useQuery(['resourceById', roleId], () =>
    resourceById({ id: roleId }).then(({ data }) => data),
  );

  async function handleSubmit(values: any) {
    const { code } = await roleSave(values);
    if (code === 0) {
      message.success('新增成功');
    }
  }

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '分配权限',
      render: (_: string, record: any) => (
        <Space>
          <a
            onClick={() => {
              setRoleVisible(true);
              setRoleId(record.id);
            }}
          >
            权限
          </a>
          <a>用户</a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getAllResources(roleId);
  }, [roleId]);

  async function getAllResources(id: string) {
    console.log(id);
    const { data } = await resourceList({});
    const r = await resourceById({ id });
    console.log(data, r);
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>新增</Button>
      <Modal
        title='修改权限'
        visible={roleVisible}
        onOk={() => form.submit()}
        onCancel={() => setRoleVisible(false)}
      >
        <Checkbox.Group options={data.map((item: any) => ({ label: item.name, value: item.id }))} />
      </Modal>
      <Modal
        title='新增角色'
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
      >
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label='角色名称'
            name='name'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <ZeusTable showPage={false} columns={columns} service={roleList} params={params} />
    </>
  );
};

export default Role;
