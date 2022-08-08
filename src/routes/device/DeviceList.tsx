import { useState } from 'react';
import { removeArticle } from 'service/article';
import ZeusTable from 'components/ZeusTable';
import { Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';
import {deviceList} from "../../service/device";

const DeviceList = () => {
  const access = useAccess();
  const [params] = useState({});
  const navigate = useNavigate();
  const handleDelete = (id: string) => async () => {
    await removeArticle({ id });
    navigate(0);
  };
  const columns = [
    {
      title: '资源名称',
      dataIndex: 'name',
    },
    {
      title: '资源类型',
      dataIndex: 'type',
    },
    {
      title: '连接地址',
      dataIndex: 'url',
    },
    {
      title: '到期时间',
      dataIndex: 'dueDate',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '管理链接',
      dataIndex: 'panel',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: string, record: any) => (
        <Access accessible={access.isAdmin}>
          <Space>
            <Link to={`/article/${record.id}`}>编辑</Link>
            <Button type='text' onClick={handleDelete(record.id)}>删除</Button>
          </Space>
        </Access>
      ),
    },
  ];

  return (
    <>
      <Link to={`/device/_`}>
        <Button type='primary'>新增</Button>
      </Link>
      <ZeusTable columns={columns} service={deviceList} params={params} />
    </>
  );
};

export default DeviceList;
