import { Button, Image, message, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type ZeusUpload = {
  value?: string;
  onChange?: (value: string) => void;
};
const ZeusUpload = ({ value, onChange }: ZeusUpload) => {
  const props: UploadProps = {
    name: 'file',
    showUploadList: false,
    action: `${process.env.GATEWAY_URL}/file/upload`,
    headers: {
      authorization: `Bearer ${sessionStorage.getItem('uid')}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        info.file.response.data.map(onChange);
      } else if (info.file.status === 'error') {
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
