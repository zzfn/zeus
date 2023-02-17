import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import ZeusTable from '../../components/ZeusTable';
import { changelogList } from '../../service/changelog';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import Access from '../../components/Access';

dayjs.extend(duration);
dayjs.extend(relativeTime);
const OssList = () => {
  const columns = [
    {
      title: '更新标题',
      dataIndex: 'title',
    },
    {
      title: '更新内容',
      dataIndex: 'content',
    },
    {
      title: '操作',
      render: (_: string, record: any) => (
        <Access>
          <Space>
            <Link to={`/changelog/${record.id}`}>编辑</Link>
          </Space>
        </Access>
      ),
    },
  ];
  return (
    <>
      <Link to='/changelog/_'>
        <Button type='primary'>新增</Button>
      </Link>
      <ZeusTable showPage={false} columns={columns} service={changelogList} params={{}} />
    </>
  );
};

export default OssList;
