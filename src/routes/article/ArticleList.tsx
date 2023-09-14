import { useState } from 'react';
import { DataTable } from '@primer/react/drafts';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Pagination, Select, SelectItem } from '@nextui-org/react';
import { RelativeTime } from '@primer/react';
import useSWR from 'swr';

const ArticleList = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({ id: '', isRelease: 'all' });
  const navigate = useNavigate();
  const { data = [] } = useSWR<any>({
    endpoint: '/v1/articles',
  });
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
      <DataTable
        aria-labelledby='repositories'
        aria-describedby='repositories-subtitle'
        data={data}
        columns={[
          {
            header: 'Title',
            field: 'title',
            renderCell: (row) => {
              return <Link to={`/article/${row.id}`}>{row.title}</Link>;
            },
          },
          {
            header: 'Type',
            field: 'type',
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            renderCell: (row) => {
              return <RelativeTime date={new Date()} />;
            },
          },
          // {
          //   header: 'Dependabot',
          //   field: 'securityFeatures.dependabot',
          //   renderCell: (row) => {
          //     return row.securityFeatures.dependabot.length > 0 ? (
          //         <LabelGroup>
          //           {row.securityFeatures.dependabot.map((feature) => {
          //             return <Label key={feature}>{uppercase(feature)}</Label>
          //           })}
          //         </LabelGroup>
          //     ) : null
          //   },
          // },
          // {
          //   header: 'Code scanning',
          //   field: 'securityFeatures.codeScanning',
          //   renderCell: (row) => {
          //     return row.securityFeatures.codeScanning.length > 0 ? (
          //         <LabelGroup>
          //           {row.securityFeatures.codeScanning.map((feature) => {
          //             return <Label key={feature}>{uppercase(feature)}</Label>
          //           })}
          //         </LabelGroup>
          //     ) : null
          //   },
          // },
        ]}
      />
      <Pagination onChange={(v) => setPage(v)} total={Math.floor(total / 10)} initialPage={page} />
    </>
  );
};

export default ArticleList;
