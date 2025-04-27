import { Button, Card, Input, message, Space, Typography } from 'antd';
import useSWRMutation from 'swr/mutation';
import { mutateData } from '../models/api';

const { Title } = Typography;

export default function Home() {
  const { trigger } = useSWRMutation(`v1/articles/search/sync`, mutateData);
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className='space-y-4'>
      {contextHolder}
      <Card title='数据同步'>
        <Space direction='vertical' className='w-full'>
          <div>
            <Title level={5}>文章索引</Title>
            <Space>
              <Button
                type='primary'
                onClick={async () => {
                  await trigger({ method: 'get' });
                  messageApi.success('文章索引同步成功');
                }}
              >
                同步文章索引
              </Button>
              <span className='text-gray-500'>同步文章数据到搜索引擎</span>
            </Space>
          </div>

          <div>
            <Title level={5}>标签管理</Title>
            <Space align='center'>
              <Input placeholder='输入标签名称' style={{ width: 200 }} />
              <Button
                onClick={async () => {
                  await trigger({ method: 'get' });
                  messageApi.success('标签同步成功');
                }}
              >
                同步标签数据
              </Button>
              <span className='text-gray-500'>更新文章标签信息</span>
            </Space>
          </div>

          <div>
            <Title level={5}>路径管理</Title>
            <Space>
              <Button
                onClick={async () => {
                  await trigger({ method: 'get' });
                  messageApi.success('路径同步成功');
                }}
              >
                同步路径数据
              </Button>
              <span className='text-gray-500'>更新文章路径信息</span>
            </Space>
          </div>
        </Space>
      </Card>

      {/* 保留原有的统计图表注释代码，以便后续恢复 */}
      {/* ... existing chart code ... */}
    </div>
  );
}
