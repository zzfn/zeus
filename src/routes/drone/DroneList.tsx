import { Switch, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { droneRepos } from '../../service/drone';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);
const DroneList = () => {
  const { data = [] } = useQuery(['droneRepos'], () => droneRepos({}).then(({ data }) => data));
  const [active, setActive] = useState(true);
  const columns = [
    {
      title: '仓库',
      dataIndex: 'slug',
      render: (text: string, record: any) => (
        <a target='_blank' href={record.link} rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: '最近更新时间',
      render: (_text: string, record: any) => (
        <span>
          {dayjs.duration(dayjs.unix(record.build?.finished).diff(dayjs())).humanize(true)}
        </span>
      ),
    },
    {
      title: '操作',
      render: (_: string, record: any) => (
        <Link to={`/drone/${record.namespace}/${record.name}`}>详情</Link>
      ),
    },
  ];
  const dataSource = useMemo(() => {
    if (active) {
      return data.filter((item: any) => item.active);
    } else {
      return data;
    }
  }, [active, data]);
  return (
    <>
      <div className='mb-2 flex items-center'>
        <Switch size='small' checked={active} onChange={(checked) => setActive(checked)} />
        <span className='ml-2'>Active Only</span>
      </div>
      <Table rowKey='id' bordered pagination={false} columns={columns} dataSource={dataSource} />
    </>
  );
};

export default DroneList;
