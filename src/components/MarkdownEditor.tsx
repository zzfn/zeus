import { Editor } from '@bytemd/react';
import 'bytemd/dist/index.min.css';
import gfm from '@bytemd/plugin-gfm';
import axios from 'axios';
import { message } from 'antd';

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
    formData.append('path', `article/${props.articleId}`);
    value.forEach((item) => formData.append('file', formatFile(item)));
    const {
      data: { data },
    } = await axios({
      url: `${process.env.API_URL}/file/upload`,
      method: 'post',
      data: formData,
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('uid')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    hide();
    return data.map((url: string) => ({ url }));
  }

  return (
    <Editor uploadImages={handleUploadImages} value={value} plugins={plugins} onChange={onChange} />
  );
};

export default MarkdownEditor;
