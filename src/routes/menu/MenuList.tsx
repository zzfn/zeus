import { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import { menuList } from '../../service/menu';
import { list2tree } from '../../utils/list2tree';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

const MenuList = () => {
  const columns: ColumnsType<any> = [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '菜单路由',
      dataIndex: 'path',
    },
    {
      title: '菜单组件',
      dataIndex: 'component',
    },
    {
      title: '是否显示在侧边栏',
      dataIndex: 'isShow',
    },
    {
      title: '排序号',
      dataIndex: 'orderNum',
    },
    {
      title: '操作',
      render: (_, record: any) => {
        return (
          <Space>
            <Link to={`/menu/${record.id}`}>编辑</Link>
            <Link to={`/menu/_?pid=${record.id}`}>新增子菜单</Link>
          </Space>
        );
      },
    },
  ];
  const [treeData, setTreeData] = useState([]);
  async function getSource() {
    const { data } = await menuList({});
    setTreeData(list2tree(data, { id: 'id', pid: 'parentId', children: 'children' }));
  }

  useEffect(() => {
    getSource();
  }, []);
  return (
    <>
      <Link to='/menu/_'>新增一级菜单</Link>
      <Table rowKey='id' bordered pagination={false} columns={columns} dataSource={treeData} />
    </>
  );
};

export default MenuList;
