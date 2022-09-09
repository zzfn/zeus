import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import ZeusTable from '../../components/ZeusTable';
import { changelogList } from '../../service/changelog';

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
      render: (_: string) => '详情',
    },
  ];
  return (
    <>
      <ZeusTable showPage={false} columns={columns} service={changelogList} params={{}} />
    </>
  );
};

export default OssList;
