import {Card, Table} from 'antd';
import {Link, useParams} from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";
import {droneBuilds} from "../../service/drone";

const Drone = () => {
  const params = useParams();
  const { data } = useQuery(['droneBuilds'], ()=>droneBuilds(params).then(({data})=>data));
  const columns = [
    {
      title: '序号',
      dataIndex: 'number',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '详情',
      render: (_: string,record:any) => <Link to={`/drone/${record.namespace}/${record.name}`}>编辑</Link>
      ,
    },
  ];
  return (
    <>
      <Card bordered={false}>
        <Table rowKey='id' bordered pagination={false} columns={columns} dataSource={data} />
      </Card>
    </>
  );
};

export default Drone;
