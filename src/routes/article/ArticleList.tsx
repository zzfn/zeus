import { useState } from 'react';
import { articlePage, removeArticle } from 'service/article';
import ZeusTable from 'components/ZeusTable';
import { Select, Space, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Access from 'components/Access';
import { Button, Input } from '@nextui-org/react';

const ArticleList = () => {
  const [params, setParams] = useState({ id: '', isRelease: 'all' });
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
        <a target='_blank' href={`https://zzfzzf.com/article/${record.id}`} rel='noreferrer'>
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
        <Access>
          <Space>
            <Link to={`/article/${record.id}`}>
              <Button variant='ghost' size='sm' color='primary'>
                编辑
              </Button>
            </Link>
            <Button variant='ghost' size='sm' color='danger' onClick={handleDelete(record.id)}>
              删除
            </Button>
          </Space>
        </Access>
      ),
    },
  ];

  return (
    <>
      <Space className='mb-2'>
        <Input
          variant='bordered'
          placeholder='search by id'
          value={params.id}
          onChange={(e) => setParams({ ...params, id: e.target.value })}
        ></Input>
        <Select
          value={params.isRelease}
          onChange={(e) => setParams({ ...params, isRelease: e })}
          style={{ width: '150px' }}
          options={[
            { value: 'all', label: '全部' },
            { value: 'published', label: '已发布' },
            { value: 'unpublished', label: '未发布' },
          ]}
        />
        <Link to='/article/_'>
          <Button color='primary'>新增</Button>
        </Link>
      </Space>
      <ZeusTable columns={columns} service={articlePage} params={params} />
    </>
  );
};

export default ArticleList;
