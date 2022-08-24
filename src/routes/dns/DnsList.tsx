import { useState } from 'react';
import { removeArticle } from 'service/article';
import ZeusTable from 'components/ZeusTable';
import { Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';
import { dnsList } from '../../service/dns';

const DnsList = () => {
  const access = useAccess();
  const [params] = useState({ url: 'zzfzzf.com' });
  const navigate = useNavigate();
  const handleDelete = (id: string) => async () => {
    await removeArticle({ id });
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
            <Link to={`/article/${record.id}`}>编辑</Link>
            <Button type='text' onClick={handleDelete(record.id)}>
              删除
            </Button>
          </Space>
        </Access>
      ),
    },
  ];

  return (
    <>
      <Link to={`/article/_`}>
        <Button type='primary'>新增</Button>
      </Link>
      <ZeusTable columns={columns} service={dnsList} params={params} />
    </>
  );
};

export default DnsList;
