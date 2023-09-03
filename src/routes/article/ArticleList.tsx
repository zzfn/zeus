import { Key, useCallback, useEffect, useState } from 'react';
import { articlePage, removeArticle } from 'service/article';
import { Link, useNavigate } from 'react-router-dom';
import Access from 'components/Access';
import {
  Button,
  Chip,
  Input,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

const ArticleList = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({ id: '', isRelease: 'all' });
  const navigate = useNavigate();
  const handleDelete = (id: string) => async () => {
    await removeArticle({ id });
    navigate(0);
  };
  useEffect(() => {
    articlePage({
      ...params,
      current: page,
      pageSize: 6,
    }).then(({ data }) => {
      setList(data.records);
      setTotal(data.total);
    });
  }, [page,params]);
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isRelease',
    },
    {
      title: '排序号',
      dataIndex: 'orderNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'address',
    },
  ];
  const renderCell = useCallback((record: any, columnKey: Key) => {
    const cellValue = record[columnKey];

    switch (columnKey) {
      case 'address':
        return (
          <Access>
            <Link to={`/article/${record.id}`}>
              <Button variant='ghost' size='sm' color='primary'>
                编辑
              </Button>
            </Link>
            <Button variant='ghost' size='sm' color='danger' onClick={handleDelete(record.id)}>
              删除
            </Button>
          </Access>
        );
      case 'title':
        return (
          <a
            className='underline'
            target='_blank'
            href={`https://zzfzzf.com/post/${record.id}`}
            rel='noreferrer'
          >
            {record.title}
          </a>
        );
      case 'isRelease':
        return cellValue ? <Chip color='success'>已发布</Chip> : <Chip>草稿</Chip>;
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className='grid grid-cols-5 gap-x-2 items-center'>
        <Input
          label='id'
          variant='bordered'
          placeholder='search by id'
          value={params.id}
          onChange={(e) => setParams({ ...params, id: e.target.value })}
        ></Input>
        <Select
          variant='bordered'
          selectedKeys={[params.isRelease]}
          label='发布状态'
          placeholder='请选择'
          onChange={(e) => {
            setParams({ ...params, isRelease: e.target.value });
          }}
        >
          {[
            { value: 'all', label: '全部' },
            { value: 'published', label: '已发布' },
            { value: 'unpublished', label: '未发布' },
          ].map((tag) => (
            <SelectItem key={tag.value} value={tag.value}>
              {tag.label}
            </SelectItem>
          ))}
        </Select>
        <Link to='/article/_'>
          <Button color='primary'>新增</Button>
        </Link>
      </div>
      <Table className='my-2'>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.dataIndex}>{column.title}</TableColumn>}
        </TableHeader>
        <TableBody items={list}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination onChange={(v) => setPage(v)} total={Math.floor(total / 10)} initialPage={page} />
      {/*<ZeusTable columns={columns} service={articlePage} params={params} />*/}
    </>
  );
};

export default ArticleList;
