import {useState} from "react";
import {articlePage} from "service/article";
import ZeusTable from "components/ZeusTable";
import {Space} from "antd";
import {Link} from "react-router-dom";
import Access from "components/Access";
import useAccess from "hooks/useAccess";

const LogList = () => {
    const access=useAccess();
    const [params] = useState({})
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
            key: 'address',
            render: (_:string, record:any) => (
                    <Access accessible={access.isAdmin}>
                        <Space>
                        <a>发布</a>
                        <a>下线</a>
                        <Link to={`/article/${record.id}`}>编辑</Link>
                        <a>删除</a>
                        </Space>
                    </Access>
            )
        },
    ];


    return (
        <>
            <ZeusTable columns={columns} service={articlePage} params={params}/>
        </>
    );
}

export default LogList
