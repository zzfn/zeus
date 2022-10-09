import { useState } from 'react';
import ZeusTable from 'components/ZeusTable';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';
import { deleteLog, logPage } from '../../service/log';
import { useNavigate } from 'react-router-dom';
import { Button, Input, message, Space, Tooltip } from 'antd';

const LogList = () => {
  const access = useAccess();
  const navigate = useNavigate();
  const [params, setParams] = useState<any>({});
  const [query, setQuery] = useState<any>({});
  const handleDelete = (id: string) => async () => {
    const { data } = await deleteLog({ id });
    message.success(data);
    navigate(0);
  };
  const columns = [
    {
      title: '操作系统',
      children: [
        {
          title: 'os',
          dataIndex: 'os',
          width: 80,
        },
        {
          title: 'version',
          dataIndex: 'osVersion',
          width: 80,
        },
      ],
    },
    {
      title: '浏览器',
      children: [
        {
          title: 'browser',
          dataIndex: 'browser',
          width: 80,
        },
        {
          title: 'version',
          dataIndex: 'browserVersion',
          width: 80,
        },
      ],
    },
    {
      title: '动作',
      children: [
        {
          title: 'name',
          dataIndex: 'name',
          width: 80,
        },
        {
          title: 'score',
          dataIndex: 'value',
          render: (_: number) => _.toFixed(2),
          width: 80,
        },
      ],
    },
    {
      title: 'user',
      children: [
        {
          title: 'visitorId',
          dataIndex: 'visitorId',
          width: 100,
          ellipsis: {
            showTitle: false,
          },
          render: (_: string) => (
            <Tooltip placement='topLeft' title={_}>
              {_}
            </Tooltip>
          ),
        },
        {
          title: 'ip',
          dataIndex: 'ip',
          width: 100,
        },
        {
          title: 'url',
          dataIndex: 'url',
          ellipsis: {
            showTitle: false,
          },
          render: (_: string) => (
            <Tooltip placement='topLeft' title={_}>
              <a target='_blank' href={_} rel='noreferrer'>
                {_}
              </a>
            </Tooltip>
          ),
        },
        {
          title: 'referrer',
          dataIndex: 'referrer',
          width: 100,
        },
      ],
    },
    {
      title: 'time',
      dataIndex: 'time',
      width: 100,
    },
    {
      title: '操作',
      width: 60,
      render: (_: string, record: any) => (
        <Access accessible={access.isAdmin}>
          <a onClick={handleDelete(record.id)}>删除</a>
        </Access>
      ),
    },
  ];

  return (
    <>
      <Space className='mb-2'>
        {['os', 'browser', 'name', 'visitorId', 'ip'].map((item: any) => (
          <>
            <label htmlFor={item}>{item}</label>
            <Input
              allowClear
              value={query[item]}
              onChange={(e) => setQuery({ ...query, [item]: e.target.value })}
              id={item}
            />
          </>
        ))}
        <Button onClick={() => setParams({ ...params, ...query })}>查询</Button>
      </Space>
      <ZeusTable size='small' columns={columns} service={logPage} params={params} />
    </>
  );
};

export default LogList;
