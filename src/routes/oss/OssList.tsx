import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Button, message, Table, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { files } from '../../service/oss';
import { useState } from 'react';

dayjs.extend(duration);
dayjs.extend(relativeTime);
const OssList = () => {
  const [prefix, setPrefix] = useState('');
  const { data = {} } = useQuery(['files', prefix], () =>
    files({ prefix }).then(({ data }) => data),
  );
  const props: UploadProps = {
    name: 'file',
    action: 'http://localhost:7001/file/upload',
    headers: {
      authorization: `Bearer ${sessionStorage.getItem('uid')}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const columns = [
    {
      title: '文件名',
      dataIndex: 'name',
      render: (text: string, record: any) => (
        <Button type='text' onClick={() => record.dir && setPrefix(text)}>
          {text}
        </Button>
      ),
    },
    {
      title: '文件大小',
      dataIndex: 'size',
    },
    {
      title: '更新时间',
      dataIndex: 'lastModified',
    },
    {
      title: '操作',
      render: (_: string) => '详情',
    },
  ];
  return (
    <>
      <ul>
        {prefix.split('/').map((item, idx) => (
          <li key={`${item}${idx}`}>{item}</li>
        ))}
      </ul>
      <Table
        rowKey='id'
        bordered
        pagination={false}
        columns={columns}
        dataSource={data.records ?? []}
      />
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default OssList;
