import { Button, Card, Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { droneBuildCreate, droneBuilds } from '../../service/drone';

const Drone = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useQuery(['droneBuilds'], () => droneBuilds(params).then(({ data }) => data));
  const columns = [
    {
      title: '序号',
      dataIndex: 'number',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
  ];
  async function handleBuild() {
    const { code } = await droneBuildCreate({ ...params, branch: 'main' });
    code === 0 && navigate(0);
  }
  return (
    <>
      <Card bordered={false}>
        <Button onClick={handleBuild} type='primary'>
          New Build
        </Button>
        <Table rowKey='id' bordered pagination={false} columns={columns} dataSource={data} />
      </Card>
    </>
  );
};

export default Drone;
