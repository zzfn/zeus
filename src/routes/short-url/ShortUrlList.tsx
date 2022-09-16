import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import ZeusTable from '../../components/ZeusTable';
import { shortUrlList } from '../../service/short-url';
import { Button, Space, Tag } from 'antd';

dayjs.extend(duration);
dayjs.extend(relativeTime);
const ShortUrlList = () => {
  const columns = [
    {
      title: 'hash',
      dataIndex: 'hash',
    },
    {
      title: '网址',
      dataIndex: 'url',
      render: (_: string) => <a href={_}>{_}</a>,
    },
    {
      title: '过期时间',
      dataIndex: 'expires',
      render: (_: string) => <span>{dayjs(_).format('YYYY-MM-DD hh:mm:ss')}</span>,
    },
    {
      title: 'isInRedis',
      dataIndex: 'isInRedis',
      render: (_: boolean) => (_ ? <Tag color='magenta'>yes</Tag> : <Tag color='red'>no</Tag>),
    },
    {
      title: '操作',
      render: (_: string) => (
        <Space>
          <Button>sync</Button>
          <Button>删除</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ZeusTable showPage={false} columns={columns} service={shortUrlList} params={{}} />
    </>
  );
};

export default ShortUrlList;
