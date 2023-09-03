import MarkdownEditor from 'components/MarkdownEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { articleOne, saveArticle } from 'service/article';
import { useEffect } from 'react';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';
import { isExist } from '../../utils/isExist';
import { Button, Card, CardBody, Input, Select, SelectItem, Switch } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const sourceTag = [
  { label: 'frontend', value: 'frontend' },
  { label: 'backend', value: 'backend' },
  { label: 'devops', value: 'devops' },
  { label: 'react', value: 'react' },
  { label: 'vue', value: 'vue' },
  { label: 'typescript', value: 'typescript' },
  { label: 'leetcode', value: 'leetcode' },
  { label: 'other', value: 'other' },
].map((_) => ({ ..._, key: _.value }));
type Inputs = {
  title: string;
  tag: string;
  isRelease: boolean;
  content: string;
  orderNum: number;
};

const ArticleDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const access = useAccess();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const handleFetchArticle = async (id: string) => {
    const { data, success } = await articleOne({ id });
    if (success) {
      reset(data);
    } else {
      toast.error('未知错误');
    }
  };
  useEffect(() => {
    params.id && isExist(params.id) && handleFetchArticle(params.id).then();
  }, [params.id]);
  const onSubmit = async (values: Inputs) => {
    const { data } = await saveArticle({ ...values, id: params.id === '_' ? '' : params.id });
    data && toast.success('操作成功');
    data && navigate(`/article/${data}`);
  };
  return (
    <Card>
      <CardBody>
        <form className='grid grid-cols-4 gap-2' onSubmit={handleSubmit(onSubmit)}>
          <Input
            validationState={errors.title ? 'invalid' : 'valid'}
            {...register('title', { required: true })}
            label='标题'
            placeholder='请输入标题'
          />
          <Controller
            name='tag'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                selectedKeys={[field.value]}
                validationState={errors.tag ? 'invalid' : 'valid'}
                label='标签'
                placeholder='请选择分类'
                className='max-w-xs'
                onChange={field.onChange}
              >
                {sourceTag.map((tag) => (
                  <SelectItem key={tag.value} value={tag.value}>
                    {tag.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Input
            defaultValue='0'
            type='number'
            validationState={errors.orderNum ? 'invalid' : 'valid'}
            {...register('orderNum', { required: true, setValueAs: (v) => parseInt(v) })}
            label='排序号'
            placeholder='请输入排序号'
          />
          <Controller
            name='isRelease'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Switch onValueChange={field.onChange} isSelected={field.value}>
                是否发布
              </Switch>
            )}
          />
          <Controller
            name='content'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className='col-span-4 bytemd-600'>
                <MarkdownEditor
                  value={field.value}
                  onChange={field.onChange}
                  articleId={params.id}
                />
              </div>
            )}
          />
          <Access accessible={access.isAdmin}>
            <Button className='col-span-4' type='submit' size='sm'>
              确认
            </Button>
          </Access>
        </form>
      </CardBody>
    </Card>
  );
};

export default ArticleDetail;
