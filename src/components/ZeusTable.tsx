import { Table } from 'antd';
import { useEffect, useState } from 'react';

const ZeusTable = (props: any): JSX.Element => {
  const { columns, service, params, rowKey = 'id' } = props;
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({});

  async function handleFetch(query: any) {
    const { data, code } = await service(query);
    if (code === 0) {
      setDataSource(data.records);
      setTotal(data.total);
    }
  }

  useEffect(() => {
    handleFetch({ ...params, ...page });
  }, [service, params, page]);
  return (
    <Table
      bordered
      pagination={{
        onChange: (current, pageSize) => setPage({ current, pageSize }),
        total,
      }}
      rowKey={rowKey}
      dataSource={dataSource}
      columns={columns}
    />
  );
};
export default ZeusTable;
