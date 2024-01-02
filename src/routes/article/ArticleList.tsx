import useSWR from 'swr';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const { data = [] } = useSWR<any>({
    url: '/v1/articles',
  });
  const columns: ColumnsType<any> = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text, record) => <Link to={`/article/detail?id=${record.id}`}>{text}</Link>,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      render: (text) => <Tag>{text ? 'Yes' : 'No'}</Tag>,
    },
  ];
  return (
    <>
      <Table rowKey='id' dataSource={data} columns={columns} />
    </>
  );
};

export default ArticleList;
