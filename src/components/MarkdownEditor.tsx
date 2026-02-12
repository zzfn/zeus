import Editor, { OnMount } from '@monaco-editor/react';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { message } from 'antd';
import { uploadFile } from '../service/article';
import './MarkdownEditor.css';

// 上传单个图片文件
const uploadImageFile = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('objectPath', 'img');
    formData.append('file', file);

    const { data } = await uploadFile(formData);

    if (data && data[0]) {
      return data[0];
    }
    return null;
  } catch (error) {
    message.error('上传失败');
    console.error(error);
    return null;
  }
};

export interface MarkdownEditorRef {
  getMarkdown: () => string;
  setMarkdown: (content: string) => void;
  focus: () => void;
}

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  articleId?: string;
}

const MarkdownEditor = forwardRef<MarkdownEditorRef, MarkdownEditorProps>(
  ({ value = '', onChange }, ref) => {
    const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
    const isUpdatingRef = useRef(false);
    const [isUploading, setIsUploading] = useState(false);

    useImperativeHandle(ref, () => ({
      getMarkdown: () => {
        return editorRef.current?.getValue() ?? '';
      },
      setMarkdown: (content: string) => {
        editorRef.current?.setValue(content);
      },
      focus: () => {
        editorRef.current?.focus();
      },
    }));

    const handleEditorMount: OnMount = (editor, _monaco) => {
      editorRef.current = editor;

      // 监听内容变化
      editor.onDidChangeModelContent(() => {
        const newValue = editor.getValue();

        if (!isUpdatingRef.current && onChange && newValue !== value) {
          isUpdatingRef.current = true;
          onChange(newValue);

          setTimeout(() => {
            isUpdatingRef.current = false;
          }, 0);
        }
      });

      // 监听粘贴事件（支持粘贴图片）
      const editorDom = editor.getDomNode();
      if (editorDom) {
        editorDom.addEventListener('paste', async (e: Event) => {
          const clipboardEvent = e as ClipboardEvent;
          const items = clipboardEvent.clipboardData?.items;
          if (!items) return;

          for (const item of Array.from(items)) {
            if (item.type.startsWith('image/')) {
              clipboardEvent.preventDefault();
              const file = item.getAsFile();
              if (file && !isUploading) {
                setIsUploading(true);
                const imageUrl = await uploadImageFile(file);
                setIsUploading(false);

                if (imageUrl && editorRef.current) {
                  const position = editorRef.current.getPosition();
                  const markdownText = `![图片描述](${imageUrl})`;

                  editorRef.current.trigger('keyboard', 'type', {
                    text: markdownText,
                  });

                  if (position) {
                    editorRef.current.setPosition(position);
                  }
                }
              }
              break;
            }
          }
        });
      }
    };

    // 处理图片上传
    const handleImageUpload = async () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        setIsUploading(true);
        const imageUrl = await uploadImageFile(file);
        setIsUploading(false);

        if (imageUrl && editorRef.current) {
          const position = editorRef.current.getPosition();
          const markdownText = `![图片描述](${imageUrl})`;

          editorRef.current.trigger('keyboard', 'type', {
            text: markdownText,
          });

          if (position) {
            editorRef.current.setPosition(position);
          }
        }
      };

      input.click();
    };

    return (
      <div className='editor-wrapper'>
        <div className='editor-toolbar'>
          <button
            type='button'
            onClick={handleImageUpload}
            title='插入图片'
            disabled={isUploading}
          >
            {isUploading ? '⏳ 上传中...' : '🖼️ 上传图片'}
          </button>
        </div>
        <Editor
          height='400px'
          defaultLanguage='markdown'
          value={value}
          onMount={handleEditorMount}
          options={{
            fontSize: 14,
            fontFamily: 'Menlo, Monaco, Consolas, Ubuntu Mono, monospace',
            lineHeight: 1.6,
            minimap: {
              enabled: false,
            },
            wordWrap: 'on',
            automaticLayout: true,
            formatOnPaste: true,
            trimAutoWhitespace: true,
            scrollBeyondLastLine: false,
            renderLineHighlight: 'all',
            renderWhitespace: 'all',
            bracketPairColorization: {
              enabled: true,
            },
            roundedSelection: true,
          }}
          loading={<div className='editor-loading'>加载编辑器...</div>}
        />
      </div>
    );
  }
);

MarkdownEditor.displayName = 'MarkdownEditor';

export default MarkdownEditor;
