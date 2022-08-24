import { useState } from 'react';
import { articlePage, removeArticle } from 'service/article';
import ZeusTable from 'components/ZeusTable';
import { Button, Input, Space, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';

const ArticleList = () => {
  const access = useAccess();
  const [params, setParams] = useState({ id: '' });
  const navigate = useNavigate();
  const handleDelete = (id: string) => async () => {
    await removeArticle({ id });
    navigate(0);
  };
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (_: string, record: any) => (
        <a target='_blank' href={`https://zzfzzf.com/article/${record.id}`} rel="noreferrer">
          {record.title}
        </a>
      ),
    },
    {
      title: '是否发布',
      dataIndex: 'isRelease',
      render: (_: boolean) =>
        _ ? <Tag color='#87d068'>已发布</Tag> : <Tag color='#108ee9'>草稿</Tag>,
    },
    {
      title: '排序号',
      dataIndex: 'orderNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
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
      <Input
        value={params.id}
        onChange={(e) => setParams({ ...params, id: e.target.value })}
      ></Input>
      <Link to={`/article/_`}>
        <Button type='primary'>新增</Button>
      </Link>
      <ZeusTable columns={columns} service={articlePage} params={params} />
    </>
  );
};

export default ArticleList;
