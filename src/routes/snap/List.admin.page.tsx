import { Image, message, Upload } from 'antd';
import { uploadFile } from '../../service/article';
import useSWR from 'swr';

const { Dragger } = Upload;

function formatFile(file: File) {
  const suffix = file.name.split('.').pop();
  return new File([file], `${Date.now()}.${suffix}`);
}

const ListAdminPage = () => {
  const { data = [] } = useSWR<any>({
    url: '/v1/files/list',
    params: {
      prefix: 'snap/',
      delimiter: '/',
    },
  });
  return (
    <div>
      List
      <Dragger
        customRequest={async ({ file, onSuccess }) => {
          let formData = new FormData();
          formData.append('objectPath', 'snap');
          formData.append('file', formatFile(file as any));
          const { data } = await uploadFile(formData);
          onSuccess && onSuccess(data);
        }}
        name='file'
        multiple
        onChange={async (info) => {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        }}
      >
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
      </Dragger>
      {data.Objects?.filter((object: any) => object.Key !== data.Prefix).map((object: any) => (
        <Image key={object.ETag} width={200} src={`https://w.zzfzzf.com/${object.Key}`} />
      ))}
    </div>
  );
};
export default ListAdminPage;
