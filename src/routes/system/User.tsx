import { useState } from 'react';
import ZeusTable from 'components/ZeusTable';
import { userList } from '../../service/user';

const User = () => {
  const [params] = useState({});

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
  ];

  return (
    <>
      <ZeusTable columns={columns} service={userList} params={params} />
    </>
  );
};

export default User;
