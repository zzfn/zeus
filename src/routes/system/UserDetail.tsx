import { Form, Input, message, Select, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { changeRoleByUserId, changeUser, infoById } from '../../service/user';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const UserDetail = ({ userId, roles }: { userId: string; roles: any[] }) => {
  const [visible, setVisible] = useState(false);
  const { data: roleById = {} } = useQuery(['infoById', userId, visible], () =>
    infoById({ id: userId }).then(({ data }) => data),
  );
  const [form] = Form.useForm();

  async function handleSubmit(values: any) {
    const { success } = await changeUser({ ...values, id: userId });
    success && message.success('success');
  }

  const handleDelete = (roleId: string) => async () => {
    const { success } = await changeRoleByUserId({ userId, roleId, isAdd: false });
    success && message.success('success');
  };

  async function handleAdd(roleId: string) {
    const { success } = await changeRoleByUserId({ userId, roleId, isAdd: true });
    success && message.success('success');
    setVisible(false);
  }

  return (
    <>
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item label='用户昵称' name='nickname'>
          <Input />
        </Form.Item>
      </Form>
      {roleById.role?.map((item: any) => (
        <Tag closable onClose={handleDelete(item.id)} key={item.id}>
          {item.name}
        </Tag>
      ))}
      {visible ? (
        <Select onChange={handleAdd} className='w-full'>
          {roles
            .filter((item) => !roleById.role?.some((_: any) => _.id === item.id))
            .map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
        </Select>
      ) : (
        <Tag onClick={() => setVisible(true)}>
          <PlusOutlined /> New Role
        </Tag>
      )}
    </>
  );
};
export default UserDetail;
