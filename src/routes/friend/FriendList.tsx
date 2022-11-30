import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import ZeusTable from '../../components/ZeusTable';
import { friendList } from '../../service/friend';
import { Button, Modal } from 'antd';
import { useState } from 'react';

dayjs.extend(duration);
dayjs.extend(relativeTime);
const Friend = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>新增</Button>
      <ZeusTable showPage={false} columns={columns} service={friendList} params={{}} />
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Friend;
