import useSWR from 'swr';
import { Card, Radio, Table, Tag, Typography, Space, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DownloadOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ArticleList = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const { data = [], isLoading } = useSWR<any>({
    url: `/v1/articles?isActive=${isActive}`,
  });

  const columns: ColumnsType<any> = [
    {
      title: '文章标题',
      dataIndex: 'title',
      render: (text, record) => (
        <Link
          to={`/article/ArticleDetail?id=${record.id}`}
          className='text-blue-600 hover:text-blue-800 hover:underline'
        >
          {text}
        </Link>
      ),
    },
    {
      title: '标签',
      dataIndex: 'tag',
      render: (tags) => (
        <Space size={[0, 8]} wrap>
          {typeof tags === 'string' ? (
            <Tag color='blue'>{tags}</Tag>
          ) : (
            tags?.map((tag: string) => (
              <Tag color='blue' key={tag}>
                {tag}
              </Tag>
            ))
          )}
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      render: (active) => (
        <Tag color={active ? 'success' : 'default'}>{active ? '已发布' : '未发布'}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type='link'
            icon={<DownloadOutlined />}
            onClick={async () => {
              const response = await fetch(
                `${process.env.API_URL}/v1/articles/export/markdown/${record.id}`,
              );
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
              console.log(url);
              // 这里添加下载逻辑
              const link = document.createElement('a');
              link.href = url;
              link.download = `${record.title}.md`; // 设置下载文件名
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              // 清理blob URL
              URL.revokeObjectURL(url);
            }}
          >
            下载
          </Button>
          <Button
            type='link'
            icon={<ThunderboltOutlined />}
            onClick={async () => {
              await fetch(`${process.env.API_URL}/v1/articles/vectorize/${record.id}`, {
                method: 'POST',
              });
            }}
          >
            更新向量
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card className='shadow-xs'>
      <Space direction='vertical' size='large' className='w-full'>
        <div className='flex justify-between items-center'>
          <div>
            <Title level={4} className='mb-1!'>
              文章管理
            </Title>
            <span className='text-gray-500'>管理所有的文章内容</span>
          </div>

          <Radio.Group
            value={isActive}
            onChange={(event) => setIsActive(event.target.value)}
            className='bg-gray-100 p-1 rounded-lg'
          >
            <Radio.Button value={true} className='px-4'>
              已发布
            </Radio.Button>
            <Radio.Button value={false} className='px-4'>
              未发布
            </Radio.Button>
          </Radio.Group>
        </div>

        <Table
          rowKey='id'
          dataSource={data}
          columns={columns}
          loading={isLoading}
          pagination={{
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            pageSize: 10,
          }}
          className='border border-gray-200 rounded-lg'
        />
      </Space>
    </Card>
  );
};

export default ArticleList;
