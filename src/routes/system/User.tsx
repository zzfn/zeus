import { useState } from 'react';
import ZeusTable from 'components/ZeusTable';
import { userList } from '../../service/user';
import { Modal, Space } from 'antd';
import UserDetail from './UserDetail';
import { useQuery } from '@tanstack/react-query';
import { roleList } from '../../service/role';

const User = () => {
  const [params] = useState({});
  const [id, setId] = useState('');
  const [visible, setVisible] = useState(false);
  const { data: roles = [] } = useQuery(['roleList'], () => roleList({}).then(({ data }) => data));

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      render: (_: string, record: any) => (
        <Space>
          <a
            onClick={() => {
              setVisible(true);
              setId(record.id);
            }}
          >
            修改
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal title='用户信息' visible={visible} onCancel={() => setVisible(false)}>
        <UserDetail key={id + visible} roles={roles} userId={id} />
      </Modal>
      <ZeusTable columns={columns} service={userList} params={params} />
    </>
  );
};

export default User;
