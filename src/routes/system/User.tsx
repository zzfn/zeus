import { useState } from 'react';
import ZeusTable from 'components/ZeusTable';
import { userList } from '../../service/user';
import { Space } from 'antd';
import UserDetail from './UserDetail';

const User = () => {
  const [params] = useState({});
  const [id, setId] = useState('');

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
      title: '头像',
      dataIndex: 'avatar',
      render: (_: string) => <img className='w-10 h-10 rounded-full' src={_} alt='' />,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (_: string, record: any) => (
        <Space>
          <a
            onClick={() => {
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
      <UserDetail id={id}></UserDetail>
      <ZeusTable columns={columns} service={userList} params={params} />
    </>
  );
};

export default User;
