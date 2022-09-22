import { Button, Image, message, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useRef } from 'react';

type ZeusUpload = {
  value?: string;
  onChange?: (value: string) => void;
  data?: Record<string, string>;
};
const ZeusUpload = ({ value, onChange, data = {} }: ZeusUpload) => {
  let msgInstance = useRef<any>(null);
  const props: UploadProps = {
    name: 'file',
    showUploadList: false,
    action: `${process.env.GATEWAY_URL}/file/upload`,
    data: { path: `article/${data.id}` },
    headers: {
      authorization: `Bearer ${sessionStorage.getItem('uid')}`,
    },
    beforeUpload: (file) => {
      return new Promise((resolve) => {
        const suffix = file.name.split('.').pop();
        const copyFile = new File([file], `logo.${suffix}`);
        resolve(copyFile);
      });
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        if (!msgInstance.current) {
          msgInstance.current = message.loading('uploading...', 0);
        }
      }
      if (info.file.status === 'done') {
        msgInstance.current();
        message.success(`${info.file.name} file uploaded successfully`);
        info.file.response.data.map(onChange);
      } else if (info.file.status === 'error') {
        message.destroy();
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div className='flex'>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>upload</Button>
        <Image preview={false} width={200} height={200} src={value} alt='' />
      </Upload>
    </div>
  );
};
export default ZeusUpload;
