import { Image, message, Upload, Card, Typography, Space } from 'antd';
import { uploadFile } from '../../service/article';
import useSWR from 'swr';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Title } = Typography;

function formatFile(file: File) {
  const suffix = file.name.split('.').pop();
  return new File([file], `${Date.now()}.${suffix}`);
}

const ListAdminPage = () => {
  const { data = [], mutate } = useSWR<any>({
    url: '/v1/files/list',
    params: {
      prefix: 'snap/',
      delimiter: '/',
    },
  });

  return (
    <Space direction='vertical' size='large' className='w-full'>
      <Dragger
        customRequest={async ({ file, onSuccess }) => {
          try {
            let formData = new FormData();
            formData.append('objectPath', 'snap');
            formData.append('file', formatFile(file as any));
            const { data } = await uploadFile(formData);
            onSuccess && onSuccess(data);
            // 上传成功后刷新列表
            mutate();
          } catch (error) {
            message.error('上传失败，请重试');
          }
        }}
        name='file'
        multiple
        accept='image/*'
        onChange={async (info) => {
          const { status } = info.file;
          if (status === 'done') {
            message.success(`${info.file.name} 上传成功`);
          } else if (status === 'error') {
            message.error(`${info.file.name} 上传失败`);
          }
        }}
        className='bg-gray-50 border-dashed border-gray-300 rounded-lg'
      >
        <div className='p-8'>
          <p className='text-4xl text-gray-400 mb-4'>
            <InboxOutlined />
          </p>
          <p className='text-gray-600 font-medium'>点击或拖拽图片到此处上传</p>
          <p className='text-gray-400 text-sm'>支持单个或批量上传</p>
        </div>
      </Dragger>

      <Card className='shadow-xs'>
        <Title level={4} className='mb-4!'>
          图片列表
        </Title>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {data.Objects?.filter((object: any) => object.Key !== data.Prefix).map((object: any) => (
            <div key={object.ETag} className='group relative'>
              <Image
                className='rounded-lg object-cover hover:shadow-lg transition-shadow'
                width='100%'
                height={200}
                style={{ objectFit: 'cover' }}
                src={`https://w.zzfzzf.com/${object.Key}`}
                alt={object.Key}
                preview={{
                  mask: <div className='text-sm'>点击预览</div>,
                }}
              />
              <div className='opacity-0 group-hover:opacity-100 absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white text-xs p-2 rounded-sm transition-opacity'>
                {object.Key.split('/').pop()}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Space>
  );
};

export default ListAdminPage;
