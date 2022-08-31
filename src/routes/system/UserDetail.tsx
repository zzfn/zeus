import { Form, Input, message, Modal, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { changeUser, infoById } from '../../service/user';
import { useEffect, useState } from 'react';
import { roleList } from '../../service/role';

const UserDetail = ({ id }: { id: string }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  async function handleSubmit(values: any) {
    const { success } = await changeUser({ ...values, id });
    success && message.success('success');
  }

  const { data: roles = [] } = useQuery(['roleList'], () => roleList({}).then(({ data }) => data));

  useEffect(() => {
    setVisible(!!id);
  }, [id]);
  useEffect(() => {
    if (visible) {
      getUserInfo();
    }
  }, [visible]);

  async function getUserInfo() {
    const { data } = await infoById({ id });
    form.setFieldsValue(data);
  }

  return (
    <Modal
      title='用户详情'
      visible={visible}
      onOk={() => form.submit()}
      onCancel={() => setVisible(false)}
    >
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item label='用户昵称' name='nickname'>
          <Input />
        </Form.Item>
        <Form.Item label='用户角色' name='role'>
          <Select mode='multiple' allowClear>
            {roles.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UserDetail;
