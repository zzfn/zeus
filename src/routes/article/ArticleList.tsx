import { useState } from 'react';
import { articlePage } from 'service/article';
import ZeusTable from 'components/ZeusTable';
import {Space, Tag} from 'antd';
import { Link } from 'react-router-dom';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';

const ArticleList = () => {
  const access = useAccess();
  const [params] = useState({});
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (_: string,record:any) => (
          <a target='_blank' href={`https://zzfzzf.com/article/${record.id}`}>{record.title}</a>
      )
    },
    {
      title: '是否发布',
      dataIndex: 'isRelease',
      render: (_: boolean) => (
          _?<Tag color='#87d068'>已发布</Tag>:<Tag color='#108ee9'>草稿</Tag>
      )
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
          </Space>
        </Access>
      ),
    },
  ];

  return (
    <>
      <ZeusTable columns={columns} service={articlePage} params={params} />
    </>
  );
};

export default ArticleList;
