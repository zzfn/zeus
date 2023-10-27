import { Editor } from '@bytemd/react';
import 'bytemd/dist/index.min.css';
import gfm from '@bytemd/plugin-gfm';
import { message } from 'antd';
import { uploadFile } from '../service/article';

const plugins = [gfm()];

function formatFile(file: File) {
  const suffix = file.name.split('.').pop();
  return new File([file], `${Date.now()}.${suffix}`);
}

const MarkdownEditor = (props: any) => {
  const { value = '', onChange } = props;

  async function handleUploadImages(value: File[]): Promise<any> {
    const hide = message.loading('uploading...', 0);
    let formData = new FormData();
    value.forEach((item) => formData.append('file', formatFile(item)));
    const { data } = await uploadFile(formData);
    hide();
    return data?.map((url: string) => ({ url }));
  }

  return (
    <Editor
      mode='tab'
      uploadImages={handleUploadImages}
      value={value}
      plugins={plugins}
      onChange={onChange}
    />
  );
};

export default MarkdownEditor;
