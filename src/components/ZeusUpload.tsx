import { Button, Image, message, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type ZeusUpload = {
  value?: string;
  onChange?: (value: string) => void;
  data?: Record<string, string>;
};
const ZeusUpload = ({ value, onChange, data }: ZeusUpload) => {
  const props: UploadProps = {
    name: 'file',
    showUploadList: false,
    action: `${process.env.GATEWAY_URL}/file/upload`,
    data,
    headers: {
      authorization: `Bearer ${sessionStorage.getItem('uid')}`,
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        message.destroy();
        message.loading('uploading...', 0);
      }
      if (info.file.status === 'done') {
        message.destroy();
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
