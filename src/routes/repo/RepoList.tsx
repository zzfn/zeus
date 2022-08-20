import {Table} from "antd";
import {useQuery} from '@tanstack/react-query';
import {droneRepos} from "../../service/drone";
import {Link} from "react-router-dom";

const RepoList = () => {
  const { data } = useQuery(['droneRepos'], ()=>droneRepos({}).then(({data})=>data));

  const columns = [
    {
      title: '仓库',
      dataIndex: 'slug',
    },
    {
      title: '详情',
      render: (_: string,record:any) => <Link to={`/drone/${record.namespace}/${record.name}`}>编辑</Link>
      ,
    },
  ];

  return (
    <>
      <Table rowKey='id' bordered pagination={false} columns={columns} dataSource={data} />
    </>
  );
};

export default RepoList;
