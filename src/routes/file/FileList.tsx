import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Button, Drawer, message, Table, Upload, UploadProps, Image } from 'antd';
import { CopyOutlined, UploadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { files } from '../../service/oss';
import { useState } from 'react';
import { copyToClip } from '../../utils/copyToClip';

dayjs.extend(duration);
dayjs.extend(relativeTime);

function renderSize(filesize: string) {
  if (!filesize) {
    return '0 Bytes';
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let index = 0;
  const srcsize = parseFloat(filesize);
  index = Math.floor(Math.log(srcsize) / Math.log(1024));
  let size = srcsize / Math.pow(1024, index);
  let ret = size.toFixed(2); //保留的小数位数
  return ret + unitArr[index];
}

const FileList = () => {
  const [prefix, setPrefix] = useState('');
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const { data = {} } = useQuery(['files', prefix], () =>
    files({ prefix }).then(({ data }) => data),
  );
  const props: UploadProps = {
    name: 'file',
    action: `${process.env.API_URL}/file/upload`,
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

  function handleCopy(url: string) {
    const result = copyToClip(url);
    if (result) {
      message.success(url);
    }
  }

  const columns = [
    {
      title: '文件名',
      dataIndex: 'name',
      render: (text: string, record: any) => (
        <>
          <a
            onClick={() => {
              if (record.dir) {
                setPrefix(text);
              } else {
                setCurrentUrl(record.url);
                setOpen(true);
              }
            }}
          >
            {text}
          </a>
          {!record.dir && (
            <span className='ml-2 text-cyan-500'>
              <CopyOutlined onClick={() => handleCopy(record.url)} />
            </span>
          )}
        </>
      ),
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      render: (text: string) => <span>{renderSize(text)}</span>,
    },
    {
      title: '更新时间',
      dataIndex: 'lastModified',
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
        size='small'
        rowKey='name'
        bordered
        pagination={false}
        columns={columns}
        dataSource={data.records ?? []}
      />
      <Drawer onClose={() => setOpen(false)} title='预览' placement='right' open={open}>
        <Image src={currentUrl} />
      </Drawer>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default FileList;
