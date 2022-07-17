import {useState} from "react";
import {articlePage} from "../../service/article";
import ZeusTable from "components/ZeusTable";

const ArticleList = () => {
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
        },
    ];


    return (
        <>
            <ZeusTable columns={columns} service={articlePage} params={params} />
        </>
    );
}

export default ArticleList
