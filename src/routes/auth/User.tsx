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
      dataIndex: 'nickName',
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
  ];

  return (
    <>
      <ZeusTable columns={columns} service={userList} params={params} />
    </>
  );
};

export default User;
