import { Table } from 'antd';
import { useEffect, useState } from 'react';

const ZeusTable = (props: any): JSX.Element => {
  const { columns, service, params, rowKey = 'id', showPage = true, size = 'middle' } = props;
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({});

  async function handleFetch(query: any) {
    const { data, code } = await service(query);
    if (code === 0) {
      if (showPage) {
        setDataSource(data.records);
        setTotal(data.total);
      } else {
        setDataSource(data);
        setTotal(data.total);
      }
    }
  }

  useEffect(() => {
    handleFetch({ ...params, ...page });
  }, [service, params, page]);
  return (
    <Table
      size={size}
      bordered
      pagination={
        showPage
          ? {
              onChange: (current, pageSize) => setPage({ current, pageSize }),
              total,
            }
          : false
      }
      rowKey={rowKey}
      dataSource={dataSource}
      columns={columns}
    />
  );
};
export default ZeusTable;
