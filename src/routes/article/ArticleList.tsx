import useSWR from 'swr';
import { Radio, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ArticleList = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const { data = [] } = useSWR<any>({
    url: `/v1/articles?isActive=${isActive}`,
  });
  const columns: ColumnsType<any> = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text, record) => <Link to={`/article/ArticleDetail?id=${record.id}`}>{text}</Link>,
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
      <Radio.Group
        defaultValue={true}
        onChange={(event) => {
          setIsActive(event.target.value);
        }}
      >
        <Radio.Button value={true}>active</Radio.Button>
        <Radio.Button value={false}>inactive</Radio.Button>
      </Radio.Group>
      <Table rowKey='id' dataSource={data} columns={columns} />
    </>
  );
};

export default ArticleList;
