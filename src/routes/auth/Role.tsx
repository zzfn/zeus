import { useState } from 'react';
import ZeusTable from 'components/ZeusTable';
import { roleList } from '../../service/role';

const Role = () => {
  const [params] = useState({});

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
  ];

  return (
    <>
      <ZeusTable showPage={false} columns={columns} service={roleList} params={params} />
    </>
  );
};

export default Role;
