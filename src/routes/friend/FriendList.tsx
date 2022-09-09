import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import ZeusTable from '../../components/ZeusTable';
import { friendList } from '../../service/friend';

dayjs.extend(duration);
dayjs.extend(relativeTime);
const OssList = () => {
  const columns = [
    {
      title: '网站标题',
      dataIndex: 'title',
    },
    {
      title: '网站描述',
      dataIndex: 'description',
    },
    {
      title: '链接',
      dataIndex: 'url',
      render: (_: string) => <a href={_}>{_}</a>,
    },
    {
      title: '操作',
      render: (_: string) => '详情',
    },
  ];
  return (
    <>
      <ZeusTable showPage={false} columns={columns} service={friendList} params={{}} />
    </>
  );
};

export default OssList;
